import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  href, 
  to, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  onClick,
  ...props
}) => {
  // Style variants
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white shadow-lg hover:shadow-primary-500/50',
    outline: 'border-2 border-primary-600 text-white hover:bg-primary-600/20',
    secondary: 'bg-primary-800 hover:bg-primary-700 text-white',
    link: 'text-primary-400 hover:text-primary-300 hover:underline',
  };

  // Size variants
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg',
  };

  const baseClasses = 'rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2';
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  // Create appropriate element based on props
  if (href) {
    return (
      <motion.a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
  
  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          to={to}
          className={buttonClasses}
          {...props}
        >
          {children}
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;