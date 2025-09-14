import React from "react";
import { Link } from "react-router-dom";
import "./css/HomeScreen.css";
import Navbar from "../../component/NavbarComponents/Navbar.jsx";

const HomeScreen = () => {
  return (
    <>
    <Navbar /><div>
      <section className="section1">
          <div>
            <h1 className="section1-text">Welcome to StudyBot </h1>
            <p className="section1-text2">Study smarter with AI tools that simplify learning and keep you on track.</p>
            <button className="section1-button">get started</button>
            <div className="section1-carousel">
            <h1>feature1</h1>
            <h1>feature2</h1>
            <h1>feature3</h1>
            <h1>feature4</h1> 
          </div>
          {/* carousel features that are interactive like buttons */}
        </div>
      </section>
      <section className="section2">
        <h1 className="h1">reviews from imaginary students/users</h1>
      </section>
      <section className="section3">
        <h1 className="h1">tbh idk</h1>
      </section>
    </div></>
  )
};

export default HomeScreen;
