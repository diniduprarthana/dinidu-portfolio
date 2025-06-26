import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../utils/data';
import { FiCode, FiDatabase, FiTool, FiZap, FiPackage } from 'react-icons/fi';
import { 
  DiReact, DiJavascript1, DiPython, DiJava, DiCss3, DiHtml5, 
  DiNodejsSmall, DiMongodb, DiMysql, DiBootstrap, DiGithubBadge 
} from 'react-icons/di';
import { SiFlutter, SiDart, SiSpring, SiC, SiCplusplus, SiCsharp, SiPhp, SiFigma, SiPostman } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

// Map skill icons to React Icons
const getSkillIcon = (iconName, size = 24) => {
  switch(iconName) {
    case 'react': return <DiReact size={size} />;
    case 'js': return <DiJavascript1 size={size} />;
    case 'python': return <DiPython size={size} />;
    case 'java': return <DiJava size={size} />;
    case 'css': return <DiCss3 size={size} />;
    case 'html': return <DiHtml5 size={size} />;
    case 'node': return <DiNodejsSmall size={size} />;
    case 'mongodb': return <DiMongodb size={size} />;
    case 'mysql': return <DiMysql size={size} />;
    case 'bootstrap': return <DiBootstrap size={size} />;
    case 'github': return <DiGithubBadge size={size} />;
    case 'flutter': return <SiFlutter size={size} />;
    case 'dart': return <SiDart size={size} />;
    case 'spring': return <SiSpring size={size} />;
    case 'c': return <SiC size={size} />;
    case 'cpp': return <SiCplusplus size={size} />;
    case 'csharp': return <SiCsharp size={size} />;
    case 'php': return <SiPhp size={size} />;
    case 'figma': return <SiFigma size={size} />;
    case 'postman': return <SiPostman size={size} />;
    default: return <FiCode size={size} />;
  }
};

// Get category icon
const getCategoryIcon = (category) => {
  if (category.toLowerCase().includes('programming')) return <FiCode size={24} />;
  if (category.toLowerCase().includes('technologies')) return <FiDatabase size={24} />;
  if (category.toLowerCase().includes('frameworks')) return <FiPackage size={24} />;
  return <FiTool size={24} />;
};

// Floating particle animation
const FloatingParticle = ({ color }) => {
  const randomX = Math.random() * 100 - 50;
  const randomDelay = Math.random() * 2;
  
  return (
    <motion.div
      className={`absolute w-1.5 h-1.5 rounded-full ${color || 'bg-primary-500/30'}`}
      initial={{ opacity: 0 }}
      animate={{ 
        y: [-20, -60],
        x: [0, randomX],
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0.5]
      }}
      transition={{
        duration: 5,
        delay: randomDelay,
        ease: "easeInOut",
        times: [0, 0.7, 1],
        repeat: Infinity,
        repeatDelay: Math.random() * 3
      }}
    />
  );
};

// Enhanced particle with trail effect
const EnhancedParticle = ({ color, size = "w-2 h-2", delay = 0 }) => {
  const randomX = Math.random() * 200 - 100;
  const randomY = Math.random() * 100;
  
  return (
    <div className="absolute">
      <motion.div
        className={`${size} rounded-full ${color} filter blur-[0.5px]`}
        initial={{ 
          opacity: 0, 
          y: 100,
          x: Math.random() * 200 - 100
        }}
        animate={{ 
          y: [randomY, randomY - 300],
          x: [0, randomX],
          opacity: [0, 0.8, 0],
          scale: [0.2, 1.2, 0.5]
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          delay: delay + Math.random() * 5,
          ease: "easeInOut",
          times: [0, 0.6, 1],
          repeat: Infinity,
          repeatDelay: Math.random() * 5
        }}
      />
      
      {/* Particle trail */}
      <motion.div
        className={`${size} rounded-full ${color} opacity-40 filter blur-md`}
        initial={{ 
          opacity: 0, 
          scale: 0.3,
          y: 100,
          x: Math.random() * 200 - 100
        }}
        animate={{ 
          y: [randomY + 10, randomY - 290],
          x: [5, randomX + 5],
          opacity: [0, 0.3, 0],
          scale: [0.5, 2, 0.8]
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          delay: delay + 0.2 + Math.random() * 5,
          ease: "easeInOut",
          times: [0, 0.6, 1],
          repeat: Infinity,
          repeatDelay: Math.random() * 5
        }}
      />
    </div>
  );
};

// Skill glyph that floats in background
const SkillGlyph = ({ icon, delay }) => {
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * (window.innerHeight * 0.8);
  
  return (
    <motion.div
      className="absolute text-primary-500/5 z-0"
      initial={{ 
        opacity: 0, 
        x: randomX,
        y: randomY,
        scale: 1,
        rotate: Math.random() * 30 - 15
      }}
      animate={{ 
        opacity: [0, 0.3, 0],
        scale: [0.5, 1.2, 0.8],
        rotate: [Math.random() * 30 - 15, Math.random() * 30 - 15]
      }}
      transition={{
        duration: 15,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 10 + 5
      }}
      style={{ fontSize: `${Math.random() * 150 + 50}px` }}
    >
      {icon}
    </motion.div>
  );
};

const SkillsPage = () => {
  const [filter, setFilter] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const tabsRef = useRef(null);
  const skillsRefs = useRef({});
  const particlesRef = useRef(null);
  const pageEnterRef = useRef(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Create animated particles
  const particleColors = [
    'bg-primary-400/30',
    'bg-blue-400/30',
    'bg-indigo-400/30',
    'bg-purple-400/30',
    'bg-cyan-400/30'
  ];

  useEffect(() => {
    // Mark page as loaded after a short delay
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Store all ScrollTrigger instances for cleanup
    const triggers = [];
    
    const titleTrigger = ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top 90%",
      animation: gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power3.out"
        }
      )
    });
    triggers.push(titleTrigger);

    // Subtle parallax effect for the section
    gsap.to(sectionRef.current, {
      backgroundPositionY: "30%",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Tab animation with bounce effect
    const tabsTrigger = ScrollTrigger.create({
      trigger: tabsRef.current,
      start: "top 90%",
      animation: gsap.fromTo(
        tabsRef.current.children,
        { 
          opacity: 0, 
          y: 20, 
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.4)"
        }
      )
    });
    triggers.push(tabsTrigger);

    // Page entry animation (new)
    if (pageEnterRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          pageEnterRef.current, 
          { 
            opacity: 0,
          },
          { 
            opacity: 1, 
            duration: 0.8, 
            ease: "power2.out"
          }
        );
      }, sectionRef);
      
      return () => ctx.revert();
    }

    // Cleanup function to kill all ScrollTrigger instances
    return () => {
      triggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
    };
  }, []);

  // Animation for when filters change
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [filter]);

  // Card variants for staggered animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07
      }
    }
  };

  // New cascade effect for categories
  const containerCascadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Category header variants
  const categoryHeaderVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Enhanced header variants with perspective
  const enhancedHeaderVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      rotateX: 45,
      transformPerspective: 1000
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 1.2,
      }
    }
  };

  // Button hover animation
  const buttonHoverEffect = {
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  };

  // Page entry animation
  const pageEntryVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Skill grid variants
  const gridEntryVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <motion.div 
      ref={sectionRef} 
      className="min-h-screen pt-20 overflow-hidden relative"
      style={{
        backgroundImage: "radial-gradient(circle at 10% 50%, rgba(99, 102, 241, 0.04) 0%, transparent 35%)",
        backgroundSize: "120% 120%",
      }}
      initial="hidden"
      animate="visible"
      variants={pageEntryVariant}
    >
      {/* Overlay entry animation */}
      <motion.div 
        className="absolute inset-0 bg-primary-950"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ 
          duration: 1.2,
          ease: "easeInOut", 
        }}
      />
      
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Floating skill icons background */}
        {pageLoaded && [
          <SkillGlyph key="react" icon={<DiReact />} delay={2} />,
          <SkillGlyph key="js" icon={<DiJavascript1 />} delay={5} />,
          <SkillGlyph key="python" icon={<DiPython />} delay={8} />,
          <SkillGlyph key="java" icon={<DiJava />} delay={12} />,
          <SkillGlyph key="node" icon={<DiNodejsSmall />} delay={15} />
        ]}
      </div>
      
      {/* Enhanced background particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <FloatingParticle key={`basic-${i}`} color={particleColors[i % particleColors.length]} />
        ))}
        
        {/* New enhanced particles with trails */}
        {pageLoaded && [...Array(6)].map((_, i) => (
          <EnhancedParticle 
            key={`enhanced-${i}`} 
            color={particleColors[i % particleColors.length]} 
            size={i % 2 === 0 ? "w-3 h-3" : "w-2 h-2"}
            delay={i * 3}
          />
        ))}
      </div>
      
      <motion.div 
        ref={pageEnterRef}
        className="section-container relative z-10"
        variants={containerCascadeVariants}
      >
        <motion.h1 
          ref={titleRef} 
          className="section-title text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={enhancedHeaderVariants}
        >
          <motion.span 
            className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent inline-block"
            animate={{ 
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }}
            transition={{ 
              duration: 10, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            My Skills
          </motion.span>
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-primary-600 to-accent-500 mx-auto mt-2"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "5rem", opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />
        </motion.h1>
        
        <motion.p 
          className="section-subtitle text-center text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          variants={enhancedHeaderVariants}
        >
          I've honed my skills across the full software development stack, with expertise in modern frameworks and tools.
        </motion.p>

        {/* Skill Category Filter Tabs */}
        <motion.div
          ref={tabsRef}
          className="flex justify-center mb-12 overflow-x-auto pb-2 mt-10"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.5
              }
            }
          }}
        >
          <div className="bg-primary-900/70 backdrop-blur-sm border border-primary-800/50 rounded-lg p-1 flex">
            <motion.button 
              onClick={() => setFilter('all')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 
                ${filter === 'all' 
                  ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'}`}
              whileHover={buttonHoverEffect}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                transition: { delay: 0.6, duration: 0.5 }
              }}
            >
              All
            </motion.button>
            
            {skills.map((category, index) => (
              <motion.button 
                key={index}
                onClick={() => setFilter(category.category)} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 
                  ${filter === category.category 
                    ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'}`}
                whileHover={buttonHoverEffect}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.6 + (index * 0.1), duration: 0.5 } 
                }}
              >
                {category.category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid with AnimatePresence for smooth transitions */}
        <motion.div 
          className="space-y-16"
          variants={gridEntryVariant}
        >
          <AnimatePresence mode="wait">
            {(filter === 'all' ? skills : skills.filter(cat => cat.category === filter)).map((category, categoryIndex) => (
              <motion.div 
                key={category.category}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="space-y-8"
                ref={el => skillsRefs.current[category.category] = el}
                layout
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center gap-3"
                  variants={categoryHeaderVariants}
                >
                  <motion.div 
                    className="bg-gradient-to-r from-primary-600 to-accent-500 p-3 rounded-xl text-white"
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 }
                    }}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      rotate: 15 
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: 0,
                      transition: {
                        type: "spring",
                        damping: 12,
                        delay: 0.1 + (categoryIndex * 0.1)
                      }
                    }}
                  >
                    {getCategoryIcon(category.category)}
                  </motion.div>
                  <motion.h2 
                    className="text-2xl font-bold text-white"
                    initial={{ 
                      opacity: 0, 
                      x: -30,
                      filter: "blur(4px)"
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.8, 
                        delay: 0.2 + (categoryIndex * 0.1)
                      }
                    }}
                  >
                    {category.category}
                  </motion.h2>

                  {/* Category bar indicator */}
                  <motion.div 
                    className="h-[1px] bg-gradient-to-r from-primary-500 to-transparent flex-grow ml-4 opacity-50"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ 
                      scaleX: 1,
                      transition: { delay: 0.3 + (categoryIndex * 0.1), duration: 0.8 }
                    }}
                  />
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  layout
                >
                  <AnimatePresence>
                    {category.items.map((skill, index) => (
                      <SkillCard 
                        key={skill.name} 
                        skill={skill} 
                        index={index} 
                        categoryIndex={categoryIndex} 
                        isFiltering={isFiltering}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SkillCard = ({ skill, index, categoryIndex, isFiltering }) => {
  const [hovered, setHovered] = useState(false);
  const progressRef = useRef(null);
  
  // Animated card variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.97,
      filter: "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        damping: 15, 
        stiffness: 200,
        delay: 0.05 * index + (categoryIndex * 0.1),
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(5px)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Wave entry effect for each card in sequence
  const waveEntryVariant = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 1.2,
        delay: 0.06 * index + (categoryIndex * 0.1),
      }
    }
  };

  // Progress bar animation
  useEffect(() => {
    if (!isFiltering && progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { width: 0 },
        { 
          width: `${skill.proficiency}%`,
          duration: 1.5,
          delay: 0.1 * index + (categoryIndex * 0.05),
          ease: "power3.out"
        }
      );
    }
  }, [skill.proficiency, index, categoryIndex, isFiltering]);

  // Icon animation variants
  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -5, 5, -3, 0],
      scale: 1.15,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={waveEntryVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 30px -10px rgba(99, 102, 241, 0.15)",
        transition: { duration: 0.3, type: "spring", stiffness: 300 } 
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="grid-item flex flex-col items-center justify-center py-6 px-4 text-center rounded-xl bg-gradient-to-b from-primary-900/40 to-primary-900/60 border border-primary-800/30 backdrop-blur-sm"
      layout
    >
      <motion.div 
        className="text-4xl mb-4 text-primary-400 relative"
        variants={iconVariants}
        initial="initial"
        animate={hovered ? "hover" : "initial"}
      >
        {/* Glow effect on hover */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary-400 rounded-full filter blur-xl"
            style={{ zIndex: -1 }}
          />
        )}
        
        {getSkillIcon(skill.icon, 40)}
      </motion.div>
      
      <h3 className="font-medium text-white mb-2">{skill.name}</h3>
      
      {/* Progress bar with animation */}
      <div className="w-full bg-primary-800/50 rounded-full h-1.5 mb-1 relative overflow-hidden">
        <motion.div 
          ref={progressRef}
          className="h-full rounded-full absolute left-0 top-0"
          style={{
            background: `linear-gradient(90deg, var(--color-primary-600) 0%, var(--color-accent-500) 100%)`,
            width: 0
          }}
        />
      </div>
      
      <motion.span 
        className="text-xs text-primary-400"
        animate={{ 
          opacity: hovered ? 1 : 0.8,
          scale: hovered ? 1.1 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {skill.proficiency}%
      </motion.span>
    </motion.div>
  );
};

export default SkillsPage;