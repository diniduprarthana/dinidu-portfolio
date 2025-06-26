// This file contains all the data for your portfolio
export const personalInfo = {
  name: "Dinidu Liyanage",
  title: "IT UNDERGRADUATE | TECH ENTHUSIAST | PROJECT LEADER | DIGITAL DESIGNER & INNOVATOR | UI/UX DESIGNER | CONTENT CREATOR | WEB DESIGNER | FRONTEND DEVELOPER | FULL STACK DEVELOPER",
  about: "Third-year undergraduate student in the Faculty of Information Technology with a proven track record of leading team projects and developing technical solutions. Proficient in Web design, full stack development, UI/UX design, graphic designing, and video production, with strong technical skills in modern programming frameworks and tools. Recognized for creative problem-solving and leadership in collaborative settings.",
  quote: "\"Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.\" - Albert Schweitzer",
  resume: "/assets/resume.pdf", // Path to your resume file
  profile: "/assets/profile.jpg", // Path to your profile picture
  email: "dinidu288@gmail.com",
  linkedin: "https://www.linkedin.com/in/diniduliyanage/",
  behance: "https://www.behance.net/diniduliyanage1"
};

export const education = [
  {
    degree: "Bachelor of Information Technology (Undergraduate)",
    institution: "University",
    year: "2023 - Present",
    description: "Currently pursuing a Bachelor's degree in Information Technology."
  },
  {
    degree: "GCE Advanced Level Engineering Technology Stream",
    institution: "Peradeniya Central College",
    year: "2021",
    description: "Completed A/L examinations in Engineering Technology stream."
  },
  {
    degree: "GCE Ordinary Level",
    institution: "Wickramabahu National School",
    year: "2019",
    description: "Completed O/L examinations."
  }
];

export const achievements = [
  {
    title: "CODECON Inter-University Hackathon",
    year: "2023",
    description: "Recognized for innovative solutions in development."
  },
  {
    title: "\"Sustainable Synergy\" Digital Poster Competition",
    year: "2024",
    description: "Awarded for outstanding Sustainable Development Goals poster design."
  }
];

export const services = [
  {
    title: "Frontend Development",
    icon: "code", // Will be mapped to a React Icon
    description: "Creating responsive and interactive user interfaces with modern JavaScript frameworks.",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Tailwind"]
  },
  {
    title: "UX/UI Design",
    icon: "design", // Will be mapped to a React Icon
    description: "Designing intuitive and visually appealing user interfaces for web and mobile applications.",
    technologies: ["Figma", "Adobe XD", "Sketch"]
  },
  {
    title: "Mobile Development",
    icon: "mobile", // Will be mapped to a React Icon
    description: "Building cross-platform mobile applications with modern frameworks.",
    technologies: ["Flutter", "React Native", "Kotlin"]
  },
  {
    title: "Video Editing",
    icon: "video", // Will be mapped to a React Icon
    description: "Creating and editing professional videos for various purposes.",
    technologies: ["Adobe Premiere Pro", "After Effects"]
  },
  {
    title: "Graphic Designing",
    icon: "palette", // Will be mapped to a React Icon
    description: "Designing creative and professional graphics for digital and print media.",
    technologies: ["Photoshop", "Illustrator", "InDesign"]
  },
  {
    title: "Video Graphy & Photography",
    icon: "camera", // Will be mapped to a React Icon
    description: "Capturing professional photos and videos for various occasions.",
    technologies: ["DSLR", "Drone", "Lighting"]
  }
];

export const projects = [
  {
    title: "Online Educational Gaming System",
    description: "An interactive gaming platform designed to make learning fun and engaging. Features include customizable quiz games, progress tracking, and educational content aligned with school curricula.",
    image: "/assets/project1.png", // Updated with proper path
    category: "Web Development",
    technologies: ["JavaScript", "PHP", "MySQL", "HTML", "CSS"],
    year: "2024",
    role: "Team Leader",
    demoLink: "https://edu-gaming.example.com",
    codeLink: "https://github.com/diniduprarthana/edu-gaming",
    features: [
      "Interactive learning games",
      "Student progress tracking",
      "Customizable educational content"
    ]
  },
  {
    title: "E-Channelling System",
    description: "A comprehensive web-based platform for booking medical appointments with doctors, managing patient records, and streamlining healthcare services.",
    image: "/assets/project2.png", // Updated with proper path
    category: "Web Application",
    technologies: ["JSP", "JavaScript", "MySQL", "HTML", "CSS"],
    year: "2023",
    role: "Developer",
    demoLink: "https://echannelling.example.com",
    codeLink: "https://github.com/diniduprarthana/echannelling",
    features: [
      "Online doctor appointment booking",
      "Patient history management",
      "Automated notification system"
    ]
  },
  {
    title: "Tour Management System",
    description: "A comprehensive system for managing tours and travel packages, including booking, itinerary planning, and customer management with advanced reporting features.",
    image: "/assets/project3.png", // Updated with proper path
    category: "Enterprise Solution",
    technologies: ["React.js", "MongoDB", "Node.js", "Express.js", "Bootstrap"],
    year: "2024",
    role: "Team Leader",
    demoLink: "https://tour-management.example.com",
    codeLink: "https://github.com/diniduprarthana/tour-management",
    features: [
      "Tour package customization",
      "Booking management system",
      "Real-time availability checking"
    ]
  },
  {
    title: "Online News App",
    description: "A feature-rich mobile application for reading news articles from various sources, with personalized content recommendations and offline reading capability.",
    image: "/assets/project4.png", // Updated with proper path
    category: "Mobile App",
    technologies: ["Figma", "Kotlin"],
    year: "2023",
    role: "UI/UX Designer & Developer",
    demoLink: "https://play.google.com/store/apps/example-news",
    codeLink: "https://github.com/diniduprarthana/news-app",
    features: [
      "Personalized news feed",
      "Offline reading mode",
      "Content categorization"
    ]
  },
  {
    title: "Smart Home Stock Management System",
    description: "A mobile application for tracking household inventory, managing grocery lists, and optimizing home storage with expiration date alerts.",
    image: "/assets/project5.png", // Updated with proper path
    category: "Mobile App",
    technologies: ["Flutter", "Dart"],
    year: "2023",
    role: "Frontend Developer & Feature Designer",
    demoLink: "https://home-stock.example.com",
    codeLink: "https://github.com/diniduprarthana/home-stock",
    features: [
      "Barcode scanning for quick item entry",
      "Expiration date tracking",
      "Automated shopping list generation"
    ]
  },
  {
    title: "Study & Learning Platform for Cooking",
    description: "An educational platform for learning cooking skills through interactive tutorials, video content, and a community-driven recipe exchange system.",
    image: "/assets/project6.png", // Updated with proper path
    category: "Web Application",
    technologies: ["Java", "Spring Boot"],
    year: "2022",
    role: "Developer",
    demoLink: "https://cooking-school.example.com",
    codeLink: "https://github.com/diniduprarthana/cooking-platform",
    features: [
      "Interactive cooking tutorials",
      "Recipe sharing community",
      "Progress tracking for learners"
    ]
  }
];

export const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "JavaScript", proficiency: 90, icon: "js" },
      { name: "Java", proficiency: 85, icon: "java" },
      { name: "Python", proficiency: 80, icon: "python" },
      { name: "C", proficiency: 75, icon: "c" },
      { name: "C++", proficiency: 75, icon: "cpp" },
      { name: "C#", proficiency: 70, icon: "csharp" },
      { name: "PHP", proficiency: 80, icon: "php" },
      { name: "HTML", proficiency: 95, icon: "html" },
      { name: "CSS", proficiency: 90, icon: "css" },
      { name: "SQL", proficiency: 85, icon: "sql" }
    ]
  },
  {
    category: "Technologies & Frameworks",
    items: [
      { name: "React.js", proficiency: 90, icon: "react" },
      { name: "Node.js", proficiency: 85, icon: "node" },
      { name: "Express.js", proficiency: 80, icon: "express" },
      { name: "MongoDB", proficiency: 80, icon: "mongodb" },
      { name: "MySQL", proficiency: 85, icon: "mysql" },
      { name: "Bootstrap", proficiency: 90, icon: "bootstrap" },
      { name: "Flutter", proficiency: 75, icon: "flutter" },
      { name: "Dart", proficiency: 75, icon: "dart" },
      { name: "Spring Boot", proficiency: 70, icon: "spring" }
    ]
  },  
  {
    category: "Tools",
    items: [
      { name: "GitHub", proficiency: 90, icon: "github" },
      { name: "VS Code", proficiency: 95, icon: "vscode" },
      { name: "IntelliJ IDEA", proficiency: 85, icon: "intellij" },
      { name: "Eclipse", proficiency: 80, icon: "eclipse" },
      { name: "Android Studio", proficiency: 85, icon: "android" },
      { name: "Figma", proficiency: 90, icon: "figma" },
      { name: "Postman", proficiency: 85, icon: "postman" }
    ]
  },
  {
    category: "Creative Tools",
    items: [
      {
        name: "Adobe Premiere Pro",
        icon: "premiere",
        proficiency: 85
      },
      {
        name: "Adobe After Effects",
        icon: "aftereffects",
        proficiency: 80
      },
      {
        name: "DaVinci Resolve",
        icon: "davinci",
        proficiency: 75
      },
      {
        name: "Adobe Photoshop",
        icon: "photoshop", 
        proficiency: 90
      },
      {
        name: "Adobe Lightroom",
        icon: "lightroom",
        proficiency: 82
      },
      {
        name: "Adobe Illustrator",
        icon: "illustrator",
        proficiency: 78
      },
      {
        name: "Canva",
        icon: "canva",
        proficiency: 95
      }
    ]
  }
];

export const references = [
  {
    name: "Mrs. K. R. C. Koswatte",
    role: "Lecturer / Manager Academic Affairs (SLIIT)",
    email: "chathurika.k@sliit.lk",
    rating: 5,
    description: "Dinidu has consistently demonstrated exceptional skills in web development and project management. His attention to detail and creative approach to problem-solving makes him stand out among his peers."
  },
  {
    name: "Mrs. Yogi Rathnayake",
    role: "Technical Lead, HALEON Pvt Ltd",
    email: "yogi.n.rathnayake@haleon.com",
    rating: 5,
    description: "Working with Dinidu was a pleasure. He brings both technical expertise and creative thinking to every project. His ability to lead teams and deliver results on time is impressive."
  }
];