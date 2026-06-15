import { createContext, useState, useContext, useEffect } from 'react'
import * as api from '../api/authApi'
import { injectInterceptorToken } from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        injectInterceptorToken(token);
    }, [token]);
    useEffect(() => {
        const refresh = async () => {
            try {
                const response = await api.refresh();
                setToken(response.access_token);
                setUser(response.user);
                setIsAuthenticated(true);
            } catch (err) {
                console.log("Token refresh failed", err);
                logout();
            } finally {
                setIsLoading(false);
            }
        }
        refresh();
    }, [])

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.login(email, password)

            setToken(response.access_token)
            setUser(response.user)
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.response?.data?.error || "An error occured")
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        await api.logout();
    }

    const register = async (username, email, password) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await api.register(username, email, password)

            setToken(response.access_token)
            setUser(response.user)
            setIsAuthenticated(true)
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.error || "An error occured")
            return { success: false };
        } finally {
            setIsLoading(false)
        }
    }

    const verify = async (email, token) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await api.verify(email, token)

            setToken(response.access_token)
            setUser(response.user)
            setIsAuthenticated(true)
        } catch (err) {
            setError(err.response?.data?.error || "An error occured")
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        token,
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        register,
        verify
    }

    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => useContext(AuthContext);