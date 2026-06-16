import {api} from './apiClient'

export const generateQuiz = async (materialId, questionCount, difficulty) => {
    const response = await api.post('/quiz/generate', {
        material_id: materialId,
        question_count: questionCount,
        difficulty: difficulty
    })
    return response.data
}