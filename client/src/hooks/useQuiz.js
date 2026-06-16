import * as quizApi from "../api/quizApi";
import { useState, useCallback } from "react";

export const useQuiz = () => {
    const [quizzes, setQuizzes] = useState([])
    const [quizId, setQuizId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [totalItems, setTotalItems] = useState(0)

    const generatedQuiz = useCallback(async(materialId, count, difficulty) => {
        setIsLoading(true)
        setError(null)
        try {
            // const result = await quizApi.generateQuiz(materialId, count, difficulty)
            // setQuizzes(result.questions)
            setQuizId(1)

            // setQuizId(result.quiz_id)
            setTotalItems(count)
            
        } catch (error) {
            setError(error)
        } finally {
            // setIsLoading(false)
        }
    }, [])

    return {
        quizzes,
        quizId,
        isLoading,
        error,
        totalItems,
        generatedQuiz
    }
}