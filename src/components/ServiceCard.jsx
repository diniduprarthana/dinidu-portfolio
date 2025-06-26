import React, { useRef, useEffect } from 'react';
import { FiCode, FiLayout, FiSmartphone, FiVideo, FiPenTool, FiCamera, FiChevronRight } from 'react-icons/fi';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

// Map service icons to React Icons
const getServiceIcon = (iconName) => {
  switch(iconName) {
    case 'code': return <FiCode size={24} />;
    case 'design': return <FiLayout size={24} />;
    case 'mobile': return <FiSmartphone size={24} />;
    case 'video': return <FiVideo size={24} />;
    case 'palette': return <FiPenTool size={24} />;
    case 'camera': return <FiCamera size={24} />;
    default: return <FiCode size={24} />;
  }
};

const ServiceCard = ({ service, index }) => {
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
      className="group"
    >
      <div className="card h-full flex flex-col relative overflow-hidden">
        {/* Gradient orb in background */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-600/10 rounded-full blur-3xl group-hover:bg-primary-600/20 transition-all duration-700"></div>
        
        {/* Service Icon */}
        <div className="bg-gradient-to-br from-primary-600 to-accent-500 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 text-white shadow-lg shadow-primary-600/20 group-hover:shadow-primary-600/40 transition-all duration-300">
          {getServiceIcon(service.icon)}
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-gray-300 mb-6 flex-grow">
          {service.description}
        </p>
        
        {/* Technologies */}
        <div className="mt-auto">
          <h4 className="text-sm font-semibold text-primary-400 mb-3">TECHNOLOGIES</h4>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="bg-primary-800/50 text-primary-300 text-xs px-3 py-1 rounded-full border border-primary-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Learn more button */}
        <div className="mt-6 pt-4 border-t border-primary-800/30">
          <button className="text-primary-400 hover:text-primary-300 transition-colors duration-300 flex items-center text-sm font-medium">
            Learn more <FiChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;