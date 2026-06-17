import {api} from './apiClient'

export const generateQuiz = async (materialId, questionCount, difficulty) => {
    const response = await api.post('/quiz/generate', {
        material_id: materialId,
        question_count: questionCount,
        difficulty: difficulty
    })
    return response.data
}

export const getQuizzesByMaterialId = async (materialId) => {
    const response = await api.get(`/quiz/${materialId}/quizzes`)
    return response.data
}

export const fetchQuizQuestions = async (quizId) => {
    const response = await api.get(`/quiz/${quizId}`)
    return response.data
}