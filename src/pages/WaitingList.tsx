import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Styling/waitingList.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WaitingList = ({ toggleDark, isDark }: { toggleDark: () => void; isDark: boolean }) => {
  return (
    <div className="container-fluid p-0">
      <Header toggleDark={toggleDark} isDark={isDark} />
      <motion.main
        className="main py-5"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h2 className="text-center mb-4">Join Our Waiting List</h2>
          <motion.div
            className="waiting-list-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-center mb-4">Sign up to be notified of new litters!</p>
            <form>
              <input type="text" placeholder="Full Name" className="form-control mb-3" />
              <input type="email" placeholder="Email Address" className="form-control mb-3" />
              <select className="form-control mb-3">
                <option value="">Preferred Color</option>
                <option value="cinnamon">Cinnamon</option>
                <option value="chocolate">Chocolate</option>
                <option value="blue">Blue-Eyed</option>
              </select>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default WaitingList;