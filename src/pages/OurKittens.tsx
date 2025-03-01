import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Styling/ourKittens.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OurKittens = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
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
                  <img src={`/assets/cat${i}.jpg`} className="kitten-img" alt={`Kitten ${i}`} />
                  <p>Kitten {i}</p>
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