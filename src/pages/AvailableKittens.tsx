import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser"; // Ensure this package is installed
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported and package is installed

// Correct import paths for Header and Footer, assuming they are in src/styles/
import Header from "../styles/Header";
import Footer from "../styles/Footer";
// Correct import path for AvailableKittens specific CSS, assuming it's in src/styles/
import "../styles/availableKittens.css";

const AvailableKittens = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    breed: "",
    coatColor: "",
    eyeColor: "",
    name: "",
    email: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const navigate = useNavigate();

  // Updated image paths to correctly reference images from the public/images/ directory
  // Ensure these images exist in your public/images/ folder
  const kittens = [
    { id: 1, src: "/images/Kitten1.jpg", caption: "Cinnamon - 8 Weeks" },
    { id: 2, src: "/images/Three-kittens.jpg", caption: "Chocolate - 10 Weeks" },
    { id: 3, src: "/images/babycat.jpg", caption: "Blue-Eyed - 9 Weeks" },
    { id: 4, src: "/images/playfull.jpg", caption: "Fawn - 7 Weeks" },
  ];

  // Auto-scroll every 2.5 seconds unless paused
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % kittens.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isPaused, kittens.length]); // Dependencies for the effect

  const handleCardHover = () => setIsPaused(true);
  const handleCardLeave = () => setIsPaused(false);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + kittens.length) % kittens.length);
    setIsPaused(true); // Pause briefly on manual interaction
    setTimeout(() => setIsPaused(false), 1000); // Resume autoplay after 1 second
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % kittens.length);
    setIsPaused(true); // Pause briefly on manual interaction
    setTimeout(() => setIsPaused(false), 1000); // Resume autoplay after 1 second
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle"); // Reset status on new submission

    try {
      // Ensure EmailJS service ID, template ID, and public key are correct
      await emailjs.send(
        "service_xhix4gf", // Replace with your actual service ID
        "template_yvn3r9m", // Replace with your actual template ID
        {
          breed: formData.breed || "Not specified",
          coatColor: formData.coatColor || "Not specified",
          eyeColor: formData.eyeColor || "Not specified",
          name: formData.name,
          email: formData.email,
          notes: formData.notes || "None",
        },
        "m0WIaoqATigT7PG3m" // Replace with your actual public key
      );
      setSubmitStatus("success");
      // Clear form data on successful submission
      setFormData({ breed: "", coatColor: "", eyeColor: "", name: "", email: "", notes: "" });
      // Close modal after a short delay to show success message
      setTimeout(() => setShowRequestForm(false), 2000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false); // Always set submitting to false
    }
  };

  const handlePayment = () => {
    // Navigate to payment page with selected kitten details
    navigate("/payment", {
      state: {
        kitten: kittens[activeIndex].caption,
        price: 500, // Example price (adjust as needed)
        customer: {
          name: formData.name || "Guest", // Use name from form if available, else 'Guest'
          email: formData.email || "guest@example.com", // Use email from form if available
          phone_number: "N/A", // Add phone field to form if needed, or default
        },
        kittenData: kittens[activeIndex], // Pass the full kitten object for payment page
      },
    });
  };

  return (
    // Apply dark-mode class to the page-wrapper based on isDark prop
    <div className={`container-fluid p-0 page-wrapper ${isDark ? 'dark-mode' : ''}`}>
      <Header toggleDark={toggleDark} isDark={isDark} />
      <motion.main
        className="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container h-100 d-flex flex-column justify-content-center">
          <h2 className="text-center mb-2 mb-md-3">Available Kittens</h2>
          {/* Description paragraph using global styling, ensures dark mode compatibility */}
          <p className="text-center mb-2 mb-md-3 description">Adopt your perfect kitten today!</p>
          
          <div className="kitten-carousel-wrapper">
            {/* Previous button */}
            <motion.button
              className="nav-arrow nav-prev"
              onClick={handlePrev}
              whileHover={{ scale: 1.3, rotate: -15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous kitten"
            >
              <span>🐾</span> {/* Paw emoji for arrow */}
            </motion.button>
            
            {/* Kitten Carousel display area */}
            <div
              className="kitten-carousel"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <AnimatePresence mode="wait"> {/* Ensures smooth transitions between cards */}
                <motion.div
                  key={activeIndex} // Key prop crucial for AnimatePresence
                  className="carousel-card"
                  initial={{ opacity: 0, x: 100 }} // Initial animation state
                  animate={{ opacity: 1, x: 0 }} // Animation to active state
                  exit={{ opacity: 0, x: -100 }} // Animation on exit
                  transition={{ type: "spring", stiffness: 150, damping: 15 }} // Spring animation
                >
                  <img src={kittens[activeIndex].src} alt={kittens[activeIndex].caption} className="carousel-img" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/CCCCCC/000000?text=Image+Not+Found'; }}/>
                  <motion.div
                    className="carousel-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      className="btn btn-want"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                      onClick={handlePayment}
                    >
                      I Want This One
                    </motion.button>
                  </motion.div>
                  <motion.div
                    className="carousel-caption"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {kittens[activeIndex].caption}
                  </motion.div>
                  <motion.div
                    className="request-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.p
                      className="request-invite"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowRequestForm(true)}
                    >
                      Want a specific breed, coat, or eye color? Request Now
                    </motion.p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              {/* Animated background element for visual flair */}
              <motion.div
                className="carousel-background"
                animate={{ x: [-20, 20, -20], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            {/* Next button */}
            <motion.button
              className="nav-arrow nav-next"
              onClick={handleNext}
              whileHover={{ scale: 1.3, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next kitten"
            >
              <span>🐾</span> {/* Paw emoji for arrow */}
            </motion.button>
          </div>
        </div>
      </motion.main>

      {/* Modal for Request a Kitten form */}
      <Modal show={showRequestForm} onHide={() => setShowRequestForm(false)} centered className={isDark ? 'dark-mode' : ''}>
        <Modal.Header closeButton className={isDark ? 'dark-mode-modal-header' : ''}>
          <Modal.Title className={isDark ? 'text-white' : ''}>Request a Kitten</Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDark ? 'dark-mode-modal-body' : ''}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBreed">
              <Form.Label className={isDark ? 'text-white' : ''}>Breed</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className={isDark ? 'dark-mode-input' : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCoatColor">
              <Form.Label className={isDark ? 'text-white' : ''}>Coat Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter coat color"
                name="coatColor"
                value={formData.coatColor}
                onChange={handleChange}
                className={isDark ? 'dark-mode-input' : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEyeColor">
              <Form.Label className={isDark ? 'text-white' : ''}>Eye Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter eye color"
                name="eyeColor"
                value={formData.eyeColor}
                onChange={handleChange}
                className={isDark ? 'dark-mode-input' : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className={isDark ? 'text-white' : ''}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={isDark ? 'dark-mode-input' : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className={isDark ? 'text-white' : ''}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={isDark ? 'dark-mode-input' : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNotes">
              <Form.Label className={isDark ? 'text-white' : ''}>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Additional notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className={isDark ? 'dark-mode-input' : ''}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting} className={isDark ? 'dark-mode-button' : ''}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
          {submitStatus === "success" && <p className="text-success mt-3">Request submitted successfully!</p>}
          {submitStatus === "error" && <p className="text-danger mt-3">Failed to submit request. Please try again.</p>}
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  );
};

export default AvailableKittens;
