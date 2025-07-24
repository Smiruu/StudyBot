import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LoginScreen.css"; // Reusing the same CSS file
import { useAuth } from "../../store/userAuth";

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

  return (
    <div className="login-container">
      <h2 className="login-title">Create Account</h2>
      <p className="login-subtitle">Join us today</p>

      {error && <p className="login-error">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="login-input"
          />
          {validationError.name && (
            <p className="login-error-text">{validationError.name}</p>
          )}
        </div>

        <div className="login-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@example.com"
            className="login-input"
          />
          {validationError.email && (
            <p className="login-error-text">{validationError.email}</p>
          )}
        </div>

        <div className="login-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="login-input"
          />
          {validationError.password && (
            <p className="login-error-text">{validationError.password}</p>
          )}
        </div>

        <div className="login-form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="login-input"
          />
          {validationError.confirmPassword && (
            <p className="login-error-text">{validationError.confirmPassword}</p>
          )}
        </div>

        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="login-footer">
        Already have an account?{" "}
        <a href="/login" className="login-link">
          Login here
        </a>
      </p>
    </div>
  );
};

export default RegisterScreen;