import React from 'react'
import { Link } from 'react-router-dom'
import "./css/Navbar.css";

function Navbar() {
  return (
    <div className='navbar-container'>
      <div className="div">
        Studybot
      </div>
      <div className="div">
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default Navbar
