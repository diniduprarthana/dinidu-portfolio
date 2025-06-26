import React, { useRef, useEffect } from 'react';
import { 
  DiReact, DiJavascript1, DiPython, DiJava, DiCss3, DiHtml5, 
  DiNodejsSmall, DiMongodb, DiMysql, DiBootstrap, DiGithubBadge 
} from 'react-icons/di';
import { SiFlutter, SiDart, SiSpring, SiC, SiCplusplus, SiCsharp, SiPhp, SiFigma, SiPostman } from 'react-icons/si';
import { FiCode } from 'react-icons/fi';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

// Map skill icons to React Icons
const getSkillIcon = (iconName, size = 24) => {
  switch(iconName) {
    case 'react': return <DiReact size={size} />;
    case 'js': return <DiJavascript1 size={size} />;
    case 'python': return <DiPython size={size} />;
    case 'java': return <DiJava size={size} />;
    case 'css': return <DiCss3 size={size} />;
    case 'html': return <DiHtml5 size={size} />;
    case 'node': return <DiNodejsSmall size={size} />;
    case 'mongodb': return <DiMongodb size={size} />;
    case 'mysql': return <DiMysql size={size} />;
    case 'bootstrap': return <DiBootstrap size={size} />;
    case 'github': return <DiGithubBadge size={size} />;
    case 'flutter': return <SiFlutter size={size} />;
    case 'dart': return <SiDart size={size} />;
    case 'spring': return <SiSpring size={size} />;
    case 'c': return <SiC size={size} />;
    case 'cpp': return <SiCplusplus size={size} />;
    case 'csharp': return <SiCsharp size={size} />;
    case 'php': return <SiPhp size={size} />;
    case 'figma': return <SiFigma size={size} />;
    case 'postman': return <SiPostman size={size} />;
    default: return <FiCode size={size} />;
  }
};

const SkillCard = ({ skill, index, categoryIndex }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        delay: 0.05 * index + (categoryIndex * 0.2),
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 95%"
        }
      }
    );
  }, [index, categoryIndex]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="grid-item flex flex-col items-center justify-center py-6 text-center"
    >
      <div className="text-4xl mb-4 text-primary-400">
        {getSkillIcon(skill.icon, 40)}
      </div>
      <h3 className="font-medium text-white mb-2">{skill.name}</h3>
      
      {/* Progress bar */}
      <div className="w-full bg-primary-800/50 rounded-full h-1.5 mb-1">
        <div 
          className="bg-gradient-to-r from-primary-600 to-accent-500 h-1.5 rounded-full"
          style={{ width: `${skill.proficiency}%` }}
        ></div>
      </div>
      <span className="text-xs text-primary-400">{skill.proficiency}%</span>
    </motion.div>
  );
};

export default SkillCard;