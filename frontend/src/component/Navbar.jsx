import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        Studybot
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  )
}

export default Navbar
