import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHooks/userAuth";
import "./css/LoginScreen.css";

const images = [
  "https://images.unsplash.com/photo-1552845108-5f775a2ccb9b?fm=jpg&q=60&w=3000",
  "https://img.freepik.com/premium-photo/sunrise-uttarakhand-india-from-top-mount-chandrashila_1048944-25804373.jpg?w=740&q=80",
  "https://images.unsplash.com/photo-1530273883449-aae8b023c196?fm=jpg&q=60&w=3000",
];

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { sendReset } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    try {
      await sendReset(email);
      setSuccess("Reset link sent! Check your inbox.");
      setError("");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      setSuccess("");
    }
  };

  // carousel
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-background">
      <div className="split-screen">
        {/* Left side carousel */}
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

            {/* Overlay */}
            <div className="carousel-overlay">
              <h2 className="overlay-title">StudyBot</h2>
              <button
                className="carousel-btn"
                onClick={() => navigate("/")}
              >
                ← Back to Website
              </button>
              <p className="overlay-subtitle">Boost your learning with AI-powered tools</p>
            </div>

            <div className="carousel-indicators">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${index === current ? "active" : ""}`}
                  onClick={() => setCurrent(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side forgot password form */}
        <div className="login-right-container">
          <div className="login-container">
            <div className="login-line1 mb-12"></div>
            <h2 className="login-title">Forgot Password?</h2>
            <p className="login-subtitle">We'll send you a reset link</p>

            {error && <p className="login-error">{error}</p>}
            {success && <p style={{ color: "lightgreen", textAlign: "center" }}>{success}</p>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="studybot@example.com"
                  className="login-input"
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Send Reset Link
              </button>
            </form>

            <p className="login-footer">
              Remembered your password?{" "}
              <Link to="/login" className="login-link">
                Back to Login
              </Link>
            </p>

            <div className="login-line2 mt-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
