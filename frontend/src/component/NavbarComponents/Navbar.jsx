import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./css/Navbar.css";

function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-logo" onClick={() => navigate('/')}>
        StudyBot
      </div>
      <div className="navbar-auth">
        <button className="navbar-login" onClick={() => navigate('/login')}>Log In</button>
        <button className='navbar-register' onClick={() => navigate('/register')}>Get Started</button>
      </div>
    </div>
  )
}

export default Navbar
