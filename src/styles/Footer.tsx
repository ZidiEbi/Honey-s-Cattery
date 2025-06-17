import React from "react";
import { FaTiktok, FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer text-center py-3">
      <div className="container">
        <p className="mb-2">© 2025 Honey Cattery</p>
        <div className="social-links d-flex justify-content-center gap-4 mb-2">
          <a href="https://tiktok.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTiktok size={24} />
          </a>
          <a href="https://www.instagram.com/p/C25Rh0Uom7P/?igsh=Mzl6aGZiZDcxM3Nr" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram size={24} />
          </a>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebook size={24} />
          </a>
          <a href="mailto:mail@honeyscattery.com" className="social-icon">
            <FaEnvelope size={24} />
          </a>
        </div>
        <p className="mb-0">
          <a href="/contact">Contact Us</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;