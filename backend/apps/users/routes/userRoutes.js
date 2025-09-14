import express from "express";
import userController from "../controllers/userController.js";


const router = express.Router();

router.post("/register", userController.userRegister);
router.post("/verify", userController.verifyEmail);
router.post("/login", userController.userLogin)
router.post("/logout", userController.userLogout)
router.post("/send-reset", userController.userSendResetPassword);
router.post("/reset-password", userController.userResetPassword);
router.get("/refresh-token", userController.userRefresh);


export default router;
