import { Router } from "express";
import * as quizController from './controller.js'
import {verifyUser} from '../../middleware/verifyUser.js'

const router = Router();


router.post('/generate',verifyUser, quizController.generateQuiz)

export default router;