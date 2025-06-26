import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Import pages (these will become sections)
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EducationPage from './pages/EducationPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ReferencesPage from './pages/ReferencesPage';
import ContactPage from './pages/ContactPage';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    education: useRef(null),
    services: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    references: useRef(null),
    contact: useRef(null),
  };

  // Handle scrolling to sections
  const scrollToSection = (sectionId) => {
    if (!sectionRefs[sectionId] || !sectionRefs[sectionId].current) return;
    
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: sectionRefs[sectionId].current,
        offsetY: 80 // Offset for fixed header
      },
      ease: "power3.inOut"
    });
  };

  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Remove old overlays if hot-reloading
    document.querySelectorAll('.custom-bg-overlay').forEach(el => el.remove());

    // Add animated gradient overlay
    const gradientOverlay = document.createElement('div');
    gradientOverlay.className = 'custom-bg-overlay fixed inset-0 z-0 pointer-events-none animate-gradient-x';
    gradientOverlay.style.background = 'linear-gradient(120deg, #6366f1 0%, #a855f7 40%, #06b6d4 100%)';
    gradientOverlay.style.opacity = '0.12';

    // Add grid overlay for subtle pattern
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'custom-bg-overlay fixed inset-0 z-0 pointer-events-none';
    gridOverlay.style.backgroundImage =
      'linear-gradient(to right, #fff3 1px, transparent 1px), linear-gradient(to bottom, #fff3 1px, transparent 1px)';
    gridOverlay.style.backgroundSize = '40px 40px';
    gridOverlay.style.opacity = '0.08';

    document.body.appendChild(gradientOverlay);
    document.body.appendChild(gridOverlay);

    // Set up scroll triggers to detect active section
    const triggers = [];
    
    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (!ref.current) return;
      
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id)
      });
      
      triggers.push(trigger);
    });

    // Cleanup overlays and scroll triggers when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = '';
      gradientOverlay.remove();
      gridOverlay.remove();
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-primary-950">
      {/* Global animated background */}
      <AnimatedBackground />
      
      {/* Navbar always on top */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main className="flex-grow z-10 relative">
        {/* All pages become sections */}
        <section ref={sectionRefs.home} id="home" className="min-h-screen">
          <HomePage />
        </section>
        
        <section ref={sectionRefs.about} id="about" className="min-h-screen">
          <AboutPage />
        </section>
        
        <section ref={sectionRefs.education} id="education" className="min-h-screen">
          <EducationPage />
        </section>
        
        <section ref={sectionRefs.services} id="services" className="min-h-screen">
          <ServicesPage scrollToSection={scrollToSection} />
        </section>
        
        <section ref={sectionRefs.projects} id="projects" className="min-h-screen">
          <ProjectsPage />
        </section>
        
        <section ref={sectionRefs.skills} id="skills" className="min-h-screen">
          <SkillsPage />
        </section>
        
        <section ref={sectionRefs.references} id="references" className="min-h-screen">
          <ReferencesPage />
        </section>
        
        <section ref={sectionRefs.contact} id="contact" className="min-h-screen">
          <ContactPage />
        </section>
      </main>
      
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;