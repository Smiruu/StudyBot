import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LoginScreen.css";
import { useAuth } from "../../store/userAuth";

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

  return (
    <div className="login-container">
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

        <button disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      </form>

      <p className="login-footer">
        Don't have an account?{" "}
        <a href="/register" className="login-link">
          Register here
        </a>
      </p>
    </div>
  );
};

export default LoginScreen;
