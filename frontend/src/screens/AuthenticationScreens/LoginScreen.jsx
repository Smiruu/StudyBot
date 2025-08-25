import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LoginScreen.css";
import { useAuth } from "../../hooks/AuthHooks/userAuth";

const images = [
  "https://images.unsplash.com/photo-1552845108-5f775a2ccb9b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMG1vdW50YWlufGVufDB8fDB8fHww",
  "https://img.freepik.com/premium-photo/sunrise-uttarakhand-india-from-top-mount-chandrashila_1048944-25804373.jpg?semt=ais_hybrid&w=740&q=80",
  "https://images.unsplash.com/photo-1530273883449-aae8b023c196?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZSUyMG1vdW50YWlufGVufDB8fDB8fHww"
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
          
        <div className="login-right-container">

          <div className="login-container">
               <div className="login-line1"></div>
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Login to your account</p>

            {error && <p className="login-error">{error}</p>}


            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  autoComplete="off"
                  className="login-input"
                  required
                ></input>
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
                          <p p className="login-footer">
              Don't have an account?{" "}
              <a href="/register" className="login-link">
                Register here
              </a>
            </p>
            </form>
           <div className="login-line2"></div>

          </div>
          </div>
      </div>
    </div>
  );
};

export default LoginScreen;
