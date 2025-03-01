import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Styling/skyblueEyes.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SkyblueEyes = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
  const features = [
    "Selective breeding for vibrant blue eyes",
    "Unique genetic lines",
    "Healthy, happy kittens",
  ];

  return (
    <div className="container-fluid p-0">
      <Header toggleDark={toggleDark} isDark={isDark} />
      <motion.main
        className="main py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h2 className="text-center mb-4">Skyblue Eyes Program</h2>
          <motion.div
            className="program-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-center mb-4">
              Our Skyblue Eyes Program focuses on breeding British Shorthairs with stunning blue eyes.
            </p>
            <ul className="feature-list">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
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