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
          <h1>Welcome to StudyBot </h1>
          <button>get started</button>
          <h1>feature1</h1>
          <h1>feature2</h1>
          <h1>feature3</h1>
          <h1>feature4</h1> 
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
