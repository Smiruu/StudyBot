import React from "react";
import { Link } from "react-router-dom";
import "../screens/css/DashboardScreen.css";

const DashboardScreen = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "User" };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-title">Welcome back, {user.name}!</h1>
        <p className="dashboard-subtitle">This is your StudyBot Dashboard</p>

        <div className="dashboard-stats">
          <div className="stat-box" style={{ backgroundColor: "#dbeafe" }}>
            <h2 className="stat-title text-blue-700">3</h2>
            <p className="stat-sub text-blue-900">Active Courses</p>
          </div>
          <div className="stat-box" style={{ backgroundColor: "#d1fae5" }}>
            <h2 className="stat-title text-green-700">7</h2>
            <p className="stat-sub text-green-900">Quizzes Taken</p>
          </div>
          <div className="stat-box" style={{ backgroundColor: "#fef9c3" }}>
            <h2 className="stat-title text-yellow-700">92%</h2>
            <p className="stat-sub text-yellow-900">Average Score</p>
          </div>
        </div>

        <div className="buttons-group">
          <Link to="/courses" className="button btn-green">
            Go to Courses
          </Link>
          <Link to="/quizzes" className="button btn-blue">
            Take a Quiz
          </Link>
          <Link to="/profile" className="button btn-gray">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
