import React, { useState, useEffect, useRef } from 'react';
import { FiExternalLink, FiGithub, FiCalendar, FiTag, FiUser, FiFilter, FiChevronDown } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

// Animation variants for stats similar to EducationPage
const statHighlightVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: 48,
    scale: 0.97,
    filter: "blur(6px)",
    transition: { delay: i * 0.1 },
  }),
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.7, type: "spring", stiffness: 120 },
  }),
};

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const projectsRef = useRef(null);
  const statsRef = useRef(null);
  const sectionRef = useRef(null);

  // Extract unique technologies and categories for filters
  const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))];
  const allCategories = [...new Set(projects.map(project => project.category))];
  
  // Filter projects based on selected technology and category
  const filteredProjects = projects.filter(project => {
    const techMatch = filter === 'all' || project.technologies.includes(filter);
    const catMatch = category === 'all' || project.category === category;
    return techMatch && catMatch;
  });

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
    
    // Header animation
    masterTl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.9,
        ease: "power3.out"
      }
    );

    // Filter animation
    masterTl.fromTo(
      filtersRef.current.querySelectorAll('.filter-item'),
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.4" // Start slightly before previous animation completes
    );

    // Store the master timeline's ScrollTrigger
    if (masterTl.scrollTrigger) {
      triggers.push(masterTl.scrollTrigger);
    }

    // Projects animation
    const projectItems = projectsRef.current.querySelectorAll('.project-card');
    const projectsTrigger = ScrollTrigger.create({
      trigger: projectsRef.current,
      start: "top 85%",
      animation: gsap.fromTo(
        projectItems,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
        }
      )
    });
    triggers.push(projectsTrigger);

    // No GSAP animation for stats anymore as we're using Framer Motion instead

    // Cleanup function to kill all ScrollTrigger instances
    return () => {
      triggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
    };
  }, []);

  // Animation for when filters change
  useEffect(() => {
    if (projectsRef.current) {
      gsap.fromTo(
        projectsRef.current,
        { opacity: 0.6 },
        { opacity: 1, duration: 0.5, ease: "power2.inOut" }
      );
    }
  }, [filter, category]);

  // Project stats
  const projectStats = [
    {
      value: projects.length,
      label: "Total Projects",
      color: "text-indigo-400"
    },
    {
      value: projects.filter(p => p.role.includes("Leader")).length,
      label: "Leadership Roles",
      color: "text-blue-400"
    },
    {
      value: allTechnologies.length + "+",
      label: "Technologies Used",
      color: "text-purple-400"
    },
    {
      value: "100%",
      label: "Client Satisfaction",
      color: "text-green-400"
    }
  ];

  return (
    <div ref={sectionRef} className="min-h-screen py-20">
      <div className="section-container">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12">
          <h1 className="section-title">
            My <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">Projects</span>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-blue-400 mx-auto mt-2"></div>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Explore my portfolio showcasing innovative solutions in web development, mobile apps, and digital experiences.
          </p>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="mb-12">
          {/* Mobile filter toggle */}
          <div className="md:hidden mb-4 flex justify-center">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-4 py-2 bg-indigo-900/50 text-blue-200 border border-indigo-700/50 rounded-full transition-all focus:outline-none"
            >
              <FiFilter className="mr-2" size={16} />
              Filter Projects
              <FiChevronDown className={`ml-2 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} size={16} />
            </button>
          </div>

          {/* Filter section */}
          <div className={`filter-container ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            {/* Categories filter - Removing the "All Categories" button and the first category button */}
            <div className="flex justify-center flex-wrap gap-2 mb-4">
              {/* Removed "All Categories" button and first category button */}
              {allCategories.slice(1).map((cat, index) => (
                <motion.button 
                  key={index}
                  className={`filter-item px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
                    ${category === cat 
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/20' 
                      : 'bg-indigo-900/40 text-blue-200 hover:bg-indigo-800/50 border border-indigo-700/40'}`}
                  onClick={() => setCategory(cat === category ? 'all' : cat)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
            
            {/* Technologies filter - Kept unchanged as requested */}
            <div className="flex justify-center flex-wrap gap-2 mb-2">
              <motion.button 
                className={`filter-item px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 
                  ${filter === 'all' 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40' 
                    : 'bg-indigo-950/60 text-blue-200 hover:bg-indigo-900/50 border border-indigo-800/40'}`}
                onClick={() => setFilter('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All Technologies
              </motion.button>
              
              {allTechnologies.slice(0, 10).map((tech, index) => (
                <motion.button 
                  key={index}
                  className={`filter-item px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 
                    ${filter === tech 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40' 
                      : 'bg-indigo-950/60 text-blue-200 hover:bg-indigo-900/50 border border-indigo-800/40'}`}
                  onClick={() => setFilter(tech)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div 
          ref={projectsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
              ))
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="col-span-full py-16 text-center"
              >
                <div className="bg-indigo-900/30 border border-indigo-700/30 rounded-xl p-6 max-w-md mx-auto">
                  <p className="text-blue-200 font-medium">No projects match your current filters.</p>
                  <button 
                    onClick={() => { setFilter('all'); setCategory('all'); }}
                    className="mt-4 px-4 py-2 bg-indigo-600/70 hover:bg-indigo-600 text-white text-sm rounded-md transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project Stats - Using new animations but with previous styling */}
        <motion.div 
          ref={statsRef} 
          className="mb-10"
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)", 
            transition: { duration: 0.9, delay: 0.2 }
          }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-indigo-900/60 to-indigo-950/80 border border-indigo-800/40 rounded-2xl px-8 py-10 shadow-xl backdrop-blur-lg">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Project Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {projectStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.6 }}
                  variants={statHighlightVariants}
                  className="stat-item flex flex-col items-center"
                >
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-blue-100 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  
  // Determine tech badge colors
  const getTechColor = (tech) => {
    const techColors = {
      'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'React.js': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Node.js': 'bg-green-500/20 text-green-300 border-green-500/30',
      'PHP': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'MySQL': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      'MongoDB': 'bg-green-600/20 text-green-300 border-green-600/30',
      'Flutter': 'bg-blue-400/20 text-blue-300 border-blue-400/30',
      'Java': 'bg-red-500/20 text-red-300 border-red-500/30',
      'Kotlin': 'bg-purple-600/20 text-purple-300 border-purple-600/30',
      'HTML': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'CSS': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Dart': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'Spring Boot': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Figma': 'bg-purple-400/20 text-purple-300 border-purple-400/30',
      'Express.js': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      'Bootstrap': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'JSP': 'bg-orange-600/20 text-orange-300 border-orange-600/30'
    };
    return techColors[tech] || 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: index * 0.1
      }
    },
    hover: {
      y: -12,
      scale: 1.02,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const imageOverlayVariants = {
    hidden: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  return (
    <motion.div
      className="project-card h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-full flex flex-col overflow-hidden bg-gradient-to-br from-indigo-900/40 to-indigo-950/90 border border-indigo-800/40 rounded-2xl shadow-xl backdrop-blur-lg hover:border-indigo-700/60 transition-all">
        {/* Project Image with overlay */}
        <div className="relative overflow-hidden h-48">
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-center"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7 }}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://via.placeholder.com/300x200?text=Project+Image';
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/60 to-transparent flex items-end justify-center p-4"
            variants={imageOverlayVariants}
          >
            <motion.div 
              className="flex space-x-3"
              variants={buttonVariants}
            >
              <motion.a 
                href={project.demoLink || "#"} 
                className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white p-2 rounded-full shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View live project"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink size={18} />
              </motion.a>
              <motion.a 
                href={project.codeLink || "#"} 
                className="bg-indigo-800/80 hover:bg-indigo-700 text-white p-2 rounded-full shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View source code"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub size={18} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Project badges */}
          <div className="absolute top-3 left-3">
            <motion.span 
              className="bg-blue-500/30 text-blue-200 text-xs px-2.5 py-1 rounded-full border border-blue-400/30 flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FiTag className="mr-1" size={12} />
              {project.category}
            </motion.span>
          </div>
          <div className="absolute top-3 right-3">
            <motion.span 
              className="bg-indigo-500/30 text-indigo-200 text-xs px-2.5 py-1 rounded-full border border-indigo-400/30 flex items-center"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FiCalendar className="mr-1" size={12} />
              {project.year}
            </motion.span>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          {/* Title and role */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex items-center mt-1">
              <FiUser className="mr-1 text-indigo-400" size={14} />
              <span className="text-indigo-300 text-sm">
                {project.role}
              </span>
            </div>
          </div>
          
          <p className="text-blue-100 text-sm mb-4 flex-grow">
            {project.description}
          </p>
          
          {/* Features */}
          {project.features && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-indigo-300 mb-2 uppercase tracking-wide">Key Features</h4>
              <ul className="space-y-1">
                {project.features.slice(0, 3).map((feature, i) => (
                  <motion.li 
                    key={i} 
                    className="text-blue-200 text-xs flex"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                  >
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2"></div>
                    <div>{feature}</div>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Technologies */}
          <div className="mt-auto pt-4 border-t border-indigo-800/30">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <motion.span 
                  key={i} 
                  className={`text-xs px-2 py-0.5 rounded-full border ${getTechColor(tech)}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (i * 0.05) }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsPage;