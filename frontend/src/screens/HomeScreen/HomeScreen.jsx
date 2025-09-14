import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/HomeScreen.css";
import Navbar from "../../component/NavbarComponents/Navbar.jsx";

const HomeScreen = () => {
  useEffect(() => {
    const applyWaveAnimation = (id) => {
      const element = document.getElementById(id);
      const text = element.textContent;
      element.textContent = "";
      element.classList.add("wave");

      text.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animationDelay = `${i * 0.025}s`;
        element.appendChild(span);
      });
    };

    applyWaveAnimation("waveText");
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <section className="section1">
          <div>
            <h1 className="section1-text" id="waveText">
              Welcome to StudyBot
            </h1>
            <p className="section1-text2">
              Study smarter with AI tools that simplify learning and keep you on track.
            </p>
            <div className="section1-carousel">
              <h1>feature1</h1>
              <h1>feature2</h1>
              <h1>feature3</h1>
              <h1>feature4</h1>
            </div>
          </div>
        </section>
        <section className="section2">
          <h1 className="h1">reviews from imaginary students/users</h1>
        </section>
        <section className="section3">
          <h1 className="h1">tbh idk</h1>
        </section>
      </div>
    </>
  );
};

export default HomeScreen;
