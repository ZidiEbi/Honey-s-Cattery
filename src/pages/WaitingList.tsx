import React, { useState } from "react";
import { motion } from "framer-motion";
import { Form, Button, Spinner, Alert } from "react-bootstrap"; // Import Bootstrap components
import emailjs from "@emailjs/browser"; // Import emailjs
import "bootstrap/dist/css/bootstrap.min.css"; // Standard Bootstrap CSS import

// Relative paths for local CSS and components
import "../styles/waitingList.css"; 
import Header from "../styles/Header";
import Footer from "../styles/Footer";

// Props interface for better type checking
interface WaitingListProps {
  toggleDark: () => void;
  isDark: boolean;
}

const WaitingList: React.FC<WaitingListProps> = ({ toggleDark, isDark }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    preferredColor: "",
  });

  // State to manage submission status (idle, submitting, success, error)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  /**
   * Handles changes to form input fields.
   * Updates the formData state based on the input's name and value.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles form submission.
   * Prevents default form submission, sets loading state, sends email via EmailJS,
   * and updates submission status based on the outcome.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser form submission
    setIsSubmitting(true); // Set submitting state to true
    setSubmitStatus("idle"); // Reset submit status

    try {
      // Send email using EmailJS. Replace with your actual Service ID, Template ID, and Public Key.
      // Ensure these IDs match the ones used in AvailableKittens.tsx and Contact.tsx for consistency,
      // or set up a new template specifically for the waiting list.
      await emailjs.send(
        "service_xhix4gf", // Your EmailJS Service ID
        "template_waiting_list", // TODO: Replace with your actual Waiting List Template ID
        {
          from_name: formData.fullName,
          from_email: formData.email,
          preferred_color: formData.preferredColor || "Not specified",
        },
        "m0WIaoqATigT7PG3m" // Your EmailJS Public Key
      );
      setSubmitStatus("success"); // Set status to success on successful send
      // Clear the form after successful submission
      setFormData({ fullName: "", email: "", preferredColor: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error"); // Set status to error on failure
    } finally {
      setIsSubmitting(false); // Reset submitting state regardless of outcome
      // Optionally hide success/error message after a few seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    // Apply dark-mode class to the container-fluid and page-wrapper based on isDark prop
    <div className={`container-fluid p-0 page-wrapper ${isDark ? 'dark-mode' : ''}`}>
      <Header toggleDark={toggleDark} isDark={isDark} />
      <motion.main
        className="main" // Removed py-5 from main; padding handled by waitingList.css
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container py-5"> {/* Keep py-5 on inner container for vertical spacing of content */}
          <h2 className="text-center mb-4">Join Our Waiting List</h2>
          <motion.div
            className="waiting-list-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-center mb-4">Sign up to be notified of new litters!</p>
            <Form onSubmit={handleSubmit}> {/* Use Bootstrap Form component */}
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={isDark ? 'dark-mode-input' : ''} // Apply dark mode input style
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={isDark ? 'dark-mode-input' : ''} // Apply dark mode input style
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  name="preferredColor"
                  value={formData.preferredColor}
                  onChange={handleChange}
                  className={isDark ? 'dark-mode-input' : ''} // Apply dark mode select style
                >
                  <option value="">Preferred Color (Optional)</option>
                  <option value="cinnamon">Cinnamon</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="blue">Blue-Eyed</option>
                  <option value="fawn">Fawn</option> {/* Added more options */}
                  <option value="lilac">Lilac</option>
                  <option value="black">Black</option>
                  <option value="grey">Grey</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit" className={`w-100 ${isDark ? 'dark-mode-button' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>

            {/* Submission feedback messages */}
            {submitStatus === "success" && (
              <Alert variant="success" className={`mt-3 ${isDark ? 'dark-mode-alert' : ''}`}>
                Successfully joined the waiting list!
              </Alert>
            )}
            {submitStatus === "error" && (
              <Alert variant="danger" className={`mt-3 ${isDark ? 'dark-mode-alert' : ''}`}>
                Failed to join the waiting list. Please try again later.
              </Alert>
            )}
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default WaitingList;
