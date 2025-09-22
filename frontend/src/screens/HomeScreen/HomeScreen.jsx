import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/HomeScreen.css";
import Navbar from "../../component/NavbarComponents/Navbar.jsx";

const HomeScreen = () => {

  return (
    <>
      <Navbar />
      <section className="two-column">
        <div className="left">
          <h1 className="hero-title">
            Your AI partner for effortless learning.
          </h1>
          <p className="hero-subtitle">
            Study smarter with AI tools that simplify learning and keep you on track.
          </p>
          <Link to="/login" className="hs-button bg-dark-purple hover:bg-[rgb(102,222,252)] get-started hover:text-black">
            Get Started Now!
          </Link>
        </div>

        <main className="right">
          {/* <h2 className="features-title">Features</h2> */}
          <div className="features-grid">
            <Link to="/login" className="div1 feature-card "></Link>
            <Link to="/login" className="div2 feature-card"></Link>
            <Link to="/login" className="div3 feature-card"></Link>
            <Link to="/login" className="div4 feature-card"></Link>
            <Link to="/login" className="div5 feature-card"></Link>
            <Link to="/login" className="div6 feature-card"></Link>
          </div>
        </main>
      </section>

      <section className="section2">
        <h1 className="section2-title">One tool. Better learning.</h1>
      </section>

      <section className="section3">
        <h1>tbh idk</h1>
      </section>
    </>
  );
};

export default HomeScreen;
