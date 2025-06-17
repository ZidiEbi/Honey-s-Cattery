import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

// Ensure correct relative paths for local CSS and components
import "../styles/skyblueEyes.css";
import Header from "../styles/Header";
import Footer from "../styles/Footer";

const SkyblueEyes = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
  const features = [
    "Selective breeding for vibrant blue eyes",
    "Unique genetic lines",
    "Healthy, happy kittens",
  ];

  return (
    // Apply dark-mode class to the container-fluid based on isDark prop
    <div className={`container-fluid p-0 ${isDark ? 'dark-mode' : ''}`}>
      <Header toggleDark={toggleDark} isDark={isDark} />
      {/* Removed py-5 from main; padding handled by skyblueEyes.css */}
      <motion.main
        className="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container py-5"> {/* Keep py-5 on inner container for vertical spacing of content */}
          <h2 className="text-center mb-4">Skyblue Eyes Program</h2>
          <motion.div
            className="program-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className={`text-center mb-4 ${isDark ? 'text-white-50' : ''}`}>
              Our Skyblue Eyes Program focuses on breeding kittens with stunning blue eyes and bi-eye.
            </p>
            <ul className="feature-list">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={isDark ? 'text-white-50' : ''} // Apply dark mode text color
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default SkyblueEyes;
