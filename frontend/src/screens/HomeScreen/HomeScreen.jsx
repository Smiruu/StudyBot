import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/HomeScreen.css";
import Navbar from "../../component/NavbarComponents/Navbar.jsx";
import Feature1 from "./images/Feature1.png";
import Feature2 from "./images/Feature2.png";
import Feature3 from "./images/Feature3.png";
import Feature4 from "./images/Feature4.png";
import Feature5 from "./images/Feature5.png";
import Feature6 from "./images/Feature6.png";
import Section3img from "./images/Section3img.jpg"
import { BsCheckCircleFill } from 'react-icons/bs';

const HomeScreen = () => {
    useEffect(() => {
    window.history.scrollRestoration = "manual"; 
    window.scrollTo(0, 0);
  }, []);

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
          <div className="features-grid">
            <Link to="/login" className="div1 feature-card ">
            <div className="features" style={{ backgroundImage: `url(${Feature1})` }}></div>
            </Link>

            <Link to="/login" className="div2 feature-card">
            <div className="features" style={{ backgroundImage: `url(${Feature2})` }}></div>
            </Link>

            <Link to="/login" className="div3 feature-card">
            <div className="features" style={{ backgroundImage: `url(${Feature3})` }}></div>
            </Link>

            <Link to="/login" className="div4 feature-card">
            <div className="features" style={{ backgroundImage: `url(${Feature4})` }}></div>
            </Link>

            <Link to="/login" className="div5 feature-card">
            <div className="features" style={{ backgroundImage: `url(${Feature5})` }}></div>
            </Link>
            
            <Link to="/login" className="div6 feature-card">
            <div className="features" style={{ backgroundImage: `url(${Feature6})` }}></div>
            </Link>
          </div>
        </main>
      </section>

      <section className="section2">
        <h1 className="section2-title">One tool. Better learning.</h1>
      </section>

      <section className="section3">
        <div className="section3-container">
          <div className="section3-left">
          <div className="section3-image" style={{ backgroundImage: `url(${Section3img})` }}></div>
          </div>

          <div className="section3-right">
            <h1 className="section3-title">Focus on what matters, AI takes care of the rest.</h1>
            <ul className="section3-list">
              <li><BsCheckCircleFill className="s3icon"/>Generate AI-powered flashcards instantly</li>
              <li><BsCheckCircleFill className="s3icon"/>Summarize notes into bite-sized points</li>
              <li><BsCheckCircleFill className="s3icon"/>Get help from our very own Chatbot</li>
            </ul>
            <Link to="/login" className="hs-button bg-dark-purple hover:bg-[rgb(102,222,252)] get-started hover:text-black w-[40%] text-center font-bold py-3 px-5 rounded-2xl">
              Start Studying
            </Link>
          </div>
        </div>
    </section>
    </>
  );
};

export default HomeScreen;
