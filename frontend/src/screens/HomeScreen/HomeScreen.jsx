import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/HomeScreen.css";
import Navbar from "../../component/NavbarComponents/Navbar.jsx";

const HomeScreen = () => {
  useEffect(() => {
    const applyWaveAnimation = (id) => {
      const element = document.getElementById(id);
      if (!element) return;
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
      <section className="two-column">
        <div className="left">
          <h1 id="waveText" className="hero-title">
            The easiest way to turn notes into knowledge.
          </h1>
          <p className="hero-subtitle">
            Study smarter with AI tools that simplify learning and keep you on track.
          </p>
          <Link to="/login" className="hs-button bg-blue-600 hover:bg-blue-700">
            Get Started Now!
          </Link>
        </div>

        <main className="right">
          {/* <h2 className="features-title">Features</h2> */}
          <div className="features-grid">
            <div className="div1 feature-card">Personalized Study Plans</div>
            <div className="div2 feature-card">Smart Summaries</div>
            <div className="div3 feature-card">AI-powered Q&amp;A</div>
            <div className="div4 feature-card">random</div>
            <div className="div5 feature-card">random</div>
            <div className="div6 feature-card">random</div>
          </div>
        </main>
      </section>

      <section className="reviews">
        <h1>Reviews from imaginary students/users</h1>
      </section>

      <section className="misc">
        <h1>tbh idk</h1>
      </section>
    </>
  );
};

export default HomeScreen;
