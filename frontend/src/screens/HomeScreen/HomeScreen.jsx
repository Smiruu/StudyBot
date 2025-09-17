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
        <aside className="left">
          <h1 id="waveText" className="hero-title">
            Welcome to StudyBot
          </h1>
          <p className="hero-subtitle">
            Study smarter with AI tools that simplify learning and keep you on track.
          </p>
          <Link to="/login" className="hs-button">
            Get Started
          </Link>
        </aside>

        {/* Right (scrolling content) */}
        <main className="right">
          <div className="block">Feature 1</div>
          <div className="block">Feature 2</div>
          <div className="block">Feature 3</div>
          <div className="block">Feature 4</div>
        </main>
      </section>

      {/* Next sections */}
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
