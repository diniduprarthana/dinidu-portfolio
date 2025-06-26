import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = ({ 
  particleCount = 20, 
  particleColors = ['bg-primary-500/30', 'bg-blue-400/30', 'bg-indigo-400/30', 'bg-purple-400/30', 'bg-cyan-400/30'],
  createInterval = 800,
  className = ""
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const createParticle = () => {
      if (!containerRef.current) return;

      const particle = document.createElement('div');
      particle.className = `absolute rounded-full ${particleColors[Math.floor(Math.random() * particleColors.length)]}`;
      
      // Random size
      const size = Math.random() * 12 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.zIndex = '1';
      particle.style.pointerEvents = 'none';
      
      containerRef.current.appendChild(particle);
      
      // Animate and remove
      gsap.to(particle, {
        duration: Math.random() * 6 + 4,
        y: -Math.random() * 300 - 100,
        x: Math.random() * 200 - 100,
        opacity: 0,
        scale: 0,
        ease: "power2.out",
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }
      });
    };
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => createParticle(), i * 100);
    }
    
    // Continue creating particles
    const particleInterval = setInterval(createParticle, createInterval);
    
    return () => {
      clearInterval(particleInterval);
      // Clean up remaining particles
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [particleCount, particleColors, createInterval]);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};

export default AnimatedBackground;
