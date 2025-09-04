import React from "react";
import { Link } from "react-router-dom";
import "./css/HomeScreen.css";

const HomeScreen = () => {
  return (
    <div>
    <section className="section1">
    <div>
      <h1>Welcome to StudyBot</h1>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>

    </div>
    </section>
    <section className="section2"></section>
    <section className="section3"></section>
    </div>
  )
};

export default HomeScreen;
