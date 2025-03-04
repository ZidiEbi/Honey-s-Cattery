import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { Button, Spinner } from "react-bootstrap";
import "../components/Styling/payment.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Payment = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Fallback for missing state
  const { kitten, price } = location.state || { kitten: "Selected Kitten", price: 500 };

  // Use Vite environment variable
  const PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK_TEST-b7d7f2b9e8a8b6a5c4d3e2f1g0h9i8j7"; // Default to test key

  const config = {
    public_key: PUBLIC_KEY,
    tx_ref: `kitten-${Date.now()}`,
    amount: price,
    currency: "NGN", // Or "USD" for international—make dynamic if needed
    payment_options: "card,mobilemoney,ussd,banktransfer",
    customer: {
      email: "user@example.com", // Replace with form email if available
      name: "User Name", // Replace with form name if available
      phone_number: "1234567890", // Optional, can be dynamic
    },
    customizations: {
      title: "Honey Cattery Checkout",
      description: `Payment for ${kitten}`,
      logo: "https://yourdomain.com/logo.png", // Update or remove if invalid
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    setIsLoading(true);
    handleFlutterPayment({
      callback: (response) => {
        console.log("Flutterwave response:", response);
        if (response.status === "successful") {
          alert("Payment successful! Redirecting...");
          navigate("/");
        } else {
          alert(`Payment failed: ${response.message || "Try again."}`);
        }
        closePaymentModal();
        setIsLoading(false);
      },
      onClose: () => {
        alert("Payment cancelled by user.");
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="container-fluid p-0 page-wrapper">
      <Header toggleDark={toggleDark} isDark={isDark} />
      <motion.main
        className="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center mb-3">Checkout for {kitten}</h2>
          <p className="text-center mb-3">Price: ${price} USD / ₦{price * 1500} NGN (approx.)</p>
          <div className="payment-options">
            <h3 className="text-center mb-3">Choose Payment Method</h3>
            <div className="row g-3">
              <div className="col-12">
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handlePayment}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" className="me-2" />
                  ) : null}
                  {isLoading ? "Processing..." : "Pay with Flutterwave (Nigeria & International)"}
                </Button>
              </div>
            </div>
            <p className="text-center mt-3">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Back to Kittens
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