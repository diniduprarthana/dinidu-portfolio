import React, { useEffect, useRef } from 'react';
import { 
  FiCode, FiLayout, FiSmartphone, FiVideo, FiPenTool, FiCamera, 
  FiChevronRight, FiArrowRight
} from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { services } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

// Service icon mapping
const getServiceIcon = (iconName) => {
  switch(iconName) {
    case 'code': return <FiCode size={28} />;
    case 'design': return <FiLayout size={28} />;
    case 'mobile': return <FiSmartphone size={28} />;
    case 'video': return <FiVideo size={28} />;
    case 'palette': return <FiPenTool size={28} />;
    case 'camera': return <FiCamera size={28} />;
    default: return <FiCode size={28} />;
  }
};

// Service icon gradient colors
const getIconColorClass = (index) => {
  const colors = [
    "from-indigo-500 to-blue-500",
    "from-blue-400 to-indigo-500",
    "from-fuchsia-600 to-indigo-600",
    "from-cyan-500 to-blue-600",
    "from-purple-500 to-indigo-400",
    "from-blue-600 to-indigo-600"
  ];
  return colors[index % colors.length];
};

// Professional process steps data
const processSteps = [
  {
    number: 1,
    title: "Discovery",
    description: "Understanding your needs and project requirements",
    color: "indigo",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    number: 2,
    title: "Planning",
    description: "Creating detailed project roadmap and timeline",
    color: "purple",
    gradient: "from-purple-500 to-fuchsia-500"
  },
  {
    number: 3,
    title: "Development",
    description: "Building your solution with best practices",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    number: 4,
    title: "Delivery",
    description: "Testing, optimization, and final delivery",
    color: "emerald",
    gradient: "from-emerald-500 to-green-400"
  }
];

const processVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.7, type: "spring", stiffness: 90 }
  })
};

// Button animation variants
const primaryButtonVariants = {
  initial: { 
    boxShadow: "0px 4px 16px rgba(99, 102, 241, 0.1)"
  },
  hover: { 
    y: -5,
    scale: 1.05, 
    boxShadow: "0px 12px 25px rgba(99, 102, 241, 0.35)",
    backgroundPosition: ["0% 0%", "100% 100%"],
    transition: { 
      y: { type: "spring", stiffness: 400, damping: 10 },
      scale: { type: "spring", stiffness: 400, damping: 10 },
      backgroundPosition: { duration: 0.8, ease: "easeInOut" } 
    }
  },
  tap: { 
    scale: 0.97,
    boxShadow: "0px 2px 10px rgba(99, 102, 241, 0.2)",
    transition: { duration: 0.2 }
  },
  animate: {
    y: [0, 0],
    boxShadow: [
      "0px 0px 0px rgba(99, 102, 241, 0)",
      "0px 8px 20px rgba(99, 102, 241, 0.3)",
      "0px 4px 16px rgba(99, 102, 241, 0.1)"
    ],
    transition: { 
      duration: 1.2,
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1
    }
  }
};

const secondaryButtonVariants = {
  initial: { 
    boxShadow: "0px 0px 0px rgba(99, 102, 241, 0)"
  },
  hover: { 
    y: -5,
    borderColor: "rgb(165, 180, 252)",
    boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.15), inset 0px 0px 20px rgba(129, 140, 248, 0.2)",
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
  tap: { 
    scale: 0.97,
    transition: { duration: 0.2 }
  },
  animate: {
    borderColor: [
      "rgb(129, 140, 248, 0.4)",
      "rgb(129, 140, 248, 0.8)",
      "rgb(129, 140, 248, 0.4)"
    ],
    transition: { 
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror"
    }
  }
};

// Arrow icon animation
const arrowVariants = {
  initial: { x: 0 },
  hover: { 
    x: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.3,
      duration: 0.3
    }
  }
};

// Reveal animation for buttons
const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const buttonItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const ServicesPage = ({ scrollToSection }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Store all ScrollTrigger instances for cleanup
    const triggers = [];
    
    const headerTrigger = ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 90%",
      animation: gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
    });
    triggers.push(headerTrigger);
    
    const cards = cardsRef.current.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
      const cardTrigger = ScrollTrigger.create({
        trigger: card,
        start: "top 90%",
        animation: gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.1 * index }
        )
      });
      triggers.push(cardTrigger);
    });
    
    const processTrigger = ScrollTrigger.create({
      trigger: processRef.current,
      start: "top 90%",
      animation: gsap.fromTo(
        processRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
    });
    triggers.push(processTrigger);
    
    const ctaTrigger = ScrollTrigger.create({
      trigger: ctaRef.current,
      start: "top 90%",
      animation: gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
    });
    triggers.push(ctaTrigger);

    // Cleanup function to kill all ScrollTrigger instances
    return () => {
      triggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen py-20">
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="w-full text-center mb-14">
          <h1 className="section-title">
            My <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">Services</span>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-blue-400 mx-auto mt-2"></div>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
            Comprehensive digital solutions, tailored to your needs. Delivering quality, value, and innovation to help your projects shine.
          </p>
        </div>
        
        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-18"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Professional Work Process Section */}
        <section ref={processRef} className="my-16 flex justify-center">
          <div className="w-full max-w-5xl bg-gradient-to-br from-indigo-950/90 to-indigo-900/70 border border-indigo-800/40 rounded-2xl px-8 py-10 shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-7 text-center tracking-tight">
              My Work Process
            </h2>
            <p className="text-blue-100 text-center mb-8 max-w-2xl mx-auto text-base">
              A structured, proven approach for every project.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={processVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: .6 }}
                  custom={i}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-14 h-14 mb-4 rounded-full flex items-center justify-center bg-gradient-to-tr ${step.gradient} shadow-lg`}>
                    <span className="text-2xl font-bold text-white drop-shadow">{step.number}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-1 tracking-tight">{step.title}</h3>
                  <p className="text-blue-100 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Enhanced Animations */}
        <div ref={ctaRef} className="flex justify-center">
          <div className="w-full max-w-3xl bg-gradient-to-br from-indigo-800/40 to-blue-900/30 border border-indigo-800/40 rounded-2xl p-8 text-center backdrop-blur-md shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Start Your Project?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-base">
              Let's discuss how I can help bring your ideas to life with innovative solutions and exceptional design.
            </p>
            
            {/* Enhanced Button Container with Staggered Animation */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={buttonContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Enhanced "Get In Touch" Button */}
              <motion.button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg flex items-center relative overflow-hidden group"
                variants={buttonItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                style={{ backgroundSize: "200% 200%" }}
              >
                {/* Button Glow Effect */}
                <motion.span 
                  className="absolute inset-0 w-full h-full bg-white opacity-0 rounded-lg"
                  animate={{
                    opacity: [0, 0.2, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
                
                <span className="relative z-10">Get In Touch</span>
                <motion.span 
                  className="relative z-10 ml-2"
                  variants={arrowVariants}
                >
                  <FiArrowRight />
                </motion.span>
              </motion.button>
              
              {/* Enhanced "View My Work" Button */}
              <motion.button 
                onClick={() => scrollToSection('projects')}
                className="border-2 border-indigo-400 text-indigo-200 px-8 py-3 rounded-lg font-semibold relative overflow-hidden"
                variants={{
                  ...buttonItemVariants,
                  ...secondaryButtonVariants
                }}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                {/* Subtle background animation */}
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0"
                  animate={{
                    opacity: [0, 0.3, 0],
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
                
                <span className="relative z-10">View My Work</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Service card component
const ServiceCard = ({ service, index }) => (
  <motion.div
    whileHover={{
      y: -10,
      scale: 1.035,
      boxShadow: "0 8px 32px 0 rgba(99,102,241,0.11)",
      transition: { duration: 0.22 }
    }}
    className="group service-card transition-transform flex"
  >
    <div className="bg-gradient-to-br from-indigo-900/60 to-indigo-950/70 border border-indigo-800/40 rounded-2xl p-7 h-full flex flex-col relative overflow-hidden shadow-xl backdrop-blur-lg group-hover:ring-2 group-hover:ring-indigo-400 group-hover:border-indigo-400 transition-all duration-300 w-full">
      {/* Gradient orb in background */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
      
      {/* Service Icon */}
      <div className={`bg-gradient-to-br ${getIconColorClass(index)} p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-5 text-white shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-all duration-300 mx-auto`}>
        {getServiceIcon(service.icon)}
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors duration-300 tracking-tight text-center">
        {service.title}
      </h3>
      
      <p className="text-blue-100 mb-6 flex-grow text-base text-center">
        {service.description}
      </p>
      
      {/* Technologies */}
      <div className="mt-auto">
        <h4 className="text-xs font-semibold text-indigo-300 mb-2 tracking-wider text-center">TECHNOLOGIES</h4>
        <div className="flex flex-wrap gap-2 justify-center">
          {service.technologies.map((tech, i) => (
            <span 
              key={i} 
              className="bg-indigo-900/50 text-indigo-200 text-xs px-3 py-1 rounded-full border border-indigo-700/50 font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Learn more button */}
      <div className="mt-6 pt-4 border-t border-indigo-800/30 flex justify-center">
        <button className="text-indigo-300 hover:text-indigo-200 transition-colors duration-300 flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
          Learn more <FiChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  </motion.div>
);

export default ServicesPage;