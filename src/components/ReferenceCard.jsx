import React, { useRef, useEffect } from 'react';
import { FiStar, FiMail } from 'react-icons/fi';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const ReferenceCard = ({ reference, index }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        delay: 0.2 * index,
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
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="card p-6"
    >
      <div className="flex-grow">
        <p className="italic text-gray-300 text-lg leading-relaxed mb-4">
          {reference.description}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-primary-800/30">
        <div>
          <h3 className="font-bold text-white">{reference.name}</h3>
          <p className="text-primary-400 text-sm">{reference.role}</p>
          <div className="flex items-center mt-1 text-gray-400">
            <FiMail size={14} className="mr-1" />
            <span className="text-sm">{reference.email}</span>
          </div>
        </div>
        
        <div className="flex">
          {[...Array(reference.rating)].map((_, i) => (
            <FiStar key={i} className="text-yellow-500 fill-current" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReferenceCard;