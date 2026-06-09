import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './screens/LandingPage';
import LoginPage from './screens/LoginPage';

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage  />} />
          {/* // <Route path="/forgotpassword" element={<ForgotPassword />} />
          // <Route path="/register" element={<RegisterScreen />} />
          // <Route path="/verify" element={<VerifyScreen />} />
          // <Route element={<ProtectedRoute />}>
          // <Route path="/dashboard" element={<DashboardScreen />} />
          // </Route>
          // <Route path="/resetpass" element={<ForgotPassword/>}/>
          // <Route path="/reset-password/:token"/>  */}
        </Routes>
      </Router>
    </>
  )
}

export default App
