import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Styling/faq.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FAQ = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
  const faqs = [
    { q: "How do I adopt a kitten?", a: "Contact us via the form to start the process!" },
    { q: "What’s the Skyblue Eyes Program?", a: "A breeding program for blue-eyed Shorthairs." },
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
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
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