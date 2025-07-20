import express from "express";
import flashcardController from "../controllers/flashcardController.js";
import multer from "multer";
import { authenticateUser } from "../../../middleware/authentication.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create", upload.single("pdf"),authenticateUser, flashcardController.createFlashcards);

export default router;