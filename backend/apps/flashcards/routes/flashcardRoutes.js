import express from "express";
import flashcardController from "../controllers/flashcardController.js";
import multer from "multer";
import { authenticateUser } from "../../../middleware/authentication.js";
import flashcardLimiter from "../../../middleware/flashcardLimiter.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authenticateUser)

router.post("/create", upload.single("pdf"), flashcardLimiter, flashcardController.createFlashcards);
router.get("/userFlashcards",  flashcardController.listUserFlashcards);
router.get("/userFlashcards/:groupId",  flashcardController.listGroupFlashcards);

router.put("/userFlashcards/:groupId", flashcardController.updateFlashcardGroup);
router.delete("/userFlashcards/:groupId", flashcardController.deleteGroupAndFlashcards);
export default router;