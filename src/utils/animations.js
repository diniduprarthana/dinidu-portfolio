import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Animate element from bottom to its original position
 * @param {Element} element - DOM element to animate
 * @param {Object} options - Animation options
 */
export const fadeInUp = (element, options = {}) => {
  const {
    delay = 0,
    duration = 0.8,
    y = 30,
    scrollTrigger = true,
  } = options;

  const animation = {
    opacity: 0,
    y,
    duration,
    delay,
    ease: 'power3.out',
  };

  if (scrollTrigger && element) {
    animation.scrollTrigger = {
      trigger: element,
      start: 'top 90%',
    };
  }

  return gsap.fromTo(element, { opacity: 0, y }, animation);
};

/**
 * Animate element from left to its original position
 * @param {Element} element - DOM element to animate
 * @param {Object} options - Animation options
 */
export const fadeInLeft = (element, options = {}) => {
  const {
    delay = 0,
    duration = 0.8,
    x = -30,
    scrollTrigger = true,
  } = options;

  const animation = {
    opacity: 1,
    x: 0,
    duration,
    delay,
    ease: 'power3.out',
  };

  if (scrollTrigger && element) {
    animation.scrollTrigger = {
      trigger: element,
      start: 'top 90%',
    };
  }

  return gsap.fromTo(element, { opacity: 0, x }, animation);
};

/**
 * Animate element from right to its original position
 * @param {Element} element - DOM element to animate
 * @param {Object} options - Animation options
 */
export const fadeInRight = (element, options = {}) => {
  const {
    delay = 0,
    duration = 0.8,
    x = 30,
    scrollTrigger = true,
  } = options;

  const animation = {
    opacity: 1,
    x: 0,
    duration,
    delay,
    ease: 'power3.out',
  };

  if (scrollTrigger && element) {
    animation.scrollTrigger = {
      trigger: element,
      start: 'top 90%',
    };
  }

  return gsap.fromTo(element, { opacity: 0, x }, animation);
};

/**
 * Scale element up with fade in
 * @param {Element} element - DOM element to animate
 * @param {Object} options - Animation options
 */
export const scaleIn = (element, options = {}) => {
  const {
    delay = 0,
    duration = 0.8,
    scale = 0.8,
    scrollTrigger = true,
  } = options;

  const animation = {
    opacity: 1,
    scale: 1,
    duration,
    delay,
    ease: 'back.out(1.7)',
  };

  if (scrollTrigger && element) {
    animation.scrollTrigger = {
      trigger: element,
      start: 'top 90%',
    };
  }

  return gsap.fromTo(element, { opacity: 0, scale }, animation);
};

/**
 * Staggered animation for multiple elements
 * @param {NodeList|Array} elements - DOM elements to animate
 * @param {Object} options - Animation options
 */
export const staggerElements = (elements, options = {}) => {
  const {
    y = 20,
    delay = 0,
    staggerAmount = 0.1,
    duration = 0.5,
    scrollTrigger = null,
  } = options;

  const animation = {
    opacity: 1,
    y: 0,
    duration,
    stagger: staggerAmount,
    delay,
    ease: 'power2.out',
  };

  if (scrollTrigger) {
    animation.scrollTrigger = {
      trigger: scrollTrigger,
      start: 'top 90%',
    };
  }

  return gsap.fromTo(elements, { opacity: 0, y }, animation);
};

/**
 * Creates a typing text effect
 * @param {Element} element - DOM element containing the text
 * @param {Object} options - Animation options
 */
export const typeText = (element, options = {}) => {
  const {
    delay = 0,
    speed = 50,
    cursor = true,
  } = options;

  if (!element) return;

  const text = element.textContent;
  element.textContent = '';
  
  // Create cursor element if enabled
  let cursorEl;
  if (cursor) {
    cursorEl = document.createElement('span');
    cursorEl.textContent = '|';
    cursorEl.className = 'animate-pulse';
    element.appendChild(cursorEl);
  }
  
  // Trigger typing after delay
  setTimeout(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        if (cursor) {
          element.innerHTML = text.substring(0, index + 1) + '<span class="animate-pulse">|</span>';
        } else {
          element.textContent = text.substring(0, index + 1);
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  }, delay * 1000);
};

/**
 * Creates a text reveal animation with splitting
 * @param {Element} element - DOM element containing the text
 * @param {Object} options - Animation options
 */
export const revealText = (element, options = {}) => {
  const {
    delay = 0,
    duration = 1,
    staggerAmount = 0.05,
    ease = 'power2.out',
  } = options;

  if (!element) return;

  // Split text into spans for individual letter animation
  const text = element.textContent;
  element.textContent = '';
  
  [...text].forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(20px)';
    element.appendChild(span);
  });

  const chars = element.querySelectorAll('span');
  
  gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration,
    stagger: staggerAmount,
    delay,
    ease,
  });
};