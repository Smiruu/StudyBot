import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthHooks/userAuth";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/AuthenticationScreens/LoginScreen";
import RegisterScreen from "./screens/AuthenticationScreens/RegisterScreen";
import DashboardScreen from "./screens/HomeScreen/DashboardScreen";
import VerifyScreen from "./screens/AuthenticationScreens/VerifyScreen";
import FlashcardScreen from "./screens/QuizScreen/FlashcardsScreen";
import ForgotPassword from "./screens/AuthenticationScreens/ForgotPassword";
import ProtectedRoute from "./context/ProtectedRoute";
import "./App.css";

function App() {
  return (
    
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/verify" element={<VerifyScreen />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/quiz/:groupId" element={<FlashcardScreen />}/>
          </Route>
          <Route path="/resetpass" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:token"/>
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;
