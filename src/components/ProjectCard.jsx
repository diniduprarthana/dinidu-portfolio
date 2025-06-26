import React, { useRef, useEffect } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        delay: 0.1 * index,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%"
        }
      }
    );
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group h-full"
    >
      <div className="card h-full flex flex-col overflow-hidden">
        {/* Project Image with overlay */}
        <div className="relative overflow-hidden rounded-lg h-48 mb-4">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-accent-500 opacity-30 group-hover:opacity-0 transition-opacity duration-300"></div>
          <img 
            src={`/assets/${project.image}`} 
            alt={project.title} 
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://via.placeholder.com/300x200?text=Project+Image';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end justify-center p-4">
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors duration-300"
                aria-label="View live project"
              >
                <FiExternalLink size={18} />
              </a>
              <a 
                href="#" 
                className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors duration-300"
                aria-label="View source code"
              >
                <FiGithub size={18} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Role badge */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
            {project.title}
          </h3>
          <span className="bg-primary-800/50 text-primary-300 text-xs px-2 py-1 rounded-full">
            {project.role}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 flex-grow">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="mt-auto pt-4 border-t border-primary-800/30">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="bg-primary-800/30 text-primary-400 text-xs px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;