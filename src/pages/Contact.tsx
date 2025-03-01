import React, { useState } from "react";
import { FaTiktok, FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Styling/contact.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
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
    <div className="container-fluid p-0">
      <Header toggleDark={toggleDark} isDark={isDark} />
      <main className="main py-5">
        <div className="container">
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
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
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
              <div className="social-media text-center">
                <h3 className="mb-4">Follow Us</h3>
                <div className="d-flex justify-content-center gap-4">
                  <a href="https://tiktok.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaTiktok size={32} />
                  </a>
                  <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaInstagram size={32} />
                  </a>
                  <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaFacebook size={32} />
                  </a>
                  <a href="mailto:mail@honeyscattery.com" className="social-icon">
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
};

export default Contact;