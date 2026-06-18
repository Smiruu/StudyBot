import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './screens/public/LandingPage';
import LoginPage from './screens/auth/LoginPage';
import {AuthProvider} from './context/authContext';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './screens/dashboard/DashboardPage';
import AnalyticsPage from './screens/dashboard/AnalyticsPage';
import RegisterPage from './screens/auth/RegisterPage';
import VerifyPage from './screens/auth/VerifyPage';
import MaterialViewPage from './screens/dashboard/MaterialViewPage';
import QuizPage from './screens/quiz/QuizPage';
import ScorePage from './screens/quiz/ScorePage';
const App = () => {

  return (
    <AuthProvider>
     <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage  />} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/verify/:email' element={<VerifyPage/>}/>

          <Route element={<DashboardLayout/>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/material/:id" element={<MaterialViewPage />} /> 
            <Route path="/dashboard/quiz/:id" element={<QuizPage />} />
            <Route path="/dashboard/score/:attemptId" element={<ScorePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
