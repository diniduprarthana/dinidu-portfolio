import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { FaBehance } from 'react-icons/fa'; // Behance icon
import { personalInfo } from '../utils/data';

const Footer = ({ scrollToSection }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  // Quote and author (fallbacks if not in personalInfo)
  const quote = personalInfo.quote || `"Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful."`;
  const quoteAuthor = personalInfo.quoteAuthor || "Albert Schweitzer";
  return (
    <footer className="relative z-10 mt-20 bg-gradient-to-br from-[#191e2e] via-[#232744] to-[#1b1f2e] border-t border-indigo-700/30 shadow-[0_2px_36px_0_rgba(80,100,180,0.10)]">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none" />

      {/* Scroll to top button */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
        <button 
          onClick={scrollToTop}
          className="bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-blue-500 hover:to-indigo-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 border border-white/10"
          aria-label="Scroll to top"
        >
          <FiArrowUp size={20} />
        </button>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand/About */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">Dinidu Liyanage</span>
            </div>
            <p className="text-blue-200 text-center md:text-left mb-2 max-w-xs text-sm">
              IT undergraduate passionate about web development, UI/UX design, and digital innovation.
            </p>
            <div className="flex space-x-4 mt-1">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-indigo-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href={personalInfo.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-indigo-400 transition-colors duration-300"
                aria-label="Behance"
              >
                <FaBehance size={20} />
              </a>
              <a
                href="https://github.com/diniduprarthana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-indigo-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-blue-300 hover:text-indigo-400 transition-colors duration-300"
                aria-label="Email"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center">
            <h3 className="text-white text-lg font-semibold mb-2">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-blue-200 hover:text-indigo-300 transition-colors duration-300 text-sm text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-blue-200 hover:text-indigo-300 transition-colors duration-300 text-sm text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-blue-200 hover:text-indigo-300 transition-colors duration-300 text-sm text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="text-blue-200 hover:text-indigo-300 transition-colors duration-300 text-sm text-left"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('skills')} 
                className="text-blue-200 hover:text-indigo-300 transition-colors duration-300 text-sm text-left"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-blue-200 hover:text-indigo-300 transition-colors duration-300 text-sm text-left"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-white text-lg font-semibold mb-2">Contact</h3>
            <p className="text-blue-200 text-center md:text-right mb-1 text-sm">
              <a href={`mailto:${personalInfo.email}`} className="hover:text-indigo-300 transition-colors duration-300">
                {personalInfo.email}
              </a>
            </p>
            <p className="text-blue-200 text-center md:text-right text-sm">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition-colors duration-300">
                LinkedIn Profile
              </a>
            </p>
          </div>
        </div>
        
        {/* Footer Quote - glass/embose card style */}
        <div className="mt-6 flex justify-center">
          <div className="
            w-full max-w-2xl
            rounded-2xl
            border border-blue-200/10
            bg-gradient-to-br from-[#22273a]/80 to-[#232744]/70
            shadow-[0_2px_24px_0_rgba(60,110,220,0.12)]
            px-5 py-4
            text-left
          ">
            <p className="text-blue-100 text-sm md:text-base font-medium italic mb-2 leading-relaxed">
              "{quote}"
            </p>
            <span className="block mt-2 font-semibold text-blue-300 text-sm">
              - {quoteAuthor}
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-blue-500 text-xs">
          © {currentYear} Dinidu Liyanage. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// This code defines a Footer component that includes social media links, quick navigation buttons, and a quote section.