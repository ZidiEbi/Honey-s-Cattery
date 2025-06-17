import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Standard import for Bootstrap CSS from node_modules - stays here.
import "bootstrap/dist/css/bootstrap.min.css";
// Your global CSS - stays here.
import "./index.css";

// Import Header and Footer from the components folder, relative to App.tsx
// Ensure these files are indeed located in src/components/
import Header from "./components/Header";
import Footer from "./components/Footer";

// Lazy load all your page components.
// The paths are relative to the 'src' directory because this App.tsx is in 'src'.
// This assumes your 'pages' folder is directly inside 'src'.
const HomePage = lazy(() => import("./pages/Homepage"));
const AvailableKittens = lazy(() => import("./pages/AvailableKittens"));
const OurKittens = lazy(() => import("./pages/OurKittens"));
const WaitingList = lazy(() => import("./pages/WaitingList"));
const InternationalAdoptions = lazy(() => import("./pages/InternationalAdoptions"));
const SkyblueEyes = lazy(() => import("./pages/SkyblueEyes"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Payment = lazy(() => import("./pages/Payment"));

/**
 * The main application component for Honey's Cattery.
 * This component manages the global dark mode state and defines the application's routing.
 *
 * This App.tsx file should be located directly within the `src` folder.
 */
const App = () => {
  // State for managing dark mode, shared across the application.
  const [isDark, setIsDark] = useState(false);

  /**
   * Toggles the dark mode state. This function is passed down to children
   * components like Header to allow changing the theme.
   */
  const toggleDark = () => setIsDark((prev: boolean) => !prev);

  return (
    // Router component wraps the entire application to enable client-side routing.
    <Router>
      {/* Suspense provides a fallback UI (e.g., "Loading...") while lazy-loaded components are loading. */}
      <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
        {/* Routes component defines all the possible paths in the application. */}
        <Routes>
          {/* Each Route defines a specific path and the component to render for that path. */}
          <Route path="/" element={<HomePage toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/available-kittens" element={<AvailableKittens toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/our-kittens" element={<OurKittens toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/waiting-list" element={<WaitingList toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/international-adoptions" element={<InternationalAdoptions toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/skyblue-eyes" element={<SkyblueEyes toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/faq" element={<FAQ toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/contact" element={<Contact toggleDark={toggleDark} isDark={isDark} />} />
          <Route path="/payment" element={<Payment toggleDark={toggleDark} isDark={isDark} />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
