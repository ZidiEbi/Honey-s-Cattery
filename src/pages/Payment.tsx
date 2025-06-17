import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Removed useFlutterwave and closePaymentModal imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import PaystackPop from "@paystack/inline-js";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { Button, Spinner, Form } from "react-bootstrap";
import "../styles/payment.css";
import Header from "../styles/Header";
import Footer from "../styles/Footer";
import { FaCreditCard, FaArrowLeft } from "react-icons/fa"; // Generic card icon and back arrow
import { SiStripe } from "react-icons/si"; // Brand icon for Stripe

// Stripe promise (load Stripe library)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_...");

interface PaymentProps {
  toggleDark: () => void;
  isDark: boolean;
}

const Payment: React.FC<PaymentProps> = ({ toggleDark, isDark }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // Default payment method set to 'stripe' or 'paystack' as Flutterwave is removed
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [stripeError, setStripeError] = useState<string | null>(null);

  // Fallback for missing state
  const { kitten, price, kittenData, customer } = location.state || {
    kitten: "Selected Kitten",
    price: 500, // Example price
    kittenData: { src: "/images/default.jpg", caption: "Selected Kitten" },
    customer: { name: "User Name", email: "user@example.com", phone_number: "1234567890" },
  };

  // Use Vite environment variables
  // FLUTTERWAVE_PUBLIC_KEY is removed
  const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_...";
  const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_..."; // Added for completeness, though already used by loadStripe

  // Flutterwave Config and related functions are removed

  // Stripe Payment Handler (Custom Hook)
  const StripePaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleStripePayment = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setIsLoading(true);
      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)!,
        });

        if (error) {
          setStripeError(error.message || "Payment failed.");
          setIsLoading(false);
          return;
        }

        // Call Vercel Function to create PaymentIntent
        // This endpoint should be set up on your backend (e.g., Vercel Serverless Function)
        const response = await fetch("/api/payments/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: price, currency: "usd", paymentMethodId: paymentMethod.id }), // Pass paymentMethod.id
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Stripe payment failed");

        // Confirm the payment on the client side
        const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: customer.name,
              email: customer.email,
            },
          },
        });

        if (confirmError) {
          setStripeError(confirmError.message || "Payment confirmation failed");
          setIsLoading(false);
          return;
        }

        alert("Stripe payment successful! Redirecting..."); // Consider a custom modal instead of alert
        navigate("/"); // Navigate to home or a success page
      } catch (error: any) {
        setStripeError(error.message || "An unexpected error occurred with Stripe payment.");
        setIsLoading(false);
      }
    };

    return (
      <Form onSubmit={handleStripePayment}>
        <div className="d-flex align-items-center mb-2">
          <SiStripe className="me-2" size={24} />
          <span>Pay with Stripe (Debit/Credit Card)</span>
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: isDark ? "#f0f0f0" : "#424770", // Adjust color based on dark mode
                "::placeholder": { color: isDark ? "#aab7c4" : "#aab7c4" },
              },
              invalid: { color: "#e33d4e" }, // Red color for invalid input
            },
            hidePostalCode: true, // Often good for general e-commerce
          }}
        />
        {stripeError && <div className="text-danger mt-2">{stripeError}</div>}
        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-3"
          disabled={!stripe || isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : null}
          {isLoading ? "Processing..." : "Pay with Stripe"}
        </Button>
      </Form>
    );
  };

  // Paystack Payment Handler
  const handlePaystackPayment = () => {
    setIsLoading(true);
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      amount: price * 100, // In kobo (NGN), assuming price is in base currency (USD or NGN)
      email: customer.email,
      name: customer.name,
      onSuccess: (transaction: { reference: string }) => {
        // Verify transaction with Vercel Function
        // This endpoint should be set up on your backend (e.g., Vercel Serverless Function)
        fetch("/api/payments/paystack", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: transaction.reference }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Paystack payment successful! Redirecting..."); // Consider a custom modal
              navigate("/");
            } else {
              alert("Paystack payment verification failed."); // Consider a custom modal
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Paystack verification error:", error);
            alert("Paystack payment failed."); // Consider a custom modal
            setIsLoading(false);
          });
      },
      onCancel: () => {
        alert("Payment cancelled by user."); // Consider a custom modal
        setIsLoading(false);
      },
    });
  };

  const handleGenericPayment = () => {
    setIsLoading(true);
    if (paymentMethod === "paystack") {
      handlePaystackPayment();
    } else if (paymentMethod === "stripe") {
      // Stripe payment is handled by its own form onSubmit
      // This branch should ideally not be reached if StripePaymentForm is rendered
    }
    // No Flutterwave
  };

  return (
    <div className={`container-fluid p-0 page-wrapper ${isDark ? 'dark-mode' : ''}`}>
      <Header toggleDark={toggleDark} isDark={isDark} />
      <motion.main
        className="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
          <motion.img
            src={kittenData.src}
            alt={kitten}
            className="kitten-preview mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 10 }}
            onError={(e) => (e.currentTarget.src = "/images/default.jpg")} // Fallback if image fails
          />
          <h2 className="text-center mb-3">Checkout for {kitten}</h2>
          <p className="text-center mb-3">Price: ${price} USD / ₦{price * 1500} NGN (approx.)</p> {/* Price conversion is example */}
          <div className="payment-options w-100 max-w-sm"> {/* Added max-w-sm for better control on large screens */}
            <h3 className="text-center mb-3">Choose Payment Method</h3>
            <Form.Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-3 w-100"
            >
              {/* Flutterwave option removed */}
              <option value="stripe">
                <SiStripe className="me-2" size={20} /> Pay with Stripe (Debit/Credit Card - International)
              </option>
              <option value="paystack">
                <FaCreditCard className="me-2" size={20} /> Pay with Paystack (Debit/Credit Card - Nigeria)
              </option>
            </Form.Select>
            {paymentMethod === "stripe" ? (
              <Elements stripe={stripePromise}>
                <StripePaymentForm />
              </Elements>
            ) : (
              <Button
                variant="primary"
                className="w-100"
                onClick={handleGenericPayment} // Generic handler for non-Stripe direct clicks
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" className="me-2" />
                ) : null}
                {isLoading ? "Processing..." : `Pay with ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}`}
              </Button>
            )}
            <p className="text-center mt-3">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                <FaArrowLeft className="me-2" size={16} /> Back to Kittens
              </Button>
            </p>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Payment;
