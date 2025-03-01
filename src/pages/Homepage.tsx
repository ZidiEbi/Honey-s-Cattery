import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion"; // Import Framer Motion
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SwiperComponent from "../components/swiper";

interface CardProps {
  src: string;
  alt: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ src, alt, title }) => {
  const [loaded, setLoaded] = useState(false);
  const controls = useAnimation(); // Framer Motion controls for animation

  // Trigger animation when the image loads
  useEffect(() => {
    if (loaded) {
      controls.start("visible");
    }
  }, [loaded, controls]);

  return (
    <motion.div
      className="card h-100 border-0"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 20px rgba(135, 168, 201, 0.3)",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      onLoad={() => setLoaded(true)}
    >
      {!loaded && <div className="skeleton" />}
      <img
        src={src}
        className="card-img-top img-fluid"
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? "block" : "none" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{title}</h5>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  const [isDark, setIsDark] = useState(false);
  const pageControls = useAnimation(); // Controls for page entrance

  useEffect(() => {
    // Animate page on load
    pageControls.start("visible");

    // Scroll handler for header
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageControls]);

  // Page variants for entrance animation
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      className={`container-fluid p-0 ${isDark ? "dark-mode" : ""}`}
      initial="hidden"
      animate={pageControls}
      variants={pageVariants}
    >
      <Header toggleDark={() => setIsDark(!isDark)} isDark={false} />
      <main className="main py-5">
        <div className="container">
          <h2 className="text-center mb-4">Home</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/fendi.jpg" alt="Garfield Ginger" title="Garfield Ginger" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/3.jpg" alt="Grey Shorthair" title="Grey Shorthair" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/black-cat.jpg" alt="Blue-Eyed Beauty" title="Dark Swade" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/striped-cat.jpg" alt="Fawn Kitten" title="Fawn Kitten" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/grey-kitten.jpg" alt="Chocolate Shorthair" title="Blue-Eyed Beauty" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/1.jpg" alt="Lilac Shorthair" title="Lilac Shorthair" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/chocolate-shorthair.jpg" alt="Lilac Shorthair" title="Cinnamon Shorthair" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/4.jpg" alt="Skyblue Star" title="Long-Haired Ginger" />
            </div>
          </div>
        </div>

        <SwiperComponent />

      </main>
      <Footer />
    </motion.div>
  );
};

export default HomePage;