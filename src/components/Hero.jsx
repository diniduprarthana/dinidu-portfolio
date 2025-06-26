<section className="min-h-screen flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 bg-primary-950 relative">
  <div className="max-w-5xl mx-auto space-y-8">
    {/* Intro text with more spacing */}
    <div className="space-y-4">
      <h2 className="text-accent-400 text-xl md:text-2xl font-medium">Hello, I'm</h2>
      <h1 className="text-5xl md:text-7xl font-bold text-white">Dinidu Liyanage</h1>
      <p className="text-2xl md:text-3xl text-primary-300 font-medium mt-4">Project</p>
    </div>
    
    {/* Description with better vertical spacing */}
    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mt-8">
      Passionate about creating digital experiences that are both functional 
      and visually appealing. Specializing in web development, UI/UX design, 
      and innovative digital solutions.
    </p>
    
    {/* Buttons with proper spacing and consistent styling */}
    <div className="flex flex-wrap gap-6 mt-10">
      <a
        href="#projects"
        className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 text-lg focus:outline-none focus:ring-2 focus:ring-accent-400"
      >
        View Projects <span className="ml-2">→</span>
      </a>
      
      <a
        href="/assets/cv.pdf"
        download
        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-800 to-primary-700 text-white font-semibold px-8 py-3 rounded-lg border-2 border-accent-500 hover:bg-accent-500 hover:text-white hover:border-accent-400 shadow-lg transition-all duration-300 text-lg focus:outline-none focus:ring-2 focus:ring-accent-400"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
        Download CV
      </a>
    </div>
  </div>
  
  {/* Scroll down indicator with more space above */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
    <p className="text-gray-400 mb-2">Scroll Down</p>
    <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex justify-center">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-float mt-2"></div>
    </div>
  </div>
</section>