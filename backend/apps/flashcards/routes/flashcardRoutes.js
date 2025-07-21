import express from "express";
import flashcardController from "../controllers/flashcardController.js";
import multer from "multer";
import { authenticateUser } from "../../../middleware/authentication.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create", upload.single("pdf"),authenticateUser, flashcardController.createFlashcards);
router.get("/userFlashcards", authenticateUser, flashcardController.listUserFlashcards);
router.get("/userFlashcards/flashcards", authenticateUser, flashcardController.listGroupFlashcards);

router.delete("/userFlashcards/delete",authenticateUser, flashcardController.deleteGroupAndFlashcards);
export default router;