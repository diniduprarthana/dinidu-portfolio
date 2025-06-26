import React, { useEffect, useRef, useState } from 'react';
import { FiMail, FiLinkedin, FiGithub, FiSend, FiMapPin, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { FaBehance } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

// Animated background blob component
const AnimatedBlob = ({ color, delay, size = 'w-96 h-96', position = '', blur = 'blur-3xl' }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ 
      scale: [0.8, 1.2, 0.9, 1.1, 0.9],
      opacity: [0, 0.3, 0.2, 0.3, 0.2],
      rotate: [0, 90, 180, 270, 360]
    }}
    transition={{
      duration: 20,
      delay: delay,
      repeat: Infinity,
      repeatType: "reverse",
    }}
    className={`absolute ${size} rounded-full ${blur} ${color} ${position} pointer-events-none`}
    style={{ filter: 'blur(60px)' }}
  />
);

// Floating particle animation
const FloatingParticle = ({ color, size = 'w-1.5 h-1.5', delay = 0 }) => {
  const randomX = Math.random() * 200 - 100;
  
  return (
    <motion.div
      className={`absolute ${size} rounded-full ${color}`}
      initial={{ opacity: 0, y: Math.random() * 100 + 50, x: Math.random() * 200 - 100 }}
      animate={{ 
        y: [0, -100],
        x: [0, randomX],
        opacity: [0, 0.7, 0],
      }}
      transition={{
        duration: 5 + Math.random() * 5,
        delay: delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }}
    />
  );
};

const ContactPage = () => {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const containerRef = useRef(null);
  const [formStatus, setFormStatus] = useState(null);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  useEffect(() => {
    // Master timeline for coordinated animations
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
    
    // Clear any existing ScrollTrigger instances associated with this component
    const triggers = [];

    // Title animation with bounce
    masterTl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: "back.out(1.7)"
      }
    );

    // Form animation
    masterTl.fromTo(
      formRef.current,
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8,
        ease: "power3.out"
      },
      "-=0.4" // Start slightly before previous animation completes
    );

    // Input fields staggered reveal
    masterTl.fromTo(
      formRef.current.querySelectorAll("input, textarea"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Contact info box animation
    masterTl.fromTo(
      infoRef.current,
      { opacity: 0, x: 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8,
        ease: "power3.out"
      },
      "-=1.2" // Run almost in parallel with form animation
    );

    // Contact info items stagger
    masterTl.fromTo(
      infoRef.current.querySelectorAll(".contact-item"),
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.6"
    );

    // Social icons stagger
    masterTl.fromTo(
      infoRef.current.querySelectorAll(".social-icon"),
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );

    if (masterTl.scrollTrigger) {
      triggers.push(masterTl.scrollTrigger);
    }

    // Cleanup function to kill all ScrollTrigger instances
    return () => {
      triggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFocus = (field) => {
    setFocused(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleBlur = (field) => {
    setFocused(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    setFormStatus('success');
    
    // Reset form status after 3 seconds
    setTimeout(() => setFormStatus(null), 3000);

    // Reset form after successful submission
    setInputs({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  // Form field animation variants
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
    <div ref={containerRef} className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatedBlob 
          color="bg-gradient-to-br from-indigo-900/20 to-primary-600/10" 
          delay={0} 
          position="-top-20 -left-20" 
        />
        <AnimatedBlob 
          color="bg-gradient-to-br from-accent-500/10 to-purple-600/10" 
          delay={3} 
          position="-bottom-40 -right-20" 
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <FloatingParticle 
              key={i} 
              color={i % 3 === 0 ? "bg-primary-400/30" : i % 3 === 1 ? "bg-accent-400/30" : "bg-purple-400/30"} 
              delay={i * 0.5} 
            />
          ))}
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
            Get In <span className="bg-gradient-to-r from-primary-400 via-indigo-500 to-accent-400 bg-clip-text text-transparent">Touch</span>
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
            Have a question or want to work together? Feel free to contact me using the form below.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Contact Form */}
          <motion.div 
            ref={formRef} 
            className="relative rounded-2xl p-0.5 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 via-accent-500/40 to-primary-400/30 rounded-2xl"></div>
            
            {/* Card content */}
            <div className="relative bg-primary-950/90 backdrop-blur-md rounded-2xl p-8 h-full">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-600/10 rounded-full blur-3xl"></div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <span className="bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">Send Me a Message</span>
                </h2>
                <p className="text-gray-400 text-sm">I'd love to hear from you! Fill out the form below and I'll respond as soon as possible.</p>
              </motion.div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={focused.name ? "focused" : "idle"}
                    >
                      <input 
                        type="text" 
                        id="name" 
                        required
                        value={inputs.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={() => handleBlur('name')}
                        className="w-full bg-primary-900/80 border border-primary-700/50 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300"
                        placeholder="Your name"
                      />
                    </motion.div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={focused.email ? "focused" : "idle"}
                    >
                      <input 
                        type="email" 
                        id="email" 
                        required
                        value={inputs.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        className="w-full bg-primary-900/80 border border-primary-700/50 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </motion.div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={focused.subject ? "focused" : "idle"}
                  >
                    <input 
                      type="text" 
                      id="subject" 
                      value={inputs.subject}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={() => handleBlur('subject')}
                      className="w-full bg-primary-900/80 border border-primary-700/50 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300"
                      placeholder="How can I help you?"
                    />
                  </motion.div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message *
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={focused.message ? "focused" : "idle"}
                  >
                    <textarea 
                      id="message" 
                      rows="7"
                      required
                      value={inputs.message}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => handleBlur('message')}
                      className="w-full bg-primary-900/80 border border-primary-700/50 rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300"
                      placeholder="Your message..."
                    ></textarea>
                  </motion.div>
                </div>
                
                <div className="pt-2">
                  <motion.button 
                    type="submit"
                    className="relative px-8 py-3 rounded-lg text-white font-medium overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button background */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-500 to-accent-500"></span>
                    
                    {/* Button hover effect */}
                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white"></span>
                    <span className="relative flex items-center justify-center gap-2">
                      Send Message
                      <FiSend size={18} />
                    </span>
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-green-900/30 backdrop-blur-sm border border-green-500/30 text-green-400 rounded-lg px-4 py-3 mt-4 flex items-center gap-2"
                    >
                      <FiCheckCircle className="flex-shrink-0" />
                      <span>Your message has been sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            ref={infoRef} 
            className="flex flex-col h-full space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Contact Details Card */}
            <div className="relative p-0.5 rounded-2xl backdrop-blur-sm overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/30 via-blue-500/20 to-accent-500/30 rounded-2xl"></div>
              
              {/* Card content */}
              <div className="relative bg-primary-950/90 backdrop-blur-md rounded-2xl p-8">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl"></div>
                
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                  <span className="bg-gradient-to-r from-accent-500 to-indigo-400 bg-clip-text text-transparent">Contact Information</span>
                </h2>
                
                <div className="space-y-6">
                  <motion.div 
                    className="contact-item flex items-start rounded-xl p-4 transition-all duration-300 hover:bg-primary-800/30 hover:border-accent-500/30"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-gradient-to-br from-accent-400 to-primary-500 p-3 rounded-lg mr-4 shadow-lg shadow-accent-500/20">
                      <FiMail className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Email</h3>
                      <a 
                        href={`mailto:${personalInfo.email}`} 
                        className="text-gray-300 hover:text-accent-400 transition-colors duration-300 flex items-center"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="contact-item flex items-start rounded-xl p-4 transition-all duration-300 hover:bg-primary-800/30 hover:border-accent-500/30"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-gradient-to-br from-blue-400 to-indigo-600 p-3 rounded-lg mr-4 shadow-lg shadow-blue-500/20">
                      <FiLinkedin className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">LinkedIn</h3>
                      <a 
                        href={personalInfo.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="contact-item flex items-start rounded-xl p-4 transition-all duration-300 hover:bg-primary-800/30 hover:border-accent-500/30"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg mr-4 shadow-lg shadow-blue-500/20">
                      <FaBehance className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Behance</h3>
                      <a 
                        href={personalInfo.behance} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                      >
                        Portfolio (Behance)
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="contact-item flex items-start rounded-xl p-4 transition-all duration-300 hover:bg-primary-800/30 hover:border-accent-500/30"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-gradient-to-br from-green-400 to-cyan-600 p-3 rounded-lg mr-4 shadow-lg shadow-green-500/20">
                      <FiMapPin className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Location</h3>
                      <p className="text-gray-300">Sri Lanka</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Social Media Card */}
            <div className="relative p-0.5 rounded-2xl backdrop-blur-sm overflow-hidden flex-grow">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-cyan-500/30 rounded-2xl"></div>
              
              {/* Card content */}
              <div className="relative bg-primary-950/90 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col">
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
                
                <h2 className="text-xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Connect With Me</span>
                </h2>
                
                <div className="grid grid-cols-4 gap-4">
                  <motion.a 
                    href={personalInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon relative bg-primary-900/70 hover:bg-indigo-900/50 transition-all duration-300 p-4 rounded-xl flex flex-col items-center group overflow-hidden"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-[#0077b5]"></div>
                    <FiLinkedin size={24} className="text-[#0077b5] mb-2 relative z-10" />
                    <span className="text-xs text-gray-400 relative z-10">LinkedIn</span>
                  </motion.a>
                  
                  <motion.a 
                    href={personalInfo.behance} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon relative bg-primary-900/70 hover:bg-indigo-900/50 transition-all duration-300 p-4 rounded-xl flex flex-col items-center group overflow-hidden"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-[#1769ff]"></div>
                    <FaBehance size={24} className="text-[#1769ff] mb-2 relative z-10" />
                    <span className="text-xs text-gray-400 relative z-10">Behance</span>
                  </motion.a>
                  
                  <motion.a 
                    href="https://github.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon relative bg-primary-900/70 hover:bg-indigo-900/50 transition-all duration-300 p-4 rounded-xl flex flex-col items-center group overflow-hidden"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-white"></div>
                    <FiGithub size={24} className="text-white mb-2 relative z-10" />
                    <span className="text-xs text-gray-400 relative z-10">GitHub</span>
                  </motion.a>
                  
                  <motion.a 
                    href={`mailto:${personalInfo.email}`}
                    className="social-icon relative bg-primary-900/70 hover:bg-indigo-900/50 transition-all duration-300 p-4 rounded-xl flex flex-col items-center group overflow-hidden"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                    <FiMail size={24} className="text-accent-500 mb-2 relative z-10" />
                    <span className="text-xs text-gray-400 relative z-10">Email</span>
                  </motion.a>
                </div>
                
                <div className="mt-auto pt-6 border-t border-primary-800/30 text-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-900/70 border border-primary-800/70">
                    <div className="flex items-center justify-center w-2 h-2 bg-green-400 rounded-full mr-2 relative">
                      {/* Pulsing effect */}
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Response time: <span className="text-primary-400 font-medium">Within 24 hours</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;