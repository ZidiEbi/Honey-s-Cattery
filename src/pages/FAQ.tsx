import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

// Ensure correct relative paths for local CSS and components
import "../styles/faq.css";
import Header from "../styles/Header";
import Footer from "../styles/Footer";

const FAQ = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
  const faqs = [
    { q: "How do I adopt a kitten?", a: "Contact us via the form to start the process!" },
    { q: "What’s the Skyblue Eyes Program?", a: "A breeding program for blue-eyed Shorthairs." },
    { q: "What is your health guarantee?", a: "All kittens come with a health guarantee and are vet-checked." },
    { q: "Do you ship internationally?", a: "Yes, we offer international shipping. Please see our International Adoptions page for details." },
    { q: "What food do you recommend?", a: "We provide detailed guidance on nutrition for your new kitten." },
  ];

  return (
    // Apply dark-mode class to the container-fluid based on isDark prop
    <div className={`container-fluid p-0 ${isDark ? 'dark-mode' : ''}`}>
      <Header toggleDark={toggleDark} isDark={isDark} />
      {/* Removed py-5 from main; padding handled by faq.css */}
      <motion.main
        className="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container py-5"> {/* Keep py-5 on inner container for vertical spacing of content */}
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className={isDark ? 'text-white' : ''}>{faq.q}</h3> {/* Apply dark mode text color */}
                <p className={isDark ? 'text-white-50' : ''}>{faq.a}</p> {/* Apply dark mode text color */}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default FAQ;
