import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

interface HeaderProps {
  toggleDark: () => void;
  isDark: boolean;
}

const Header = ({ toggleDark, isDark }: HeaderProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Ensure starts closed
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle menu state
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close menu on outside click
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center header-container">
        {/* Logo */}
        <h1 className="logo mb-0">Honey's Exotic Cattery</h1>

        {/* Hamburger (Mobile Only) */}
        <button
          className="hamburger-button d-md-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <div className={`hamburger-icon ${isOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Navigation Menu */}
        <nav ref={navRef} className={`nav-menu ${isOpen ? "open" : ""}`}>
          {/* Dark Mode Toggle (Mobile Dropdown - Top) */}
          <div className="dark-mode-toggle-mobile p-2 d-md-none">
            <button
              className="dark-mode-toggle btn btn-outline-secondary rounded-pill"
              onClick={toggleDark}
              aria-label="Toggle dark mode"
            >
              <i className={`bi ${isDark ? "bi-sun" : "bi-moon-stars"} me-1`}></i>
              {isDark ? "Light" : "Dark"}
            </button>
          </div>

          {/* Nav Links */}
          <ul className="nav flex-column flex-md-row align-items-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/available-kittens" ? "active" : ""}`}
                to="/available-kittens"
                onClick={() => setIsOpen(false)}
              >
                Available Kittens
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/our-kittens" ? "active" : ""}`}
                to="/our-kittens"
                onClick={() => setIsOpen(false)}
              >
                Our Kittens
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/waiting-list" ? "active" : ""}`}
                to="/waiting-list"
                onClick={() => setIsOpen(false)}
              >
                Waiting List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/international-adoptions" ? "active" : ""}`}
                to="/international-adoptions"
                onClick={() => setIsOpen(false)}
              >
                Foreign Exports
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/skyblue-eyes" ? "active" : ""}`}
                to="/skyblue-eyes"
                onClick={() => setIsOpen(false)}
              >
                Skyblue Eyes Program
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/faq" ? "active" : ""}`}
                to="/faq"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
                to="/contact"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Dark Mode Toggle (Desktop Only) */}
        <button
          className="dark-mode-toggle btn btn-outline-secondary rounded-circle d-md-block d-none"
          onClick={toggleDark}
          aria-label="Toggle dark mode"
        >
          <i className={`bi ${isDark ? "bi-sun" : "bi-moon-stars"}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;