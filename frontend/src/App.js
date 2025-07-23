// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/userAuth";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/AuthenticationScreens/LoginScreen";
import RegisterScreen from "./screens/AuthenticationScreens/RegisterScreen";
import DashboardScreen from "./screens/HomeScreen/DashboardScreen";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;
