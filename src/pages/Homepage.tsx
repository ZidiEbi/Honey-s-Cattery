import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useInView } from "react-intersection-observer";

const Card = ({ src, alt, title }) => {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className={`card h-100 border-0 ${inView ? "in-view" : ""}`}>
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
    </div>
  );
};

const HomePage = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      header.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`container-fluid p-0 ${isDark ? "dark-mode" : ""}`}>
      <Header toggleDark={() => setIsDark(!isDark)} />
      <main className="main py-5">
        <div className="container">
          <h2 className="text-center mb-4">Home</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/fendi.jpg" alt="Cinnamon Kitten" title="Cinnamon Kitten" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/grey-kitten.jpg" alt="Chocolate Shorthair" title="Chocolate Shorthair" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/black-cat.jpg" alt="Blue-Eyed Beauty" title="Blue-Eyed Beauty" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="../src/assets/striped-cat.jpg" alt="Fawn Kitten" title="Fawn Kitten" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="/assets/cat5.jpg" alt="Lilac Shorthair" title="Lilac Shorthair" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="/assets/cat6.jpg" alt="Cream Kitten" title="Cream Kitten" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="/assets/cat7.jpg" alt="Golden Shorthair" title="Golden Shorthair" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Card src="/assets/cat8.jpg" alt="Skyblue Star" title="Skyblue Star" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;