import React, { useEffect, useRef, useState } from 'react';
import {
  FiUser,
  FiCode,
  FiLayout,
  FiAward,
  FiArrowRight,
  FiTarget,
  FiHeart,
} from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { personalInfo } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

const aboutValues = [
  {
    icon: <FiTarget size={28} className="text-indigo-400" />,
    title: 'Vision',
    desc: 'To create innovative digital solutions that bridge the gap between technology and human needs, making the digital world more accessible and beautiful.',
    color: 'from-indigo-500 to-cyan-500',
  },
  {
    icon: <FiHeart size={28} className="text-red-400" />,
    title: 'Passion',
    desc: "Driven by curiosity and creativity, I'm passionate about exploring new technologies and pushing the boundaries of what's possible in web development and design.",
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: <FiAward size={28} className="text-yellow-400" />,
    title: 'Excellence',
    desc: 'Committed to delivering high-quality work that exceeds expectations, with attention to detail and a focus on user experience in every project.',
    color: 'from-yellow-400 to-yellow-600',
  },
];

const funFacts = [
  { value: '3+', label: 'Years of Experience', color: 'text-indigo-400' },
  { value: '15+', label: 'Projects Completed', color: 'text-purple-400' },
  { value: '10+', label: 'Technologies Mastered', color: 'text-pink-400' },
  { value: '100%', label: 'Dedication', color: 'text-green-400' },
];

const highlights = [
  {
    icon: <FiCode size={20} />,
    title: 'Development',
    desc: 'Full stack web and mobile development',
  },
  {
    icon: <FiLayout size={20} />,
    title: 'UI/UX Design',
    desc: 'Creating appealing user interfaces',
  },
  {
    icon: <FiUser size={20} />,
    title: 'Leadership',
    desc: 'Proven project team leadership',
  },
  {
    icon: <FiAward size={20} />,
    title: 'Innovation',
    desc: 'Creative problem-solving skills',
  },
];

// Framer Motion Variants for entry
const parentStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const cardEntry = {
  hidden: { opacity: 0, y: 42, scale: 0.97, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  }),
};

const fadeSlideLeft = {
  hidden: { opacity: 0, x: -40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
  },
};

const buttonEntry = {
  hidden: { opacity: 0, scale: 0.85, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.3 },
  },
};

// Arrow animation component
const ArrowMotion = ({ isHovered }) => (
  <motion.div
    initial={{ x: 0 }}
    animate={isHovered ? { x: 5 } : { x: 0 }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 8,
    }}
    style={{ display: "flex", alignItems: "center" }}
  >
    <FiArrowRight size={18} />
    {isHovered && (
      <motion.div
        className="absolute right-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [0.5, 1.3, 0.5], 
          opacity: [0, 0.3, 0], 
          transition: { repeat: Infinity, duration: 1.5 } 
        }}
      >
        <FiArrowRight size={18} className="text-white/30" />
      </motion.div>
    )}
  </motion.div>
);

const AboutPage = ({ scrollToSection }) => {
  const imageSectionRef = useRef(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // Safe scroll function that checks if scrollToSection exists
  const safeScrollToSection = (sectionId) => {
    if (typeof scrollToSection === 'function') {
      scrollToSection(sectionId);
    } else {
      // Fallback scrolling method
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    // Profile image GSAP
    gsap.fromTo(
      imageSectionRef.current,
      { opacity: 0, y: 50, scale: 0.92, filter: 'blur(12px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageSectionRef.current,
          start: 'top 90%',
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Safe Contact button click handler with animation
  const handleContactClick = () => {
    // Create ripple effect
    const button = document.getElementById("contact-button");
    if (button) {
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.position = "absolute";
      circle.style.borderRadius = "50%";
      circle.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
      circle.style.transform = "scale(0)";
      circle.style.left = "0";
      circle.style.top = "0";
      circle.style.pointerEvents = "none";
      
      button.appendChild(circle);
      
      // Animate the ripple
      gsap.to(circle, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          if (circle.parentNode === button) {
            button.removeChild(circle);
          }
          // Safely scroll to contact section after animation completes
          safeScrollToSection('contact');
        }
      });
    } else {
      // Fallback if button element isn't found
      safeScrollToSection('contact');
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <style jsx>{`
        @keyframes buttonGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animated-contact-btn {
          position: relative;
          background: linear-gradient(90deg, #4f46e5, #8366d1, #4f46e5);
          background-size: 200% 200%;
          animation: buttonGradientShift 5s ease infinite;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .animated-contact-btn:hover {
          animation: buttonGradientShift 3s ease infinite;
        }
      `}</style>

      <div className="section-container">
        {/* Header */}
        <motion.h1
          className="section-title text-center"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          About{' '}
          <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            Me
          </span>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-600 to-accent-500 mx-auto mt-2"></div>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Image */}
          <div className="flex justify-center items-center animate-on-scroll">
            <div ref={imageSectionRef} className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-accent-500 transform rotate-6 rounded-2xl blur-sm"></div>
              <img
                src={personalInfo.profile}
                alt="Dinidu Liyanage"
                className="relative z-10 w-full h-full object-cover rounded-2xl border-4 border-primary-900"
              />
              <div className="absolute -bottom-5 -right-5 bg-primary-900 rounded-lg p-4 shadow-xl border border-primary-700 z-20">
                <div className="flex items-center gap-2">
                  {/* Enhanced "Available for work" indicator with pulsing animation */}
                  <div className="flex items-center justify-center h-3 w-3 bg-green-500 rounded-full relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  </div>
                  <span className="text-green-500 font-semibold">
                    Available for work
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <motion.div
            variants={parentStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-6 text-white"
              variants={fadeSlideUp}
              custom={0}
            >
              IT Undergraduate & Full Stack Developer
            </motion.h2>
            <motion.p
              className="text-gray-300 mb-6"
              variants={fadeSlideUp}
              custom={1}
            >
              Third-year undergraduate student in the Faculty of Information Technology with a proven track record of leading team projects and developing technical solutions. Proficient in Web design, full stack development, UI/UX design, graphic designing, and video production, with strong technical skills in modern programming frameworks and tools. Recognized for creative problem-solving and leadership in collaborative settings.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              variants={parentStagger}
            >
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="highlight-box card flex items-start gap-3 p-4"
                  variants={cardEntry}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow: "0 12px 38px 0 rgba(80,180,255,0.15)",
                    borderColor: "#60a5fa",
                    transition: { duration: 0.34, ease: [0.19, 1, 0.22, 1] }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-2 rounded-lg text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <motion.h3 className="font-semibold text-white" variants={fadeSlideUp} custom={idx}>
                      {item.title}
                    </motion.h3>
                    <motion.p className="text-sm text-gray-400" variants={fadeSlideUp} custom={idx + 1}>
                      {item.desc}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.blockquote
              className="border-l-4 border-primary-600 pl-4 italic text-gray-300 mb-8"
              variants={fadeSlideLeft}
            >
              "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful." - Albert Schweitzer
            </motion.blockquote>
            
            {/* Enhanced Contact Button */}
            <motion.button
              id="contact-button"
              onClick={handleContactClick}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="animated-contact-btn relative flex items-center gap-3 px-6 py-3 text-white font-semibold rounded-lg shadow-lg overflow-hidden"
              variants={buttonEntry}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.05, 
                boxShadow: "0 15px 30px -10px rgba(79, 70, 229, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span 
                className="relative z-10"
                animate={{ 
                  x: isButtonHovered ? 2 : 0 
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }}
              >
                Get In Touch
              </motion.span>
              
              <motion.div className="relative z-10 flex items-center">
                <ArrowMotion isHovered={isButtonHovered} />
              </motion.div>
              
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500 z-0"></div>
              
              {/* Glow Effect on Hover */}
              {isButtonHovered && (
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-accent-400 blur-md z-[-1]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              )}
              
              {/* Shimmer Effect on Hover */}
              {isButtonHovered && (
                <motion.div 
                  className="absolute inset-0 z-0"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '100%', opacity: 0.3 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  }}
                />
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Values & Principles */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-10"
          variants={parentStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {aboutValues.map((v, i) => (
            <motion.div
              key={v.title}
              className="about-value card glass border border-white/10 hover:scale-105 transition-transform duration-300 p-6"
              variants={cardEntry}
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0 12px 38px 0 rgba(80,180,255,0.15)",
                borderColor: "#60a5fa",
                transition: { duration: 0.34, ease: [0.19, 1, 0.22, 1] }
              }}
              style={{ cursor: 'pointer' }}
            >
              <motion.div
                className="flex items-center gap-3 mb-3 text-white"
                variants={fadeSlideUp}
              >
                {v.icon}
                <span className="font-semibold text-lg">{v.title}</span>
              </motion.div>
              <motion.p
                className="text-gray-300"
                variants={fadeSlideUp}
              >
                {v.desc}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          className="mt-16 text-center"
          variants={parentStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-8"
            variants={fadeSlideUp}
          >
            Fun Facts About Me
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {funFacts.map((fact, i) => (
              <motion.div
                key={fact.label}
                className="fun-fact glass rounded-xl p-6 border border-white/10"
                variants={cardEntry}
                whileHover={{
                  scale: 1.08,
                  y: -6,
                  boxShadow: "0 10px 28px 0 rgba(99,102,241,0.19)",
                  transition: { duration: 0.28, ease: [0.19, 1, 0.22, 1] }
                }}
                style={{ cursor: 'pointer' }}
              >
                <motion.div
                  className={`text-3xl font-bold mb-2 ${fact.color}`}
                  variants={fadeSlideUp}
                >
                  {fact.value}
                </motion.div>
                <motion.div
                  className="text-gray-300"
                  variants={fadeSlideUp}
                >
                  {fact.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;