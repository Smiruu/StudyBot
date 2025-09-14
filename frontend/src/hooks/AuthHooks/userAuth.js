import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/users',
  withCredentials: true,
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // States
  const [user, setUser] = useState(null);
  const [accessToken, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
    const refreshUser = async () => {
      try {
        const response = await API.get('/refresh-token'); // this should return { accessToken, user }
        setToken(response.data.accessToken);
        setUser(response.data.user);
        setIsAuthenticated(true);

      } catch (err) {
        console.error("Failed to refresh user:", err.response?.data || err.message);
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    refreshUser();
  }, []);
  // Register
  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.post('/register', { name, email, password });

      setUser(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration Failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify account
  const verify = async (token) => {
    setIsLoading(true);
    setError(null);
    try {
      const {accessToken} = await API.post('/verify', { token });
      setToken(accessToken)
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Verification Failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.post('/login', { email, password });
      setToken(response.data.accessToken);
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Login Failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await API.post('/logout');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Logout Failed');
    }
  };

  // Send reset password email
  const sendReset = async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      await API.post('/send-reset', { email });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPass = async (token, newPassword) => {
    setIsLoading(true);
    setError(null);
    try {
      await API.post('/reset-password', { token, newPassword });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    error,
    register,
    verify,
    login,
    logout,
    sendReset,
    resetPass,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
