import { Router } from "express";
import * as userController from './controller.js'

const router = Router()

router.get('/refresh', userController.refresh);
router.post('/register', userController.register);
router.post('/verify', userController.verifyRegister);
router.post('/login', userController.login)
router.post('/logout', userController.logout)

export default router