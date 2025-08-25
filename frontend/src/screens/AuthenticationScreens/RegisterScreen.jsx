import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/RegisterScreen.css";
import { useAuth } from "../../hooks/AuthHooks/userAuth";

const images = [
  "https://images.unsplash.com/photo-1552845108-5f775a2ccb9b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMG1vdW50YWlufGVufDB8fDB8fHww",
  "https://img.freepik.com/premium-photo/sunrise-uttarakhand-india-from-top-mount-chandrashila_1048944-25804373.jpg?semt=ais_hybrid&w=740&q=80",
  "https://images.unsplash.com/photo-1530273883449-aae8b023c196?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZSUyMG1vdW50YWlufGVufDB8fDB8fHww"
];

const RegisterScreen = () => {
  const { register, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [validationError, setValidationError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    setValidationError(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setValidationError(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const { name, email, password } = formData;
      await register(name, email, password);
      navigate('/verify')
    }
  };

    // This for the carousel ahihi
    const [current, setCurrent] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 4000); // change pictures every 4 seconds
      return () => clearInterval(interval);
    }, []);

  return (
    <div className="register-background">
      <div className="register-split-screen">
            <div className="register-left-container">
              <div className="register-image-container">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`slide-${index}`}
                    className={`carousel-image ${index === current ? "active" : ""}`}
                  />
                ))}

                {/* Overlay content */}
                <div className="carousel-overlay">
                  <h2 className="overlay-title">StudyBot</h2>
                  <button className="carousel-btn" onClick={() => navigate('/')}>← Back to Website</button>
                  <p className="overlay-subtitle">Boost your learning with AI-powered tools</p>
                </div>

                <div className="carousel-indicators">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`indicator ${index === current ? "active" : ""}`}
                      onClick={() => setCurrent(index)}  // clickable to jump to that image
                    ></span>
                  ))}
                </div>

              </div>
          </div>

          <div className="register-right-container">

          <div className="register-container">
            <div className="register-line1"></div>
            <h2 className="register-title">Create Account</h2>
            <p className="register-subtitle">Join us today</p>

            {error && <p className="register-error">{error}</p>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="register-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="register-input"
                />
                {validationError.name && (
                  <p className="register-error-text">{validationError.name}</p>
                )}
              </div>

              <div className="register-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  className="register-input"
                />
                {validationError.email && (
                  <p className="register-error-text">{validationError.email}</p>
                )}
              </div>

              <div className="register-form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="register-input"
                />
                {validationError.password && (
                  <p className="register-error-text">{validationError.password}</p>
                )}
              </div>

              <div className="register-form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="register-input"
                />
                {validationError.confirmPassword && (
                  <p className="register-error-text">{validationError.confirmPassword}</p>
                )}
              </div>

              <button type="submit" disabled={isLoading} className="register-button">
                {isLoading ? 'Creating account...' : 'Register'}
              </button>
            </form>

            <p className="register-footer">
              Already have an account?{" "}
              <a href="/login" className="register-link">
                Login here
              </a>
            </p>

            <div className="register-line2"></div>

          </div>
        </div>
    </div>
    </div>
  );
};

export default RegisterScreen;