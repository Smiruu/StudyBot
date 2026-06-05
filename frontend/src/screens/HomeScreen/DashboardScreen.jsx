
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./css/DashboardScreen.css";
import {useAuth} from "../../hooks/AuthHooks/userAuth.js"
import { useNavigate } from "react-router-dom";

const DashboardScreen = () => {
  const { user, accessToken, logout, isLoading } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>; // or a spinner
  }

  if (!accessToken || !user) {
    return null; 
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-title">Welcome back, {user?.username}!</h1>
        <p className="dashboard-subtitle">This is your StudyBot Dashboard</p>

        <div className="dashboard-stats"></div>

        <div className="buttons-group">
          <Link to="/courses" className="bg-green-600 hover:bg-green-700 hs-button">
            Go to Courses
          </Link>
          <Link to="/profile" className="bg-gray-700 hover:bg-gray-800 hs-button">
            Edit Profile
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
