import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

// Ensure correct relative paths based on your styles folder structure
import "../styles/internationalAdoptions.css";
import Header from "../styles/Header";
import Footer from "../styles/Footer";

const InternationalAdoptions = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
  return (
    // Apply dark-mode class to the container-fluid based on isDark prop
    <div className={`container-fluid p-0 ${isDark ? 'dark-mode' : ''}`}>
      <Header toggleDark={toggleDark} isDark={isDark} />
      {/* Removed py-5 from main; padding will now be handled by internationalAdoptions.css */}
      <motion.main
        className="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container py-5"> {/* Keep py-5 on inner container for vertical spacing of content */}
          <h2 className="text-center mb-4">International Adoptions</h2>
          <motion.div
            className="adoption-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className={isDark ? 'text-white-50' : ''}> {/* Apply dark mode text color */}
              We proudly offer our British Shorthair kittens to loving homes worldwide. Our
              international adoption process ensures safe travel and compliance with all regulations.
              Contact us to learn about shipping options, costs, and requirements for your country.
            </p>
            <p className={`mt-3 ${isDark ? 'text-white-50' : ''}`}> {/* Apply dark mode text color */}
              <strong className={isDark ? 'text-white' : ''}>Steps:</strong> Fill out our inquiry form, discuss details with our team, and
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
// This code defines a React component for the International Adoptions page, which includes a header, main content area with adoption information, and a footer. The component uses Framer Motion for animations and applies dark mode styles based on the `isDark` prop.
// The main content includes a brief description of the international adoption process and steps for potential adopters