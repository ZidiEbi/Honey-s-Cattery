import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

// Ensure correct relative paths based on your styles folder structure
import "../styles/ourKittens.css";
import Header from "../styles/Header";
import Footer from "../styles/Footer";

const OurKittens = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
  return (
    // Apply dark-mode class to the container-fluid based on isDark prop
    <div className={`container-fluid p-0 ${isDark ? 'dark-mode' : ''}`}>
      <Header toggleDark={toggleDark} isDark={isDark} />
      {/* Removed py-5 from main, padding will now be handled by ourKittens.css */}
      <motion.main
        className="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container py-5"> {/* Keep py-5 on inner container for vertical spacing of content */}
          <h2 className="text-center mb-4">Our Kittens</h2>
          <div className="row g-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="col-12 col-md-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="kitten-card">
                  {/* Updated image path to correctly reference from public/images/ */}
                  <img src={`/images/${i}.jpg`} className="kitten-img" alt={`Kitten ${i}`} onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x300/CCCCCC/000000?text=Image+Not+Found'; }} />
                  <p className={isDark ? 'text-white' : ''}>Kitten {i}</p> {/* Apply text color based on dark mode */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default OurKittens;
