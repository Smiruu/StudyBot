import * as quizApi from "../api/quizApi";
import { useState, useCallback } from "react";

export const useQuiz = () => {
    const [quizzes, setQuizzes] = useState([])
    const [questions, setQuestions] = useState([])
    const [quizTimeLimit, setQuizTimeLimit] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
  

    const generateQuiz = useCallback(async(materialId, count, difficulty, timeLimit = 0) => {
        setIsLoading(true)
        setError(null)
        try {
            const result = await quizApi.generateQuiz(materialId, count, difficulty, timeLimit)
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
            setQuizTimeLimit(response.time_limit || 0)
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    },[])

    const submitQuiz = async(quizId, userAnswers, timeTaken) => {
        setIsLoading(true)
        setError(null)
        try {
            const result = await quizApi.submitQuiz(quizId, userAnswers, timeTaken)
            return result
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }
    return {
        quizzes,
        questions,
        quizTimeLimit,
        isLoading,
        error,
        submitQuiz,
        fetchQuestions,
        generateQuiz,
        fetchQuizzes
    }
}