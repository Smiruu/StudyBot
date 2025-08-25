import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LoginScreen.css";
import { useAuth } from "../../hooks/AuthHooks/userAuth";

const images = [
  "https://png.pngtree.com/background/20250121/original/pngtree-mountains-in-a-morning-fog-layers-simple-light-blue-tones-white-picture-image_15801279.jpg",
  "https://preview.redd.it/usagi-is-not-even-fat-v0-5211hb4qecxe1.png?width=640&crop=smart&auto=webp&s=b8603d8de0049ae5cfbd40ed5991f50b0f348f0f",
  "https://www.joytify.com/blog/en-us/wp-content/uploads/2025/08/Seed-ZZZ-Build-Guide.jpg"
];

const LoginScreen = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {login, isLoading, error, isAuthenticated} = useAuth();
      
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    navigate('/dashboard')
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
    <div className="login-background">
      <div className="split-screen">
          <div className="login-left-container">
              <div className="login-image-container">
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
                  <h2>Welcome to StudyBot</h2>
                  <p>Boost your learning with AI-powered tools</p>
                  <button className="carousel-btn">Get Started</button>
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
          
        <div className="login-right-container">
          <div className="login-container">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Login to your account</p>
                        <p p className="login-footer">
              Don't have an account?{" "}
              <a href="/register" className="login-link">
                Register here
              </a>
            </p>

            {error && <p className="login-error">{error}</p>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="login-input"
                  required
                />
              </div>

              <div className="login-form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="login-input"
                  required
                />
              </div>

              <button className="login-button" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            </form>
            
          </div>
          </div>
      </div>
    </div>
  );
};

export default LoginScreen;
