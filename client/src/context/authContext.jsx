import {createContext, useState, useContext, useEffect} from 'react'
import * as api from '../api/authApi'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const refresh = async() => {
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
    },[])
    
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try{
            const response = await api.login(email,password)

            setToken(response.access_token)
            setUser(response.user)
            setIsAuthenticated(true);
        }catch(err){
            setError(err.response?.data?.error || "An error occured")
        }finally{
            setIsLoading(false)
        }
    }

    const logout = async () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        await api.logout();
    }

    const value = {
        token,
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout
    }

    return(<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => useContext(AuthContext);