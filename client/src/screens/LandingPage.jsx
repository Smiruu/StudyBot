import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#FDCF11] selection:text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-6 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">StudyBot</div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-200">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-sm font-medium text-white hover:text-gray-200 transition-colors hidden sm:block">
            Log In
          </Link>
          <Link to="/login" className="bg-[#1A1821] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row max-w-7xl mx-auto px-8 md:px-16 pt-10 pb-20 gap-12 lg:gap-8">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-extrabold text-white mb-6 leading-[1.1] transform -rotate-2 origin-left" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.8), 4px 4px 0px rgba(0,0,0,0.6), 6px 6px 0px rgba(0,0,0,0.4)' }}>
            Your AI<br/>partner<br/>for effortless<br/>learning.
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-md font-medium">
            Study smarter with AI tools that simplify learning and keep you on track.
          </p>
          <Link to="/login" className="bg-[#1A1821] text-white px-8 py-3.5 rounded-full font-medium w-max hover:bg-black transition-all hover:scale-105 shadow-lg block text-center">
            Get Started Now!
          </Link>
        </div>

        {/* Right: Bento Grid */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          
          {/* Top Wide Card */}
          <img src="/LandingPage/Feature1.png" alt="Feature 1" className="w-full h-auto rounded-[2rem] shadow-xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300" />

          {/* Bottom Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <img src="/LandingPage/Feature2.png" alt="Feature 2" className="w-full h-auto rounded-[2rem] shadow-xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300" />
              <img src="/LandingPage/Feature4.png" alt="Feature 4" className="w-full h-auto rounded-[2rem] shadow-xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300" />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
               <img src="/LandingPage/Feature3.png" alt="Feature 3" className="w-full h-auto rounded-[2rem] shadow-xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300" />
               <img src="/LandingPage/Feature5.png" alt="Feature 5" className="w-full h-auto rounded-[2rem] shadow-xl hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300" />
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1821] text-white py-10 px-8 md:px-16 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-xl font-bold tracking-tight">StudyBot</div>
            <div className="text-gray-400 text-sm">© 2024 StudyBot AI. Empowering lifelong learners everywhere.</div>
          </div>
          <div className="flex gap-6 text-sm text-gray-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
