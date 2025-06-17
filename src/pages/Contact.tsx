import React, { useState } from "react";
import { FaTiktok, FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";

// Ensure correct relative paths based on your styles folder structure
import "../styles/contact.css";
import Header from "../styles/Header";
import Footer from "../styles/Footer";

function Contact({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean; }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      await emailjs.send( 
        "service_xhix4gf", // Your Service ID
        "template_yvn3r9m", // Your Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "m0WIaoqATigT7PG3m" // Your Public Key
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Apply dark-mode class to the container-fluid based on isDark prop
    <div className={`container-fluid p-0 ${isDark ? 'dark-mode' : ''}`}>
      <Header toggleDark={toggleDark} isDark={isDark} />
      {/* Removed py-5 from main, padding will now be handled by contact.css */}
      <main className="main">
        <div className="container py-5"> {/* Keep py-5 on inner container for vertical spacing of content */}
          <h2 className="text-center mb-4">Contact Us</h2>
          <div className="row">
            <div className="col-12 col-md-6">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${isDark ? 'dark-mode-input' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${isDark ? 'dark-mode-input' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className={`form-control ${isDark ? 'dark-mode-input' : ''}`}
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className={`btn btn-primary ${isDark ? 'dark-mode-button' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {submitStatus === "success" && (
                  <div className="alert alert-success mt-3">
                    Message sent successfully!
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="alert alert-danger mt-3">
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>
            <div className="col-12 col-md-6">
              <div className={`social-media text-center ${isDark ? 'dark-mode-social-media' : ''}`}>
                <h3 className="mb-4">Follow Us</h3>
                <div className="d-flex justify-content-center gap-4">
                  <a href="https://tiktok.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Follow us on TikTok">
                    <FaTiktok size={32} />
                  </a>
                  <a href="https://www.instagram.com/p/C25Rh0Uom7P/?igsh=Mzl6aGZiZDcxM3Nr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Follow us on Instagram">
                    <FaInstagram size={32} />
                  </a>
                  <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Follow us on Facebook">
                    <FaFacebook size={32} />
                  </a>
                  <a href="mailto:mail@honeyscattery.com" className="social-icon" aria-label="Email us">
                    <FaEnvelope size={32} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
