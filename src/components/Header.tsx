import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Using Heroicons for modern icons
import "../index.css"

interface HeaderProps {
  toggleDark: () => void;
  isDark: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDark, isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Handle scroll for header styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Available Kittens', path: '/available-kittens' },
    { name: 'Our Kittens', path: '/our-kittens' },
    { name: 'Waiting List', path: '/waiting-list' },
    { name: 'International Adoptions', path: '/international-adoptions' },
    { name: 'Skyblue Eyes Program', path: '/skyblue-eyes' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, x: '100vw' },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    exit: { opacity: 0, x: '100vw', transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${isScrolled ? 'h-16 bg-white bg-opacity-90 shadow-md backdrop-blur-sm' : 'h-24 bg-transparent'}
        ${isDark ? 'dark:bg-gray-900 dark:bg-opacity-90 dark:shadow-lg' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
    >
      <nav className="container mx-auto flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className={`font-cinzel text-2xl md:text-3xl font-bold transition-colors duration-300
          ${isDark ? 'text-white' : 'text-amber-800'}`}>
          Honey's Cattery
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-cormorant text-lg font-medium hover:text-blue-600 transition-colors duration-300
                ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'}
                ${location.pathname === link.path ? (isDark ? 'text-blue-400' : 'text-blue-600') : ''}`}
            >
              {link.name}
            </Link>
          ))}
          {/* Dark Mode Toggle for Desktop */}
          <button
            onClick={toggleDark}
            className={`p-2 rounded-full border transition-all duration-300
              ${isDark ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-amber-800 text-amber-800 hover:bg-amber-100'}`}
            aria-label="Toggle dark mode"
          >
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Hamburger Menu & Dark Mode Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleDark}
            className={`p-2 rounded-full border transition-all duration-300
              ${isDark ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-amber-800 text-amber-800 hover:bg-amber-100'}`}
            aria-label="Toggle dark mode"
          >
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 focus:outline-none transition-colors duration-300
              ${isDark ? 'text-white hover:text-gray-400' : 'text-amber-800 hover:text-amber-600'}`}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`fixed top-0 right-0 h-full w-3/4 bg-white shadow-xl flex flex-col p-8 transition-colors duration-300
              ${isDark ? 'dark:bg-gray-800' : 'bg-gray-50'}`}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className={`absolute top-4 right-4 p-2 focus:outline-none transition-colors duration-300
                ${isDark ? 'text-white hover:text-gray-400' : 'text-amber-800 hover:text-amber-600'}`}
              aria-label="Close navigation menu"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
            <div className="mt-16 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-cormorant text-xl font-medium text-right hover:text-blue-600 transition-colors duration-300
                    ${isDark ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700'}
                    ${location.pathname === link.path ? (isDark ? 'text-blue-400' : 'text-blue-600') : ''}`}
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
