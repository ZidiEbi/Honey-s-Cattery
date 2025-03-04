import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const HomePage = lazy(() => import("./pages/Homepage"));
const AvailableKittens = lazy(() => import("./pages/AvailableKittens"));
const OurKittens = lazy(() => import("./pages/OurKittens"));
const WaitingList = lazy(() => import("./pages/WaitingList"));
const InternationalAdoptions = lazy(() => import("./pages/InternationalAdoptions"));
const SkyblueEyes = lazy(() => import("./pages/SkyblueEyes"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Payment = lazy(() => import("./pages/Payment")); // Ensure this import exists

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((prev: boolean) => !prev);

  return (
    <Router>
      <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/available-kittens" element={<AvailableKittens toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/our-kittens" element={<OurKittens toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/waiting-list" element={<WaitingList toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/international-adoptions" element={<InternationalAdoptions toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/skyblue-eyes" element={<SkyblueEyes toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/faq" element={<FAQ toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/contact" element={<Contact toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/payment" element={<Payment toggleDark={toggleDark} isDark={isDark} />} /> {/* Ensure this route exists */}
        </Routes>
      </Suspense>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Removed custom useState function as it is not needed
