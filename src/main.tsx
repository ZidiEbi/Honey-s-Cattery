import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Lazy load pages for performance
const HomePage = lazy(() => import("./pages/homepage"));
const AvailableKittens = lazy(() => import("./pages/AvailableKittens"));
const OurKittens = lazy(() => import("./pages/OurKittens"));
const WaitingList = lazy(() => import("./pages/WaitingList"));
const InternationalAdoptions = lazy(() => import("./pages/InternationalAdoptions"));
const SkyblueEyes = lazy(() => import("./pages/SkyblueEyes"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));

  
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/available-kittens" element={<AvailableKittens />} />
          <Route path="/our-kittens" element={<OurKittens toggleDark={() => {}} isDark={false} />} />
          <Route path="/waiting-list" element={<WaitingList />} />
          <Route path="/international-adoptions" element={<InternationalAdoptions />} />
          <Route path="/skyblue-eyes" element={<SkyblueEyes />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);