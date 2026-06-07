import * as quizService from './services.js';

export const generateQuiz = async (req, res) => {

    try {
        const {material_id, question_count} = req.body;
        
        if(!material_id|| !question_count){
            return res.status(400).json({message: 'Material ID and Question Count are required'})
        }
         const userId = req.user.id;
        
         const rawText = await quizService.prepareMaterialForQuiz(material_id, userId);

         const  generatedQuiz = await quizService.generateQuizWithAI(rawText, question_count);
         
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
        res.status(500).json({message: error.message});
    }
}