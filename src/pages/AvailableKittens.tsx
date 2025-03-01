import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Styling/availableKittens.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

  const kittens = [
    { id: 1, src: "../src/assets/kitten1.jpg", caption: "Cinnamon - 8 Weeks" },
    { id: 2, src: "../src/assets/Fendi2.jpg", caption: "Chocolate - 10 Weeks" },
    { id: 3, src: "../src/assets/babycat.jpg", caption: "Blue-Eyed - 9 Weeks" },
    { id: 4, src: "../src/assets/playfull.jpg", caption: "Fawn - 7 Weeks" },
  ];

  // Auto-scroll every 2.5 seconds unless paused
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % kittens.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isPaused, kittens.length]);

  const handleCardHover = () => setIsPaused(true);
  const handleCardLeave = () => setIsPaused(false);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + kittens.length) % kittens.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % kittens.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        "service_xhix4gf",
        "template_yvn3r9m",
        {
          breed: formData.breed || "Not specified",
          coatColor: formData.coatColor || "Not specified",
          eyeColor: formData.eyeColor || "Not specified",
          name: formData.name,
          email: formData.email,
          notes: formData.notes || "None",
        },
        "m0WIaoqATigT7PG3m"
      );
      setSubmitStatus("success");
      setFormData({ breed: "", coatColor: "", eyeColor: "", name: "", email: "", notes: "" });
      setTimeout(() => setShowRequestForm(false), 2000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header toggleDark={toggleDark} isDark={isDark} />
      <motion.main
        className="main py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h2 className="text-center mb-4">Available Kittens</h2>
          <div className="kitten-carousel-wrapper">
            <motion.button
              className="nav-arrow nav-prev"
              onClick={handlePrev}
              whileHover={{ scale: 1.3, rotate: -15 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>🐾</span>
            </motion.button>
            <div
              className="kitten-carousel"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="carousel-card"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                >
                  <img src={kittens[activeIndex].src} alt={kittens[activeIndex].caption} className="carousel-img" />
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
                </motion.div>
              </AnimatePresence>
              <motion.div
                className="carousel-background"
                animate={{ x: [-20, 20, -20], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <motion.button
              className="nav-arrow nav-next"
              onClick={handleNext}
              whileHover={{ scale: 1.3, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>🐾</span>
            </motion.button>
          </div>
          <div className="request-section text-center mt-3">
            <motion.p
              className="request-invite"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Want a specific breed, coat, or eye color?{" "}
              <motion.button
                className="btn btn-link p-0"
                onClick={() => setShowRequestForm(true)}
                whileHover={{ scale: 1.1, color: "#87a8c9" }}
                whileTap={{ scale: 0.95 }}
              >
                Request Now
              </motion.button>
            </motion.p>
          </div>

          {/* Request Form Modal */}
          <Modal show={showRequestForm} onHide={() => setShowRequestForm(false)} centered>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Specific Request</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Breed</Form.Label>
                    <Form.Control
                      as="select"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                    >
                      <option value="">Select Breed</option>
                      <option value="British Shorthair">British Shorthair</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Coat Color</Form.Label>
                    <Form.Control
                      type="text"
                      name="coatColor"
                      value={formData.coatColor}
                      onChange={handleChange}
                      placeholder="e.g., Cinnamon, Chocolate"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Eye Color</Form.Label>
                    <Form.Control
                      type="text"
                      name="eyeColor"
                      value={formData.eyeColor}
                      onChange={handleChange}
                      placeholder="e.g., Blue, Green"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Additional Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Anything else we should know?"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Request"}
                  </Button>
                  {submitStatus === "success" && (
                    <div className="alert alert-success mt-3">
                      Request sent successfully! Want to chat now?{" "}
                      <a href="https://wa.me/+1234567890" target="_blank" rel="noopener noreferrer">
                        Reach us on WhatsApp
                      </a>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="alert alert-danger mt-3">
                      Failed to send request. Try again or{" "}
                      <a href="https://wa.me/+1234567890" target="_blank" rel="noopener noreferrer">
                        contact us on WhatsApp
                      </a>.
                    </div>
                  )}
                </Form>
              </Modal.Body>
            </motion.div>
          </Modal>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default AvailableKittens;