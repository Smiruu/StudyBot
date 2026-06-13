import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './screens/LandingPage';
import LoginPage from './screens/LoginPage';
import {AuthProvider} from './context/authContext';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './screens/DashboardPage';

const App = () => {
  

  return (
    <AuthProvider>
     <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage  />} />


          <Route element={<DashboardLayout/>}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
