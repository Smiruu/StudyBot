import * as quizApi from "../api/quizApi";
import { useState, useCallback } from "react";

export const useQuiz = () => {
    const [quizzes, setQuizzes] = useState([])
    const [questions, setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
  

    const generateQuiz = useCallback(async(materialId, count, difficulty) => {
        setIsLoading(true)
        setError(null)
        try {
            const result = await quizApi.generateQuiz(materialId, count, difficulty)
            return result
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const fetchQuizzes = useCallback(async(materialId)=> {
        setIsLoading(true)
        setError(null)
        try {
            const response = await quizApi.getQuizzesByMaterialId(materialId)
            console.log(response)
            setQuizzes(response.quizzes)
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    },[])

    const fetchQuestions = useCallback(async(quizId)=> {
        setIsLoading(true)
        setError(null)
        try {
            const response = await quizApi.fetchQuizQuestions(quizId)
            setQuestions(response.questions)
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    },[])
    return {
        quizzes,
        questions,
        isLoading,
        error,
        fetchQuestions,
        generateQuiz,
        fetchQuizzes
    }
}