import React, { useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/authContext';

const VerifyPage = () => {  
  const { email } = useParams();
  const { verify, isLoading, error } = useAuth();

  const [otp, setOtp] = useState(new Array(8).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.value !== "") {
      if (index < 7 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 8).replace(/\D/g, '');
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const focusIndex = pastedData.length < 8 ? pastedData.length : 7;
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    await verify(email, code);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 selection:bg-[#FDCF11] selection:text-black anim-fade-in relative overflow-hidden text-white font-sans">

      <div className="w-full max-w-md bg-[#1F1D2B] rounded-2xl shadow-2xl p-10 flex flex-col items-center border border-white/5 relative z-10 anim-slide-up">
        
                <h2 className="text-xl font-bold text-white mb-8 tracking-tight">StudyBot</h2>
        
        <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight text-center">Verify your email</h1>
        <p className="text-gray-400 text-center text-sm mb-10 max-w-[280px]">
          We've sent a 8-digit code to your email. Enter it below to activate your account.
        </p>

                <form onSubmit={handleVerify} className="w-full flex flex-col items-center">
          
          <div className="flex gap-2 justify-center w-full mb-10" onPaste={handlePaste}>
            {otp.map((data, index) => {
              return (
                <input
                  className="w-10 h-12 bg-[#141316] border border-gray-700 rounded-lg text-center text-xl text-white font-semibold focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] outline-none transition-colors"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(ref) => inputRefs.current[index] = ref}
                />
              );
            })}
          </div>

          {error && (
            <div className="w-full bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-xl flex items-center gap-2 mb-4">
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 font-bold py-3 px-4 rounded-xl transition-all hover:scale-[1.02] shadow-[0px_0px_15px_rgba(253,207,17,0.2)] mb-8 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? 'Verifying...' : 'Verify Account'}
          </button>

          <p className="text-sm text-gray-400 mb-8">
            Didn't receive a code? <button type="button" className="text-[#fbbf24] font-semibold hover:text-[#f59e0b] transition-colors ml-1">Resend Code</button>
          </p>

          <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
          
        </form>
      </div>

            <div className="absolute bottom-8 text-xs text-gray-500 text-center w-full">
        © 2024 StudyBot AI. Empowering lifelong learners everywhere.
      </div>
    </div>
  );
};

export default VerifyPage;
