import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/header.css"; // Ensure this path is correct

interface HeaderProps {
  toggleDark: () => void;
  isDark: boolean;
}

const Header = ({ toggleDark, isDark }: HeaderProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && navRef.current) {
      const firstLink = navRef.current.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  }, [isOpen]);

  const isActive = (path: string) =>
    location.pathname === path ? "active" : "";

  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container d-flex justify-content-between align-items-center header-container">
        {/* <h1 className="logo mb-0">Honey Cattery</h1> */}
        <button
          type="button"
          className="hamburger-button d-lg-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isOpen ? true : false}
          aria-controls="nav-menu"
        >
          <div className={`hamburger-icon ${isOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <motion.nav
          ref={navRef}
          id="nav-menu"
          className={`nav-menu ${isOpen ? "open" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="dark-mode-toggle-mobile p-2 d-lg-none">
            <button
              type="button"
              className="dark-mode-toggle btn btn-outline-secondary rounded-pill"
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              aria-pressed={isDark}
            >
              <i
                className={`bi ${isDark ? "bi-sun" : "bi-moon-stars"} me-1`}
              ></i>
              {isDark ? "Light" : "Dark"}
            </button>
          </div>
          <ul className="nav flex-column flex-lg-row align-items-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/")}`}
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/available-kittens")}`}
                to="/available-kittens"
                onClick={() => setIsOpen(false)}
              >
                Available Kittens
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/our-kittens")}`}
                to="/our-kittens"
                onClick={() => setIsOpen(false)}
              >
                Our Kittens
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/waiting-list")}`}
                to="/waiting-list"
                onClick={() => setIsOpen(false)}
              >
                Waiting List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/international-adoptions")}`}
                to="/international-adoptions"
                onClick={() => setIsOpen(false)}
              >
                International Adoptions
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/skyblue-eyes")}`}
                to="/skyblue-eyes"
                onClick={() => setIsOpen(false)}
              >
                Skyblue Eyes Program
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/faq")}`}
                to="/faq"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contact")}`}
                to="/contact"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="dark-mode-toggle btn btn-outline-secondary rounded-circle d-lg-block d-none"
                onClick={toggleDark}
                aria-label="Toggle dark mode"
                aria-pressed={isDark}
              >
                <i className={`bi ${isDark ? "bi-sun" : "bi-moon-stars"}`}></i>
              </button>
            </li>
          </ul>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;
