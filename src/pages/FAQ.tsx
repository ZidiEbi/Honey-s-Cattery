import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FAQ = () => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <main className="main py-5">
        <div className="container">
          <h2 className="text-center mb-4">FAQ</h2>
          <p className="text-center">Answers to your most common questions.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;