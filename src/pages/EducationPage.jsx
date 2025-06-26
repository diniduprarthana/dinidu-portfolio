import React, { useEffect, useRef } from 'react';
import {
  FiBook,
  FiAward,
  FiCalendar,
  FiMapPin,
  FiBookOpen,
  FiFileText,
  FiBookmark,
} from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Professional color palette
const indigo = 'from-indigo-600 to-blue-500';
const indigoAccent = 'from-indigo-700 to-indigo-500';

// Sample data (replace with import if needed)
const education = [
  {
    degree: 'Bachelor of Information Technology',
    institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
    year: '2023 - Present',
    description:
      'Pursuing comprehensive education in Information Technology with focus on software development, web technologies, and digital innovation.',
  },
  {
    degree: 'GCE Advanced Level',
    institution: 'Peradeniya Central College',
    year: '2021',
    description:
      'Completed Advanced Level with focus on Engineering Technology stream, building strong foundation in technical subjects.',
  },
  {
    degree: 'GCE Ordinary Level',
    institution: 'Wickramabahu National School',
    year: '2019',
    description:
      'Successfully completed Ordinary Level education with excellent academic performance.',
  },
];

const achievements = [
  {
    title: 'CODECON Inter-University Hackathon',
    year: '2023',
    description:
      'Recognized for innovative solutions in development during this prestigious inter-university competition.',
  },
  {
    title: 'Sustainable Synergy Digital Poster Competition',
    year: '2024',
    description:
      'Awarded for outstanding Sustainable Development Goals poster design showcasing creativity and awareness.',
  },
];

const certifications = [
  {
    category: 'Tech & Creative Skills',
    courses: [
      'CSS3 & Bootstrap (Udemy)',
      'After Effects (2 Courses | Udemy)',
      'Google Analytics 4 (GA4)',
      'Product Photography & Content Creation',
    ],
  },
  {
    category: 'Digital Marketing & Business',
    courses: [
      'Email Marketing',
      'Social Media Marketing (Sinhala)',
      'YouTube Mastery (Sinhala)',
      'Local SEO & Facebook Ads (10 Days Challenge)',
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

const AcademicHighlights = [
  {
    value: "3+",
    label: "Years of Study",
    color: "text-indigo-400",
    glow: "shadow-indigo-400/50",
  },
  {
    value: "2",
    label: "Major Achievements",
    color: "text-purple-400",
    glow: "shadow-purple-400/50",
  },
  {
    value: "8+",
    label: "Certifications",
    color: "text-green-400",
    glow: "shadow-green-400/50",
  },
  {
    value: "A",
    label: "Grade Average",
    color: "text-yellow-400",
    glow: "shadow-yellow-400/50",
  },
];

const highlightVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: 48,
    scale: 0.97,
    filter: "blur(6px)",
    transition: { delay: i * 0.1 },
  }),
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.7, type: "spring", stiffness: 120 },
  }),
};

const emboseClass =
  "bg-gradient-to-br from-[#181e32] to-[#1e2441] border border-indigo-800/40 shadow-[0_2px_36px_0_rgba(80,100,180,0.14)] backdrop-blur-xl rounded-2xl";

const EducationPage = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const achievementsRef = useRef(null);
  const certificationsRef = useRef(null);
  const highlightsRef = useRef(null);

  // GSAP scroll animations for timeline and achievements
  useEffect(() => {
    // Store all ScrollTrigger instances for cleanup
    const triggers = [];
    
    // Section animation
    const sectionTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      end: 'bottom 10%',
      toggleActions: 'play none none reverse',
      animation: gsap.fromTo(
        sectionRef.current,
        { opacity: 0.3 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      )
    });
    triggers.push(sectionTrigger);
    
    // Title animation
    const titleTrigger = ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 90%',
      animation: gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    });
    triggers.push(titleTrigger);

    // Timeline items animation
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      items.forEach((el, idx) => {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          animation: gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              delay: idx * 0.09,
            }
          )
        });
        triggers.push(trigger);
      });
    }
    
    // Achievements animation
    if (achievementsRef.current) {
      const items = achievementsRef.current.querySelectorAll('.achievement-card');
      items.forEach((el, idx) => {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 94%',
          animation: gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              delay: idx * 0.09,
            }
          )
        });
        triggers.push(trigger);
      });
    }
    
    // Certifications animation
    if (certificationsRef.current) {
      const certTrigger = ScrollTrigger.create({
        trigger: certificationsRef.current,
        start: 'top 90%',
        animation: gsap.fromTo(
          certificationsRef.current.querySelectorAll('.certification-card'),
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.15,
            duration: 0.7, 
            ease: 'power2.out' 
          }
        )
      });
      triggers.push(certTrigger);
    }
    
    // Academic highlights embose animation
    if (highlightsRef.current) {
      const highlightTrigger = ScrollTrigger.create({
        trigger: highlightsRef.current,
        start: 'top 90%',
        animation: gsap.fromTo(
          highlightsRef.current,
          { opacity: 0, y: 60, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out"
          }
        )
      });
      triggers.push(highlightTrigger);
    }

    // Cleanup function to kill all ScrollTrigger instances
    return () => {
      triggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen py-20">
      <div className="section-container">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h1 className="section-title">
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Education
            </span>{' '}
            & <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Achievements</span>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 to-blue-400 mx-auto mt-2"></div>
          </h1>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            My academic journey and professional milestones.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <span className={`bg-gradient-to-tr from-indigo-400 to-blue-400 p-3 rounded-xl mr-4`}>
              <FiBook size={28} className="text-white" />
            </span>
            Education
          </h2>
          <div ref={timelineRef} className="space-y-8">
            {education.map((item, index) => (
              <motion.div
                whileHover={{
                  scale: 1.018,
                  boxShadow: '0 8px 32px 0 rgba(99,102,241,0.13)',
                  borderColor: '#4f8cff',
                  transition: { duration: 0.15 },
                }}
                whileTap={{ scale: 0.98 }}
                key={index}
                className="timeline-item relative cursor-pointer transition-all duration-150"
              >
                <div className="absolute -left-[25px] top-4 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 border-2 border-[#232744] shadow-lg"></div>
                <div className="bg-gradient-to-br from-[#222640]/90 to-[#232744]/80 rounded-xl p-6 border border-[#232744] hover:border-blue-400 transition-all shadow-md overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                      <div className="flex items-center text-blue-200 text-base">
                        <FiMapPin className="mr-1" size={14} />
                        <span>{item.institution}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-indigo-300 text-sm">
                      <FiCalendar className="mr-1" size={14} />
                      <span>{item.year}</span>
                    </div>
                  </div>
                  <p className="text-blue-100">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <span className={`bg-gradient-to-tr from-indigo-500 to-blue-500 p-3 rounded-xl mr-4`}>
              <FiAward size={28} className="text-white" />
            </span>
            Achievements
          </h2>
          <div
            ref={achievementsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {achievements.map((item, index) => (
              <motion.div
                whileHover={{
                  scale: 1.025,
                  borderColor: '#4f8cff',
                  boxShadow: '0 8px 32px 0 rgba(80,180,255,0.13)',
                  transition: { duration: 0.15 },
                }}
                whileTap={{ scale: 0.98 }}
                key={index}
                className="achievement-card rounded-xl bg-gradient-to-br from-[#232744]/80 to-[#232744]/50 border border-[#232744] hover:border-blue-400 transition-all duration-150 p-6 flex flex-col gap-2 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-lg flex items-center justify-center">
                      <FiBookmark className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-lg font-semibold text-white">
                      {item.title}
                    </div>
                  </div>
                  <span className="bg-blue-900/60 text-blue-200 text-sm px-3 py-1 rounded-full">
                    {item.year}
                  </span>
                </div>
                <p className="text-blue-100 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div ref={certificationsRef} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <span className="bg-gradient-to-r from-indigo-400 to-blue-400 p-3 rounded-xl mr-4">
              <FiFileText size={28} className="text-white" />
            </span>
            Certifications & Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, idx) => (
              <motion.div
                whileHover={{
                  scale: 1.019,
                  borderColor: '#4f8cff',
                  boxShadow: '0 8px 32px 0 rgba(80,180,255,0.12)',
                  transition: { duration: 0.13 },
                }}
                whileTap={{ scale: 0.98 }}
                key={idx}
                className="certification-card rounded-2xl p-8 shadow-xl bg-white/10 backdrop-blur-md border border-[#232744] hover:border-blue-400 group transition-all duration-150"
                style={{
                  background: "linear-gradient(135deg,rgba(36,40,70,0.40),rgba(60,65,130,0.21))",
                }}
              >
                <div className="flex items-center mb-4">
                  <FiBookOpen className="text-blue-300 w-7 h-7 mr-3" />
                  <span className="text-xl font-bold text-blue-100 group-hover:text-blue-300 transition">
                    {cert.category}
                  </span>
                </div>
                <ul className="space-y-3 pl-2">
                  {cert.courses.map((course, j) => (
                    <li key={j} className="flex items-center text-blue-100 text-base">
                      <span className="inline-block w-2 h-2 mr-3 bg-blue-400 rounded-full"></span>
                      {course}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Academic Highlights */}
        <div className="mt-16 flex justify-center">
          <motion.div
            ref={highlightsRef}
            className={`${emboseClass} w-full max-w-5xl px-8 py-10 flex flex-col`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, delay: 0.2 } },
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white tracking-wide">
              Academic Highlights
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {AcademicHighlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={highlightVariants}
                  className={`flex flex-col items-center`}
                >
                  <div
                    className={`
                      text-3xl md:text-4xl font-bold mb-2
                      ${item.color} ${item.glow}
                      drop-shadow
                    `}
                  >
                    {item.value}
                  </div>
                  <div className="text-blue-100 md:text-base text-center font-medium tracking-wide">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;