import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

/* eslint-disable no-undef */

/**
 * Custom hook for scroll-based animations using GSAP ScrollTrigger
 * @param {Object} options - Configuration options for the animations
 * @returns {Object} Animation control methods and refs
 */
const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  const defaultOptions = {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    duration: 1,
    ease: "power2.out",
    ...options
  };

  // Create animation function
  const createAnimation = useCallback((element, animationType = 'fadeInUp') => {
    if (!element) return null;

    let animation;

    switch (animationType) {
      case 'fadeInUp':
        animation = gsap.fromTo(element, 
          { 
            opacity: 0, 
            y: 50 
          },
          {
            opacity: 1,
            y: 0,
            duration: defaultOptions.duration,
            ease: defaultOptions.ease
          }
        );
        break;
      
      case 'fadeInLeft':
        animation = gsap.fromTo(element,
          {
            opacity: 0,
            x: -50
          },
          {
            opacity: 1,
            x: 0,
            duration: defaultOptions.duration,
            ease: defaultOptions.ease
          }
        );
        break;
      
      case 'fadeInRight':
        animation = gsap.fromTo(element,
          {
            opacity: 0,
            x: 50
          },
          {
            opacity: 1,
            x: 0,
            duration: defaultOptions.duration,
            ease: defaultOptions.ease
          }
        );
        break;
      
      case 'scale':
        animation = gsap.fromTo(element,
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration: defaultOptions.duration,
            ease: defaultOptions.ease
          }
        );
        break;
      
      case 'slideInUp':
        animation = gsap.fromTo(element,
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: defaultOptions.duration,
            ease: defaultOptions.ease
          }
        );
        break;
      
      default:
        animation = gsap.fromTo(element,
          {
            opacity: 0
          },
          {
            opacity: 1,
            duration: defaultOptions.duration,
            ease: defaultOptions.ease
          }
        );
    }

    return animation;
  }, [defaultOptions]);

  // Initialize scroll trigger
  const initScrollTrigger = useCallback((animationType = 'fadeInUp', customOptions = {}) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const animation = createAnimation(element, animationType);
    
    if (!animation) return;

    const scrollTriggerOptions = {
      trigger: element,
      start: defaultOptions.start,
      end: defaultOptions.end,
      toggleActions: defaultOptions.toggleActions,
      animation: animation,
      ...customOptions
    };

    // Creating ScrollTrigger instance
    animationRef.current = ScrollTrigger.create(scrollTriggerOptions);

    return animationRef.current;
  }, [createAnimation, defaultOptions]);

  // Animate children with stagger
  const animateChildren = useCallback((selector = '*', animationType = 'fadeInUp', stagger = 0.1) => {
    if (!elementRef.current) return;

    const children = elementRef.current.querySelectorAll(selector);
    
    children.forEach((child, index) => {
      const animation = createAnimation(child, animationType);
      
      if (animation) {
        // Using imported ScrollTrigger here (line 117 in original file)
        ScrollTrigger.create({
          trigger: child,
          start: defaultOptions.start,
          end: defaultOptions.end,
          toggleActions: defaultOptions.toggleActions,
          animation: animation,
          delay: index * stagger
        });
      }
    });
  }, [createAnimation, defaultOptions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      // Using imported ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Refresh ScrollTrigger when needed
  const refresh = useCallback(() => {
    // Using imported ScrollTrigger
    ScrollTrigger.refresh();
  }, []);

  return {
    elementRef,
    initScrollTrigger,
    animateChildren,
    createAnimation,
    refresh
  };
};

/* eslint-enable no-undef */

export default useScrollAnimation;