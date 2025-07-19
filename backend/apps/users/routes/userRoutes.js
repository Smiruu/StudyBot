import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.userRegister);
router.post("/verify", userController.verifyEmail);
router.post("/login", userController.userLogin)



export default router;
