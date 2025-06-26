import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-16">
      <motion.h1 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        {title}
        <div className="h-1 w-20 bg-gradient-to-r from-primary-600 to-accent-500 mx-auto mt-2"></div>
      </motion.h1>
      
      {subtitle && (
        <motion.p 
          className="section-subtitle text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default PageHeader;