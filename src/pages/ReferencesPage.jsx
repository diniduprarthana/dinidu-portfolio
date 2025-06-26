import React, { useEffect, useRef, useState } from 'react';
import { FiStar, FiMail, FiUser, FiCheck, FiArrowLeft, FiArrowRight, FiBriefcase, FiSend, FiCheckCircle } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { references } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

// Animated background blob component
const AnimatedBlob = ({ color, delay, size = 'w-96 h-96', position = '', blur = 'blur-3xl' }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ 
      scale: [0.8, 1.2, 0.9, 1.1, 0.9],
      opacity: [0, 0.2, 0.1, 0.2, 0.1],
      rotate: [0, 90, 180, 270, 360]
    }}
    transition={{
      duration: 25,
      delay: delay,
      repeat: Infinity,
      repeatType: "reverse",
    }}
    className={`absolute ${size} rounded-full ${blur} ${color} ${position} pointer-events-none`}
    style={{ filter: 'blur(60px)' }}
  />
);

// Floating particles component
const FloatingParticles = ({ count = 15 }) => {
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    const size = Math.floor(Math.random() * 3) + 1;
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 15 + 10;
    const color = i % 4 === 0 ? 'bg-primary-400/20' : 
                 i % 4 === 1 ? 'bg-accent-400/20' : 
                 i % 4 === 2 ? 'bg-indigo-400/20' : 'bg-blue-400/20';
    
    particles.push(
      <motion.div
        key={i}
        className={`absolute w-${size} h-${size} rounded-full ${color}`}
        style={{ 
          left: `${xPos}%`, 
          top: `${yPos}%` 
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 0.4, 0],
          scale: [0, 1, 0.5],
          y: [-30, -120],
          x: [0, Math.random() * 50 - 25]
        }}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Infinity,
          repeatDelay: Math.random() * 3
        }}
      />
    );
  }
  
  return particles;
};

const QuoteIcon = ({ className = "", rotate = false }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={`${className} ${rotate ? 'rotate-180' : ''}`}
    fill="currentColor"
    width="50"
    height="50"
  >
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
  </svg>
);

const ReferencesPage = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formStatus, setFormStatus] = useState(null); // 'submitting', 'success', 'error'
  const [formInput, setFormInput] = useState({
    name: '',
    role: '',
    email: '',
    feedback: ''
  });
  const [focused, setFocused] = useState({
    name: false,
    role: false,
    email: false,
    feedback: false
  });
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormInput(prev => ({ ...prev, [id]: value }));
  };

  // Handle input focus
  const handleFocus = (field) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  // Handle input blur
  const handleBlur = (field) => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };

  useEffect(() => {
    // Store all ScrollTrigger instances for cleanup
    const triggers = [];
    
    // Master timeline for coordinated animations
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // Title animation with bounce
    masterTl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "back.out(1.7)"
      }
    );

    // Content animation
    masterTl.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.9,
        ease: "power3.out"
      },
      "-=0.5"
    );
    
    // Form animation with staggered fields
    if (formRef.current) {
      masterTl.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.9,
          ease: "power2.out"
        },
        "-=0.5"
      );
      
      // Form fields staggered animation
      masterTl.fromTo(
        formRef.current.querySelectorAll("input, textarea, .rating-stars"),
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.6, 
          ease: "power2.out"
        },
        "-=0.7"
      );
    }
    
    if (masterTl.scrollTrigger) {
      triggers.push(masterTl.scrollTrigger);
    }
    
    // Auto rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % references.length);
    }, 8000);
    
    // Cleanup function to kill all ScrollTrigger instances and intervals
    return () => {
      clearInterval(interval);
      triggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission with a delay
    setTimeout(() => {
      setFormStatus('success');
      
      // Reset form after delay
      setTimeout(() => {
        setFormInput({
          name: '',
          role: '',
          email: '',
          feedback: ''
        });
        setRating(0);
        setFormStatus(null);
      }, 3000);
    }, 1500);
  };

  const goToNextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % references.length);
  };

  const goToPrevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + references.length) % references.length);
  };

  // Input field animation variants
  const inputVariants = {
    focused: {
      boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.4)",
      borderColor: "rgba(99, 102, 241, 1)",
      y: -3,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    idle: {
      boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)",
      borderColor: "rgba(99, 102, 241, 0.2)",
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen pt-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatedBlob 
          color="bg-gradient-to-br from-primary-900/10 to-indigo-600/5" 
          delay={0} 
          position="-top-40 -right-20" 
          size="w-[500px] h-[500px]"
        />
        <AnimatedBlob 
          color="bg-gradient-to-br from-accent-500/5 to-blue-500/10" 
          delay={5} 
          position="top-[30%] -left-40" 
          size="w-[600px] h-[600px]"
        />
        <AnimatedBlob 
          color="bg-gradient-to-br from-blue-500/10 to-purple-600/5" 
          delay={2} 
          position="bottom-0 right-20" 
          size="w-[400px] h-[400px]"
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingParticles count={20} />
        </div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      <div className="section-container relative z-10">
        <motion.div 
          ref={titleRef} 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="section-title">
            <span className="bg-gradient-to-r from-primary-400 via-indigo-500 to-accent-400 bg-clip-text text-transparent">References</span>
            <motion.div 
              className="h-1 w-20 bg-gradient-to-r from-primary-600 to-accent-500 mx-auto mt-2"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "5rem", opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />
          </h1>
          
          <motion.p 
            className="section-subtitle text-center text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Feedback and recommendations from colleagues and mentors who have witnessed my work firsthand.
          </motion.p>
        </motion.div>

        <div ref={contentRef} className="max-w-4xl mx-auto mt-12">
          {/* Testimonial Carousel Section */}
          <div className="relative mb-16">
            <QuoteIcon className="absolute -top-6 -left-4 md:-left-8 text-primary-600/15 w-16 h-16" />
            <QuoteIcon className="absolute -bottom-6 -right-4 md:-right-8 text-primary-600/15 w-16 h-16 rotate-180" />
            
            {/* Testimonial Navigation Buttons */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-none">
              <button 
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-800/80 to-primary-700/80 text-white flex items-center justify-center backdrop-blur-sm border border-primary-600/30 shadow-lg transform hover:scale-105 transition-all duration-200 pointer-events-auto"
                onClick={goToPrevTestimonial}
                aria-label="Previous testimonial"
              >
                <FiArrowLeft />
              </button>
              <button 
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-800/80 to-primary-700/80 text-white flex items-center justify-center backdrop-blur-sm border border-primary-600/30 shadow-lg transform hover:scale-105 transition-all duration-200 pointer-events-auto"
                onClick={goToNextTestimonial}
                aria-label="Next testimonial"
              >
                <FiArrowRight />
              </button>
            </div>
            
            {/* Testimonial Cards */}
            <div className="relative h-auto min-h-[200px] md:min-h-[220px]">
              <AnimatePresence mode="wait">
                {references.map((reference, index) => (
                  index === activeIndex && (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                      }}
                      className="absolute inset-0"
                    >
                      <div className="relative p-0.5 rounded-2xl backdrop-blur-sm overflow-hidden h-full">
                        {/* Animated gradient border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 via-accent-500/20 to-indigo-500/30 rounded-2xl"></div>
                        
                        {/* Card content */}
                        <div className="relative h-full bg-primary-950/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col">
                          <div className="flex-grow">
                            <p className="italic text-gray-200 text-lg leading-relaxed">
                              {reference.description}
                            </p>
                          </div>
                          
                          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between">
                            <div className="mb-4 md:mb-0">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold mr-4">
                                  {reference.name.charAt(0)}
                                </div>
                                <div>
                                  <h3 className="font-bold text-white text-lg">{reference.name}</h3>
                                  <div className="flex items-center text-primary-400 text-sm">
                                    <FiBriefcase size={12} className="mr-1" />
                                    <span>{reference.role}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span 
                                    key={i} 
                                    className={`text-xl ${i < reference.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center text-gray-400 text-xs mt-1">
                                <FiMail size={12} className="mr-1" />
                                <span>{reference.email}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {references.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="group relative"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span className={`block w-8 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 scale-100' 
                      : 'bg-primary-800/70 hover:bg-primary-700/70 scale-75 group-hover:scale-90'
                  }`}></span>
                </button>
              ))}
            </div>
            
            {/* Verified References Badge */}
            <motion.div 
              className="flex justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-primary-900/30 backdrop-blur-sm border border-primary-800/30 rounded-full py-2 px-4 flex items-center gap-2">
                <FiCheckCircle className="text-green-400" />
                <span className="text-sm text-gray-300">
                  <span className="font-semibold text-primary-400">2</span> verified references
                </span>
              </div>
            </motion.div>
          </div>
          
          {/* Add Reference Form */}
          <div ref={formRef} className="mt-20 relative">
            {/* Form card with gradient border */}
            <div className="relative p-0.5 rounded-2xl backdrop-blur-sm overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/30 via-indigo-500/20 to-primary-500/30 rounded-2xl"></div>
              
              {/* Card content */}
              <div className="relative bg-primary-950/80 backdrop-blur-sm rounded-2xl p-8">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent-600/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-600/5 rounded-full blur-3xl"></div>
                
                {formStatus === 'success' ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 20 
                    }}
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                      <FiCheck className="text-green-400 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
                    <p className="text-gray-300 max-w-md mb-6">
                      Your reference has been submitted successfully. I appreciate your feedback!
                    </p>
                    <button 
                      onClick={() => setFormStatus(null)}
                      className="px-6 py-2 rounded-lg bg-primary-700 hover:bg-primary-600 text-white transition-colors duration-300"
                    >
                      Add Another Reference
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                          Add Your Reference
                        </span>
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Share your experience working with me. Your feedback helps me improve and grow.
                      </p>
                    </div>
                    
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Full Name
                          </label>
                          <motion.div
                            variants={inputVariants}
                            animate={focused.name ? "focused" : "idle"}
                          >
                            <input 
                              type="text" 
                              id="name" 
                              required
                              value={formInput.name}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('name')}
                              onBlur={() => handleBlur('name')}
                              className="w-full bg-primary-900/80 border border-primary-700/50 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300"
                              placeholder="Your name"
                            />
                          </motion.div>
                        </div>
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                            Position / Role
                          </label>
                          <motion.div
                            variants={inputVariants}
                            animate={focused.role ? "focused" : "idle"}
                          >
                            <input 
                              type="text" 
                              id="role" 
                              required
                              value={formInput.role}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('role')}
                              onBlur={() => handleBlur('role')}
                              className="w-full bg-primary-900/80 border border-primary-700/50 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300"
                              placeholder="Your position or role"
                            />
                          </motion.div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email Address
                        </label>
                        <motion.div
                          variants={inputVariants}
                          animate={focused.email ? "focused" : "idle"}
                        >
                          <input 
                            type="email" 
                            id="email" 
                            required
                            value={formInput.email}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            className="w-full bg-primary-900/80 border border-primary-700/50 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300"
                            placeholder="your.email@example.com"
                          />
                        </motion.div>
                      </div>
                      
                      <div>
                        <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Feedback
                        </label>
                        <motion.div
                          variants={inputVariants}
                          animate={focused.feedback ? "focused" : "idle"}
                        >
                          <textarea 
                            id="feedback" 
                            rows="4"
                            required
                            value={formInput.feedback}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('feedback')}
                            onBlur={() => handleBlur('feedback')}
                            className="w-full bg-primary-900/80 border border-primary-700/50 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300"
                            placeholder="Share your experience working with me..."
                          ></textarea>
                        </motion.div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Rating
                        </label>
                        <div className="rating-stars flex space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button 
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className={`text-3xl focus:outline-none transition-colors duration-300 ${
                                (hoverRating ? hoverRating >= star : rating >= star) 
                                  ? "text-yellow-400" 
                                  : "text-gray-600 hover:text-yellow-300"
                              }`}
                              aria-label={`Rate ${star} stars`}
                            >
                              ★
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <motion.button 
                          type="submit"
                          className="relative px-8 py-3 rounded-lg text-white font-medium overflow-hidden group disabled:opacity-70"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={rating === 0 || formStatus === 'submitting'}
                        >
                          {/* Button background */}
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-500 to-accent-500"></span>
                          
                          {/* Button hover effect */}
                          <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white"></span>
                          
                          <span className="relative flex items-center justify-center gap-2">
                            {formStatus === 'submitting' ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                              </>
                            ) : (
                              <>
                                Submit Reference
                                <FiSend size={18} />
                              </>
                            )}
                          </span>
                        </motion.button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferencesPage;