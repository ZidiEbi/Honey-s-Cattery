import React from 'react';
import { motion } from 'framer-motion';
import { FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa'; // Using react-icons for social media
import "../index.css"
const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-gray-200 py-6 text-center transition-colors duration-300
        dark:bg-gray-800 text-gray-700 dark:text-gray-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-cinzel text-sm md:text-base mb-3">
          &copy; {new Date().getFullYear()} Honey's Cattery. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mb-3">
          <a
            href="https://tiktok.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 dark:text-gray-400 dark:hover:text-blue-400"
            aria-label="Follow us on TikTok"
          >
            <FaTiktok size={24} />
          </a>
          <a
            href="https://www.instagram.com/p/C25Rh0Uom7P/?igsh=Mzl6aGZiZDcxM3Nr" // Consider changing to main profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 dark:text-gray-400 dark:hover:text-blue-400"
            aria-label="Follow us on Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 dark:text-gray-400 dark:hover:text-blue-400"
            aria-label="Follow us on Facebook"
          >
            <FaFacebook size={24} />
          </a>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Crafted with love for purrfect homes.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
