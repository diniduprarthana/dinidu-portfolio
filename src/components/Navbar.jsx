import React, { useState, useEffect, useRef } from 'react';
import { FiDownload, FiMenu, FiX, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../utils/data';

const Navbar = ({ activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [downloadHovered, setDownloadHovered] = useState(false);
  const navRef = useRef(null);
  
  // Navigation links
  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'References', id: 'references' },
    { name: 'Contact', id: 'contact' },
  ];

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation click
  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  // Navbar container animation
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  // Logo animation
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Items animation (staggered children)
  const navItemsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    }
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // Enhanced download button animation
  const downloadBtnVariants = {
    initial: { 
      boxShadow: "0 0 0 rgba(99, 102, 241, 0)" 
    },
    hover: { 
      boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
      transition: { 
        duration: 0.3,
        yoyo: Infinity,
        repeatDelay: 0.5
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 0 5px rgba(99, 102, 241, 0.7)",
    }
  };

  // Download button icon animation
  const downloadIconVariants = {
    initial: { y: 0 },
    hover: { 
      y: [0, -3, 0, -3, 0],
      transition: { 
        duration: 0.6, 
        repeat: Infinity, 
        repeatDelay: 3
      }
    }
  };

  const downloadTextVariants = {
    initial: { x: 0 },
    hover: { 
      x: 3,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Mobile menu animation
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const mobileNavItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Mobile download button variants
  const mobileDownloadVariants = {
    initial: { 
      background: "linear-gradient(to right, rgb(99, 102, 241, 0.9), rgb(168, 85, 247, 0.9))"
    },
    hover: { 
      background: "linear-gradient(to right, rgb(79, 83, 235, 1), rgb(147, 51, 234, 1))",
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { 
      y: 0, 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.header 
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-primary-950/90 backdrop-blur-md shadow-lg py-1' 
          : 'bg-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <motion.div 
            variants={logoVariants}
            className="flex items-center"
          >
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-xl md:text-2xl font-bold relative group"
            >
              <span className="text-primary-500 transition-all duration-300 group-hover:text-primary-400">
                Dinidu
              </span>
              <span className="text-white transition-all duration-300 group-hover:text-blue-100">
                {" "}Liyanage
              </span>
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 w-0 group-hover:w-full transition-all duration-300"
                whileHover={{ scaleX: 1 }}
                initial={{ scaleX: 0 }}
              />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            variants={navItemsContainerVariants}
            className="hidden md:flex items-center space-x-1"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                variants={navItemVariants}
                className="relative"
              >
                <button 
                  onClick={() => handleNavClick(link.id)} 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative ${
                    activeSection === link.id ? 'text-primary-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeNavSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-3"
                      initial={false}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 380, 
                        damping: 30 
                      }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
            
            {/* Enhanced Download Resume Button */}
            <motion.div
              variants={navItemVariants}
              className="ml-4"
            >
              <motion.a 
                href={personalInfo.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-600 rounded-md shadow-md overflow-hidden group"
                variants={downloadBtnVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setDownloadHovered(true)}
                onHoverEnd={() => setDownloadHovered(false)}
              >
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute -inset-1 rounded-md opacity-30 group-hover:opacity-50 blur-sm bg-gradient-to-r from-primary-500 to-accent-400"
                  animate={{ 
                    background: downloadHovered 
                      ? ["linear-gradient(to right, rgb(99, 102, 241), rgb(168, 85, 247))", 
                         "linear-gradient(to right, rgb(168, 85, 247), rgb(99, 102, 241))"] 
                      : "linear-gradient(to right, rgb(99, 102, 241), rgb(168, 85, 247))" 
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                
                {/* Button content */}
                <div className="relative flex items-center justify-center w-full h-full">
                  <motion.div
                    variants={downloadIconVariants}
                    className="relative"
                  >
                    <FiDownload size={16} className="relative z-10" />
                    {downloadHovered && (
                      <motion.div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.7, repeat: 1, repeatDelay: 0.3 }}
                      />
                    )}
                  </motion.div>
                  <motion.span 
                    variants={downloadTextVariants}
                    className="relative z-10"
                  >
                    Resume
                  </motion.span>
                  
                  {downloadHovered && (
                    <motion.div 
                      className="absolute right-1 text-white/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronRight size={14} />
                    </motion.div>
                  )}
                </div>
              </motion.a>
            </motion.div>
          </motion.nav>

          {/* Mobile menu button */}
          <motion.div 
            variants={navItemVariants}
            className="md:hidden flex items-center"
          >
            <motion.button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-primary-900/95 backdrop-blur-lg border-t border-primary-800/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <motion.button 
                  key={link.name}
                  variants={mobileNavItemVariants}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-md text-base font-medium transition-all duration-300 ${
                    activeSection === link.id 
                      ? 'bg-primary-700/60 text-white' 
                      : 'text-gray-300 hover:bg-primary-800/40 hover:text-white'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div 
                      layoutId="activeMobileNavSection"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-accent-500 rounded-r"
                      initial={false}
                      transition={{ 
                        type: "spring", 
                        stiffness: 380, 
                        damping: 30 
                      }}
                    />
                  )}
                </motion.button>
              ))}
              
              {/* Enhanced Mobile Download Button */}
              <motion.div
                variants={mobileNavItemVariants}
                className="pt-2"
              >
                <motion.a 
                  variants={mobileDownloadVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  href={personalInfo.resume} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative block w-full px-4 py-3 rounded-md text-base font-medium text-white shadow-lg overflow-hidden"
                >
                  {/* Animated highlight effect */}
                  <motion.div 
                    className="absolute inset-0 w-full h-full" 
                    animate={{
                      background: [
                        "linear-gradient(to right, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8))",
                        "linear-gradient(to right, rgba(168, 85, 247, 0.8), rgba(99, 102, 241, 0.8))"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  {/* Animated pulse */}
                  <motion.div 
                    className="absolute inset-0 bg-white/5"
                    animate={{ 
                      boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.3)", "0 0 0px rgba(255,255,255,0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ 
                          y: [0, -3, 0],
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatDelay: 1 
                        }}
                      >
                        <FiDownload size={18} />
                      </motion.div>
                      <span className="font-semibold">Download Resume</span>
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <FiChevronRight size={18} />
                    </motion.div>
                  </div>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;