import React from 'react'
import { Link } from 'react-router-dom'
import "./css/Navbar.css";
import StudyLogo from "./Logo.png";

function Navbar() {
  return (
    <div className='navbar-container'>
      <div className="navbar-logo">
       <image src={StudyLogo} className='logo' />
      </div>
      <div className="navbar-auth">
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default Navbar
