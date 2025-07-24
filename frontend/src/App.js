// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthHooks/userAuth";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/AuthenticationScreens/LoginScreen";
import RegisterScreen from "./screens/AuthenticationScreens/RegisterScreen";
import DashboardScreen from "./screens/HomeScreen/DashboardScreen";
import VerifyScreen from "./screens/AuthenticationScreens/VerifyScreen";
import QuizScreen from "./screens/QuizScreens/QuizScreen";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/verify" element={<VerifyScreen />} />
          <Route path="/quizzes" element={<QuizScreen/>}/>
          <Route path="/dashboard" element={<DashboardScreen />} />
          
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;
