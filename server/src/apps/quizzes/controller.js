import * as quizService from './services.js';

export const generateQuiz = async (req, res) => {

    try {
        const { material_id, question_count, difficulty } = req.body;

        if (!material_id || !question_count) {
            return res.status(400).json({ message: 'Material ID and Question Count are required' })
        }
        const userId = req.user.id;

        const rawText = await quizService.prepareMaterialForQuiz(material_id, userId);
        const MAX_CHARACTER_LIMIT = 160000;

        if (rawText.length > MAX_CHARACTER_LIMIT) {
            return res.status(400).json({
                error: "Your notes are too long! Please limit your text to under 150 pages."
            });
        }

        const generatedQuiz = await quizService.generateQuizWithAI(rawText, question_count);

        const quizId = await quizService.saveQuizToDatabase(userId, material_id, generatedQuiz.title, generatedQuiz.questions);

        const sanitizedQuestions = generatedQuiz.questions.map(q => ({
            question: q.question,
            options: q.options
        }))
        return res.status(201).json({
            status: "success",
            quiz_id: quizId,
            questions: sanitizedQuestions
        });


    } catch (error) {
        console.error('Controller error:', error);
        res.status(500).json({ message: error.message });
    }
}

export const fetchQuizzes = async (req, res) => {
    try {
        const { material_id } = req.params;
        const userId = req.user.id;

        const quizzes = await quizService.getQuizzesFromDatabase(userId, material_id);

        res.status(200).json({
            message: "Quizzes fetched successfully",
            quizzes
        })
    } catch (error) {
        console.error('Controller error:', error);
        res.status(500).json({ message: error.message });
    }
}

export const fetchQuiz = async (req, res) => {
    try {
        const { quiz_id } = req.params

        const quiz = await quizService.getQuizQuestions(quiz_id)
        res.status(200).json({
            message: "Quiz fetched successfully",
            quiz
        })
    } catch (error) {
        console.error("Controller Error:", error)
        res.status(500).json({ error: error.message })
    }
}

export const checkAnswers = async (req, res) => {
    try {
        const { quiz_id, answers } = req.body;

        const score = await quizService.scoreResults(quiz_id, answers);

        res.status(200).json({
            message: "Score checked successfully",
            score
        })


    } catch (error) {
        console.error("Controller Error:", error)
        res.status(500).json({ error: error.message })
    }
}