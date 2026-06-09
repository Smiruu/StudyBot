import { Router } from "express";
import * as quizController from './controller.js'
import {verifyUser} from '../../middleware/verifyUser.js'

const router = Router();


router.post('/generate',verifyUser, quizController.generateQuiz)
router.get('/:material_id/quizzes', verifyUser, quizController.fetchQuizzes)
router.get('/:quiz_id/quiz', verifyUser, quizController.fetchQuiz)
router.post('/:quiz_id/submit', verifyUser, quizController.checkAnswers)
export default router;