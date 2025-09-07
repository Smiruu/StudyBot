import axios from 'axios';
import {createContext, useContext, useState} from 'react'

  
const API = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

/*
  This file is to authenticate users into accessing the app, this is to make sure
  that only users that have a accessToken can access the website, This is also where we will
  put the API calls to backend for user Authentication, without using Redux
*/

const AuthContext = createContext(); // This is to pass props (User) to every children (component) it has

//children is a special prop that is automatically passed to every component
/*
In the case of your AuthProvider, the children prop will contain any React elements 
(components, text, etc.) that are nested inside the <AuthProvider> tags when you use 
it in your application.
*/

export const AuthProvider = ({children}) =>{
  //useState Hooks:
  //initial state:
    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [accessToken, setToken] = useState(() => {
    return localStorage.getItem('accessToken') || null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to update auth state and localStorage
  const updateAuth = (userData, token, authStatus) => {
    setUser(userData);
    setToken(token);
    setIsAuthenticated(authStatus);
    
    if (authStatus && userData && token) {
      localStorage.setItem('user', JSON.stringify({ id: userData._id,
  name: userData.name,
  email: userData.email
}));
      localStorage.setItem('accessToken', token);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isAuthenticated');
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.post('/register', { name, email, password });
      updateAuth(response.data.user, response.data.user.token, true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const verify = async (token) => {
    setIsLoading(true);
    setError(null);
    try {
      await API.post('/verify', { token });
      updateAuth(user, accessToken, true); // Keep existing user/token
    } catch (err) {
      setError(err.response?.data?.error || 'Verification Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.post('/login', { email, password });
      updateAuth(response.data.user, response.data.user.token, true);
    } catch (err) {
      setError(err.response?.data?.message || 'Login Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await API.post('/logout');
      updateAuth(null, null, false);
    } catch (err) {
      setError(err.response?.data?.message || 'Logout Failed');
    }
  };


  const sendReset = async (email) => {
    try {
      await API.post('/send-reset', {email});

    } catch (err) {
      setError(err?.response?.data?.message || "Failed to reset password")
    }
    
  }

  const resetPass = async (token, newPassword) => {
    setIsLoading(true)
    try {
      await API.post("/reset-password", {token, newPassword});
    } catch (error) {
      setError(err?.response?.data?.message || "Failed to reset password")
    } finally {
      setIsLoading(false)
    }
  }
  const value = {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    error,
    sendReset,
    register,
    verify,
    login,
    logout,
  };
  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

