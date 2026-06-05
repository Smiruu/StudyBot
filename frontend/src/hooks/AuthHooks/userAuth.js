import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

import * as api from '../../api/authApi';

const API = "hi"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // States
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null)
  const [accessToken, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
    const refreshUser = async () => {
      try {
        const response = await api.refresh(); 
        setToken(response.access_token);
        setUser({
          email: response.email,
          user_id: response.user_id,
          username: response.username
        });

      } catch (err) {
        console.error("Failed to refresh user:", err.response?.data || err.message);
        setToken(null);
        setUser(null);
        
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
      
      const response = await api.register(name, email, password)
      setEmail(response.email);
    } catch (err) {
      console.log(err)
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
      const response = await api.verify(email, token)
      setToken(response.access_token)
      setUser({
        email: response.email,
        user_id: response.user_id,
        username: response.username
      })
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
      const response = await api.login(email, password);
      setToken(response.access_token);
      setUser(response.user);
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Login Failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.logout()
      setToken(null);
      setUser(null);
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
