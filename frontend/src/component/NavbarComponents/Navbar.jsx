import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./css/Navbar.css";



function Navbar() {
  const navigate = useNavigate()
  
  return (
    <div className='navbar-container'>
      <div className="navbar-logo" onClick={ () => navigate('/')}>
       StudyBot
      </div>
      <div className="navbar-auth">
      <p className="navbar-login">Log In</p>
      <button className='navbar-register' onClick={() => navigate('/login')}>Get Started</button>
      </div>
    </div>
  )
}

export default Navbar
