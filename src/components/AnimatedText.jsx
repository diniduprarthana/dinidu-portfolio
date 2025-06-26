import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const AnimatedText = ({ text, type = 'heading', className = '', delay = 0 }) => {
  const textRef = useRef(null);

  useEffect(() => {
    // Animation based on type
    switch (type) {
      case 'heading':
        // Split text into individual spans for letter animation
        const splitText = new SplitText(textRef.current, { type: 'chars,words,lines' });
        const chars = splitText.chars;
        
        gsap.fromTo(
          chars,
          { opacity: 0, y: 10 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.05, 
            duration: 0.5,
            delay: delay,
            ease: 'power2.out'
          }
        );
        break;
        
      case 'paragraph':
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            delay: delay,
            ease: 'power2.out'
          }
        );
        break;
        
      case 'fade':
        gsap.fromTo(
          textRef.current,
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 1,
            delay: delay,
            ease: 'power2.out'
          }
        );
        break;
        
      default:
        break;
    }
  }, [type, delay]);

  return (
    <div ref={textRef} className={className}>
      {text}
    </div>
  );
};

// Simple solution for text splitting if SplitText from GSAP is not available
class SplitText {
  constructor(element, options) {
    this.element = element;
    this.options = options;
    this.chars = [];
    this.words = [];
    this.lines = [];

    this.split();
  }

  split() {
    const text = this.element.textContent;
    this.element.textContent = '';

    const words = text.split(' ');
    
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.position = 'relative';
      this.words.push(wordSpan);
      
      if (wordIndex > 0) {
        this.element.appendChild(document.createTextNode(' '));
      }
      
      [...word].forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.style.display = 'inline-block';
        charSpan.style.position = 'relative';
        charSpan.textContent = char;
        this.chars.push(charSpan);
        wordSpan.appendChild(charSpan);
      });
      
      this.element.appendChild(wordSpan);
    });
    
    // Split lines method would be more complex and require layout calculations
    // This is simplified for the purpose of this example
    this.lines = [this.element];
  }
}

export default AnimatedText;