import React from 'react';
import { Bot, Layers, Zap, ArrowLeft } from 'lucide-react';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex w-full relative anim-full-page-slide overflow-hidden">
      
      <Link to="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-black/20 hover:bg-black/40 border border-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
         <ArrowLeft size={20} />
         <span className="font-medium text-sm">Back</span>
      </Link>

            <div className="hidden lg:flex lg:w-[55%] flex-col justify-center px-12 xl:px-24 py-16 relative">
        <div className="max-w-xl anim-slide-up-delayed">
                    <div className="mb-16">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-white">StudyBot</span>
            </h1>
          </div>

                    <h1 className="text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Start your journey <br />
            to <span className="text-teal-400">high-velocity</span> <br />
            learning
          </h1>
          
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            Join thousands of students leveraging the power of AI to master any subject in record time.
          </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#312e4b] flex items-center justify-center text-purple-400">
                <Bot size={24} />
              </div>
              <span className="text-gray-300 font-medium">Personalized AI Tutors</span>
            </div>
            
                        <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1d3d41] flex items-center justify-center text-teal-400">
                <Layers size={24} />
              </div>
              <span className="text-gray-300 font-medium">Smart Flashcards</span>
            </div>
            
                        <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#4a3e20] flex items-center justify-center text-yellow-500">
                <Zap size={24} />
              </div>
              <span className="text-gray-300 font-medium">Instant Summaries</span>
            </div>
          </div>
        </div>
      </div>

            <RegisterForm />
    </div>
  );
};

export default RegisterPage;
