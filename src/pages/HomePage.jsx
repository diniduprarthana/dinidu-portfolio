import React, { useEffect, useRef, useState } from 'react';
import { FiArrowDown, FiDownload, FiChevronRight } from 'react-icons/fi';
import { gsap } from 'gsap';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { personalInfo } from '../utils/data';

const HomePage = () => {
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const imgRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const [isHoveringProjects, setIsHoveringProjects] = useState(false);
  const [isHoveringCV, setIsHoveringCV] = useState(false);

  // New ref for the paragraph
  const paragraphRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    );

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: 'back.out(1.7)' }
    );

    // Animate the paragraph entry (fade in and slide up)
    if (paragraphRef.current) {
      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: 'power3.out' }
      );
    }

    // Button animations
    gsap.fromTo(
      buttonContainerRef.current.children,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.2, 
        delay: 1.2, 
        ease: "elastic.out(1, 0.5)" 
      }
    );

    // Particles animation
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-primary-500/30';
      
      // Random size
      const size = Math.random() * 15 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      
      document.querySelector('.particles-container')?.appendChild(particle);
      
      // Animate and remove
      gsap.to(particle, {
        duration: Math.random() * 5 + 3,
        y: -Math.random() * 200,
        x: Math.random() * 100 - 50,
        opacity: 0,
        scale: 0,
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }
      });
    };
    
    const particleInterval = setInterval(createParticle, 500);
    
    return () => clearInterval(particleInterval);
  }, []);

  // Scroll to About section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: aboutSection,
          offsetY: 80
        },
        ease: "power3.inOut"
      });
    }
  };

  // Handle CV download with animation
  const handleDownloadCV = () => {
    // Create ripple effect
    createRippleEffect("cv-button");
    
    // Small delay before actual function
    setTimeout(() => {
      window.open(personalInfo.resume, '_blank');
    }, 300);
  };
  
  // Handle project button click with animation
  const handleProjectsClick = () => {
    // Create ripple effect
    createRippleEffect("projects-button");
    
    // Small delay before scrolling
    setTimeout(scrollToAbout, 300);
  };
  
  // Ripple effect function
  const createRippleEffect = (elementId) => {
    const button = document.getElementById(elementId);
    if (!button) return;
    
    // Remove existing ripple elements
    const ripples = button.getElementsByClassName("ripple");
    while (ripples.length > 0) {
      ripples[0].remove();
    }
    
    // Create new ripple element
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = "0px";
    circle.style.top = "0px";
    circle.classList.add("ripple");
    
    // Append the ripple
    button.appendChild(circle);
    
    // Animate and remove after animation completes - faster ripple
    gsap.to(circle, {
      scale: 2,
      opacity: 0,
      duration: 0.6, // Faster ripple effect
      ease: "power2.out",
      onComplete: () => {
        if (circle.parentNode === button) {
          button.removeChild(circle);
        }
      }
    });
  };

  // Button animation variants - faster hover animation
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
      transition: { 
        type: "spring", 
        stiffness: 500, // Higher stiffness for faster spring
        damping: 8 // Lower damping for faster effect
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 5px 15px -5px rgba(99, 102, 241, 0.4)",
      transition: { 
        type: "spring", 
        stiffness: 500,
        damping: 8
      }
    },
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.3)",
      transition: { 
        type: "spring", 
        stiffness: 500,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col justify-center relative overflow-hidden">
      {/* CSS for animations and effects - adjusted speeds */}
      <style jsx>{`
        .ripple {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 0.5s linear;
          pointer-events: none;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        .float-icon {
          animation: float-icon 1.6s ease-in-out infinite;
        }
        
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .gradient-bg {
          background-size: 200% 200%;
          animation: gradient-shift 2s ease infinite;
        }
        
        .btn-glow {
          position: relative;
        }
        
        .btn-glow::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          z-index: -1;
          background: linear-gradient(90deg, #4f46e5, #8b5cf6, #4f46e5);
          background-size: 200% 200%;
          border-radius: 0.5rem;
          animation: gradient-shift 2s ease infinite;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .btn-glow:hover::before {
          opacity: 1;
        }
        
        /* Faster continuous bounce animation */
        @keyframes continuous-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        .continuous-bounce {
          animation: continuous-bounce 1.2s ease-in-out infinite;
        }
        
        /* Faster continuous download animation */
        @keyframes continuous-download {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px) rotate(3deg);
          }
          75% {
            transform: translateY(-1px) rotate(-2deg);
          }
        }
        
        .continuous-download {
          animation: continuous-download 1.5s ease-in-out infinite;
        }

        /* Faster arrow slide animation */
        @keyframes arrow-slide {
          0% {
            opacity: 0;
            transform: translateX(-15px);
          }
          20% {
            opacity: 0.4;
            transform: translateX(0);
          }
          80% {
            opacity: 0.4;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(15px);
          }
        }
        
        .slide-arrow {
          animation: arrow-slide 2.8s ease-in-out infinite;
        }
      `}</style>
      
      {/* Particle container */}
      <div className="particles-container absolute inset-0 z-0"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-primary-950/80 z-0"></div>
      
      <div className="section-container relative z-10 flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-2 inline-block"
            >
              <span className="bg-gradient-to-r from-primary-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
                Hello, I'm
              </span>
            </motion.div>
            
            <h1 
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            >
              Dinidu Liyanage
            </h1>
            
            <div 
              ref={textRef} 
              className="text-xl md:text-2xl text-gray-300 mb-6 h-12"
            >
              <TypeAnimation
                sequence={[
                  'IT Undergraduate',
                  1000,
                  'Web Developer',
                  1000,
                  'UI/UX Designer',
                  1000,
                  'Project Leader',
                  1000,
                  'Digital Innovator',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-primary-400 font-medium"
              />
            </div>
            
            {/* Entry-animated paragraph */}
            <p
              ref={paragraphRef}
              className="text-gray-300 mb-8 max-w-lg"
              style={{
                opacity: 0,
                transform: 'translateY(30px)'
              }}
            >
              Passionate about creating digital experiences that are both functional and visually appealing.
              Specializing in web development, UI/UX design, and innovative digital solutions.
            </p>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div 
              ref={imgRef}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full relative animate-float"
            >
              {/* Profile image with glowing border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 animate-spin-slow opacity-70"></div>
              <img
                src={personalInfo.profile}
                alt="Dinidu Liyanage"
                className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover rounded-full border-4 border-primary-950"
              />
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-2 rounded-full text-white text-sm font-medium animate-pulse shadow-lg">
                Full Stack
              </div>
              <div className="absolute -bottom-2 -left-6 bg-gradient-to-r from-primary-600 to-cyan-500 px-4 py-2 rounded-full text-white text-sm font-medium animate-pulse shadow-lg">
                Designer
              </div>
            </div>
          </div>
        </div>
        
        {/* Container for bottom elements */}
        <div className="w-full mt-16 px-4 lg:px-8">
          {/* Action Buttons - Left aligned */}
          <div ref={buttonContainerRef} className="flex flex-wrap gap-4 justify-start mb-10">
            {/* View Projects Button */}
            <motion.button 
              id="projects-button"
              onClick={handleProjectsClick}
              className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-500 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all btn-glow"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate={isHoveringProjects ? "hover" : "rest"}
              onMouseEnter={() => setIsHoveringProjects(true)}
              onMouseLeave={() => setIsHoveringProjects(false)}
              variants={buttonVariants}
            >
              {/* Animated background gradient */}
              <motion.div 
                className="absolute inset-0 opacity-0 bg-gradient-to-r from-primary-500 to-accent-400 gradient-bg"
                animate={{ opacity: isHoveringProjects ? 1 : 0 }}
                transition={{ duration: 0.2 }} // Faster transition
              />
              
              {/* Button content */}
              <motion.span 
                className="relative z-10"
                animate={isHoveringProjects ? { x: 3 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 8 }} // Snappier spring
              >
                View Projects
              </motion.span>
              
              <motion.div className="relative z-10">
                {/* Continuously animated arrow icon - faster animation via CSS */}
                <div className="continuous-bounce">
                  <FiArrowDown size={18} />
                </div>
                
                {/* Enhanced hover effect - faster animation */}
                {isHoveringProjects && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-white/10"
                    initial={{ scale: 0, opacity: 0.8, x: "-50%", y: "-50%" }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6, repeat: 1, repeatDelay: 0.3 }} // Faster pulse
                  />
                )}
              </motion.div>
              
              {/* Arrow indicator - always visible with slide animation when not hovering */}
              <motion.div 
                className={`absolute right-2 text-white/30 ${!isHoveringProjects ? "slide-arrow" : ""}`}
                animate={isHoveringProjects ? 
                  { opacity: 0.8, x: 0 } : 
                  { opacity: 0.3, x: 0 }
                }
                initial={isHoveringProjects ? { opacity: 0, x: -10 } : { opacity: 0.3, x: 0 }}
                transition={{ duration: 0.2 }} // Faster transition
              >
                <FiChevronRight size={14} />
              </motion.div>
            </motion.button>
            
            {/* Download CV Button */}
            <motion.button 
              id="cv-button"
              onClick={handleDownloadCV}
              className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-accent-500 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all btn-glow"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate={isHoveringCV ? "hover" : "rest"}
              onMouseEnter={() => setIsHoveringCV(true)}
              onMouseLeave={() => setIsHoveringCV(false)}
              variants={buttonVariants}
            >
              {/* Animated glow effect */}
              <motion.div 
                className="absolute inset-0 opacity-0 bg-gradient-to-r from-primary-500 to-accent-400 gradient-bg"
                animate={{ opacity: isHoveringCV ? 1 : 0 }}
                transition={{ duration: 0.2 }} // Faster transition
              />
              
              {/* Shimmer effect on hover - faster animation */}
              {isHoveringCV && (
                <motion.div 
                  className="absolute inset-0 w-full h-full"
                  initial={{ 
                    x: "-100%", 
                    opacity: 0,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                  }}
                  animate={{ 
                    x: "100%", 
                    opacity: 0.6 
                  }}
                  transition={{ 
                    duration: 0.7, // Faster shimmer
                    repeat: 1,
                    repeatType: "loop" 
                  }}
                />
              )}
              
              {/* Button content */}
              <motion.span 
                className="relative z-10"
                animate={isHoveringCV ? { x: 3 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 8 }} // Snappier spring
              >
                Download CV
              </motion.span>
              
              <motion.div className="relative z-10">
                {/* Continuously animated download icon - faster animation via CSS */}
                <div className="continuous-download">
                  <FiDownload size={18} />
                </div>
                
                {/* Enhanced hover effect - faster animation */}
                {isHoveringCV && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-white/10"
                    initial={{ scale: 0, opacity: 0.8, x: "-50%", y: "-50%" }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6, repeat: 1, repeatDelay: 0.3 }} // Faster pulse
                  />
                )}
              </motion.div>
              
              {/* Arrow indicator - always visible with slide animation when not hovering */}
              <motion.div 
                className={`absolute right-2 text-white/30 ${!isHoveringCV ? "slide-arrow" : ""}`}
                animate={isHoveringCV ?
                  { opacity: 0.8, x: 0 } : 
                  { opacity: 0.3, x: 0 }
                }
                initial={isHoveringCV ? { opacity: 0, x: -10 } : { opacity: 0.3, x: 0 }}
                transition={{ duration: 0.2 }} // Faster transition
              >
                <FiChevronRight size={14} />
              </motion.div>
            </motion.button>
          </div>
        </div>
        
        {/* Scroll indicator - Centered and separate */}
        <button 
          onClick={scrollToAbout}
          className="flex flex-col items-center cursor-pointer mt-4"
        >
          <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary-500 rounded-full animate-bounce mt-2"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomePage;