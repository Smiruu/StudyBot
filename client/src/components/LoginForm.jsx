import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isAuthenticated, isLoading, error } = useAuth();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <form className="flex flex-col gap-5 w-full mt-8" onSubmit={handleSubmit}>

            <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-white">Email Address</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-white transition-colors">
            <Mail size={20} />
          </div>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#1A1821] border border-gray-700 text-white text-sm rounded-xl py-3 pl-11 pr-4 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all placeholder:text-gray-500"
          />
        </div>
      </div>

            <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-white">Password</label>
          <a href="#" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">Forgot Password?</a>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-white transition-colors">
            <Lock size={20} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1A1821] border border-gray-700 text-white text-sm rounded-xl py-3 pl-11 pr-12 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all placeholder:text-gray-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-xl flex items-center gap-2 mt-2 animate-shake">
          <AlertCircle size={20} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <button className="w-full bg-[#FDCF11] text-black font-bold text-sm py-3 rounded-xl mt-4 hover:bg-[#e5bb0f] transition-colors shadow-[0px_0px_15px_rgba(253,207,17,0.3)]"
        disabled={isLoading}>
        {isLoading ? 'Signing In... ' : 'Sign In'}
      </button>

      <p className="text-center text-sm text-gray-400 mt-10">
        Don't have an account? <a href="/register" className="text-[#2DD4BF] hover:underline font-semibold">Sign Up</a>
      </p>

    </form>
  );
};

export default LoginForm;
