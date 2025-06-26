import React from "react";

function HeroSection() {
  return (
    <section className="bg-hero-gradient text-white py-20 text-center animate-gradient-x">
      <img
        src="/assets/profile.jpg"
        alt="Profile"
        className="mx-auto mb-6 w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover animate-float"
      />
      <h1 className="text-5xl font-extrabold mb-2 gradient-text">
        Dinidu Liyanage
      </h1>
      <p className="text-xl mb-6 text-primary-100 font-medium">
        Full Stack Developer | Student | Creator
      </p>
      <a
        href="/assets/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-primary-500 via-accent-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
      >
        Download Resume
      </a>
      <div className="mt-10 space-x-4">
        <span className="text-emerald-400 text-3xl">●</span>
        <span className="text-pink-400 text-3xl">●</span>
        <span className="text-yellow-400 text-3xl">●</span>
      </div>
    </section>
  );
}

export default HeroSection;