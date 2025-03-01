import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Styling/internationalAdoptions.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const InternationalAdoptions = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
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
          <h2 className="text-center mb-4">International Adoptions</h2>
          <motion.div
            className="adoption-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              We proudly offer our British Shorthair kittens to loving homes worldwide. Our
              international adoption process ensures safe travel and compliance with all regulations.
              Contact us to learn about shipping options, costs, and requirements for your country.
            </p>
            <p className="mt-3">
              <strong>Steps:</strong> Fill out our inquiry form, discuss details with our team, and
              prepare for your new family member!
            </p>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default InternationalAdoptions;