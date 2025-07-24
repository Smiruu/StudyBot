import { useState, useCallback } from "react";
import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000/api/flashcards' });

export const useQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    
    const fetchQuizzesByGroup = useCallback(async () => {
        setLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = localStorage.getItem('accessToken')
            const response = await API.get('/userFlashcards',{
                headers:{
                    'Authorization': `Bearer ${token}`
                },
                userId: user.id
            },
                
            );
           
            setQuizzes(response.data.data)
        } catch (err) {
            setError(err.response?.message)
        } finally{
            setLoading(false)
        }
    },[])

    return { quizzes, loading, error, fetchQuizzesByGroup };
}