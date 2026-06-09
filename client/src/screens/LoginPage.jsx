import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex text-white font-sans selection:bg-[#FDCF11] selection:text-black">
      
      {/* Left Side: Presentation */}
      <section className="hidden lg:flex lg:w-[60%] relative flex-col justify-center p-16 overflow-hidden bg-[#584D78] anim-fade-in">
        {/* Animated Background */}

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl anim-slide-up">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-6">
            Welcome back to your <span className="text-[#FDCF11]">AI learning partner</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-lg mb-12 font-medium">
            Reignite your academic momentum with personalized AI-driven study sessions designed for high-velocity learning.
          </p>

          {/* Decorative Bento Elements */}
          <div className="grid grid-cols-2 gap-4 opacity-80 max-w-xl">
            <div className="bg-[#1A1821]/40 border border-white/5 backdrop-blur-md p-5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#2DD4BF]/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#2DD4BF]">psychology</span>
              </div>
              <div>
                <p className="font-bold text-sm">Smart Recall</p>
                <p className="text-xs text-gray-400 mt-0.5">Active learning cycles</p>
              </div>
            </div>

            <div className="bg-[#1A1821]/40 border border-white/5 backdrop-blur-md p-5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#a78bfa]/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#a78bfa]">auto_stories</span>
              </div>
              <div>
                <p className="font-bold text-sm">Instant Summaries</p>
                <p className="text-xs text-gray-400 mt-0.5">Textbooks condensed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Form */}
      <div className="w-full lg:w-[45%] bg-[#121114] flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 py-16 relative">
        <div className="w-full max-w-sm anim-slide-up-delayed">
          
          <h2 className="text-3xl font-extrabold mb-2 font-serif tracking-tight">Sign In</h2>
          <p className="text-sm text-gray-400 mb-8">Enter your details to continue your journey.</p>

          {/* Social Logins */}
          <div className="flex gap-4 w-full mb-8">
            <button className="flex-1 h-12 bg-transparent border border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                {/* Simplified Google 'G' icon for placeholder */}
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z" />
              </svg>
            </button>
            <button className="flex-1 h-12 bg-transparent border border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px bg-gray-800 flex-1"></div>
            <span className="text-xs text-gray-500 font-medium tracking-wider">OR CONTINUE WITH EMAIL</span>
            <div className="h-px bg-gray-800 flex-1"></div>
          </div>

          {/* Render Form Component */}
          <LoginForm />

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
