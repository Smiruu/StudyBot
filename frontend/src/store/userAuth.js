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
  const[user, setUser] = useState(null);
  const[accessToken, setToken] = useState(null);
  const[isAuthenticated, setIsAuthenticated] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const[error, setError] = useState(null);
  
  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.post('/register', {name, email, password});
      setToken(response.data.user.token);
      setUser(response.data.user);
   
    } catch (err) {
      setError(err.response?.data?.message || 'Registration Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const verify = async (token) => {
    setIsLoading(true)
    setError(null)
    try {
      await API.post('/verify', {token});
      setIsAuthenticated(true);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Verification Failed')
    }
  }

  //Login API call
  const login = async (email,password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await API.post('/login', {email,password});
      setToken(response.data.user.token);
      setUser(response.data.user);
      setIsAuthenticated(true);

    } catch (err) {
      setError(err.response?.data?.message || 'Login Failed')
    } finally { //"finally" this is even if errors occur this will run
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await API.post('/logout')

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
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
  };
  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);