import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const kittens = [
    { id: 1, src: "/assets/kitten1.jpg", caption: "Cinnamon - 8 Weeks" }, // Adjusted path for public/assets
    { id: 2, src: "/assets/Three-kittens.jpg", caption: "Chocolate - 10 Weeks" },
    { id: 3, src: "/assets/babycat.jpg", caption: "Blue-Eyed - 9 Weeks" },
    { id: 4, src: "/assets/playfull.jpg", caption: "Fawn - 7 Weeks" },
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

  const handlePayment = () => {
    navigate("/payment", {
      state: {
        kitten: kittens[activeIndex].caption,
        price: 500, // Example price in USD or NGN
        customer: {
          name: formData.name || "User Name",
          email: formData.email || "user@example.com",
          phone_number: "1234567890", // Add phone field to form if needed (optional)
        },
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
        <div className="container h-100 d-flex flex-column justify-content-center">
          <h2 className="text-center mb-2 mb-md-3">Available Kittens</h2>
          <p className="text-center mb-2 mb-md-3 description">Adopt your perfect kitten today!</p>
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
                  animate={{ opacity: 1, x: 0 }}
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
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default AvailableKittens;