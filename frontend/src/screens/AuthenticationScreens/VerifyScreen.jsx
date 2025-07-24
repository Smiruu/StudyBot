import React, { useState } from 'react';
import { useAuth } from "../../store/userAuth.js";
import { useNavigate } from "react-router-dom";
import './css/VerifyScreen.css';

function VerifyScreen() {
    const [digits, setDigits] = useState(['', '', '', '', '']);
    const [err, setError] = useState('');
    const { verify, isLoading, error, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const handleDigitChange = (index, value) => {
        // Only allow numbers and empty string
        if (value === '' || /^[0-9]$/.test(value)) {
            const newDigits = [...digits];
            newDigits[index] = value;
            setDigits(newDigits);
            setError('');
            
            if (value && index < 4) {
                document.getElementById(`digit-${index + 1}`).focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = digits.join('');
        
        if (verificationCode.length !== 5) {
            setError('Please enter a 6-digit code');
            return;
        }
        try {
            await verify(verificationCode);
            // or wherever you want to redirect after verification
        } catch (error) {
            setError("Invalid Code")
        }
    };

    if(isAuthenticated){
        navigate("/login")
    }

    const handleResendCode = () => {
        console.log('Resend code requested');
        // Here you would typically trigger a code resend
        // You might want to add this to your useAuth hook
    };

    return (
        <div className="verification-container">
            <h2 className="verification-title">Verify Your Account</h2>
            <p className="verification-subtitle">
                We've sent a 5-digit code to your email
            </p>
            
            {error && <p className="verification-error">{error}</p>}
            {err && <p className="verification-error">{err}</p>}
            
            <form className="verification-form" onSubmit={handleSubmit}>
                <div className="verification-form-group">
                    <label>Verification Code</label>
                    <div className="verification-code-inputs">
                        {digits.map((digit, index) => (
                            <input
                                id={`digit-${index}`}
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                className="verification-digit"
                                disabled={isLoading}
                            />
                        ))}
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    className="verification-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
            </form>
            
            <div className="verification-footer">
                <p>Didn't receive a code?</p>
                <button 
                    onClick={handleResendCode}
                    className="verification-resend"
                    disabled={isLoading}
                >
                    Resend Code
                </button>
            </div>
        </div>
    );
}

export default VerifyScreen;