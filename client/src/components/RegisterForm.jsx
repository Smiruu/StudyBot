import React, { useState } from 'react';
import { Mail, Lock, User, CheckSquare, Square } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';  
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    agreedToTerms: false
  });
  
  const navigate = useNavigate();
  const {register} = useAuth()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData.username, formData.email, formData.password);
    if (result && result.success) {
      navigate(`/verify/${formData.email}`);
    }
  };

  return (
    <div className="w-full lg:w-[45%] bg-[#121114] flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 py-16 relative min-h-screen">
      <div className="w-full max-w-md anim-slide-up-delayed">
        
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create an account</h2>
        <p className="text-sm text-gray-400 mb-8">Enter your details to start your free trial.</p>

                <div className="flex gap-4 w-full mb-8">
          <button type="button" className="flex-1 h-12 bg-transparent border border-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors text-white font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button type="button" className="flex-1 h-12 bg-transparent border border-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors text-white font-medium">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
               <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.86 3.46-.8 2.14.03 3.16 1.12 3.46 1.44-2.54 1.34-2.14 4.54.4 5.39-1.28 2.85-2.92 5.06-2.4 6.14M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/>
            </svg>
            Apple
          </button>
        </div>

                <div className="relative flex items-center mb-8">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-semibold tracking-wider uppercase">Or continue with email</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <User size={18} />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                required
              />
            </div>
          </div>

                    <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                required
              />
            </div>
          </div>

                    <div className="flex flex-col mb-2">
            <label className="text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                required
              />
            </div>
          </div>

                    <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500"
                required
              />
            </div>
            <div className="ml-2 text-sm">
              <label htmlFor="terms" className="text-gray-400">
                I agree to the <a href="#" className="text-gray-300 hover:text-white underline">Terms of Service</a> and <a href="#" className="text-gray-300 hover:text-white underline">Privacy Policy</a>.
              </label>
            </div>
          </div>

                    <button
            type="submit"
            className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 font-semibold py-3 px-4 rounded-xl transition-colors mt-2"
          >
            Create Account
          </button>
        </form>

                <p className="text-center text-sm text-gray-400 mt-8">
          Already have an account? <Link to="/login" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
