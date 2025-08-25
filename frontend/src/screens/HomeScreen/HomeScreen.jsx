import React from "react";
import { Link } from "react-router-dom";
import usagiImage from "./fatass-usagi.jpg";
import "./css/HomeScreen.css";

const HomeScreen = () => {
  return (
    <div>
      <h1>Welcome to StudyBot</h1>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      <img className="usagi-image" src={usagiImage} alt="StudyBot" />
    </div>
  );
};

export default HomeScreen;
