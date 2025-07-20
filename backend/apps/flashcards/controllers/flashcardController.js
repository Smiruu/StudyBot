import flashcardServices from "../services/flashcardServices.js";

class flashcardController {

    async createFlashcards(req, res) {
        const { inputType, topic, notes, difficulty, count,  } = req.body;
        const createdBy = req.user._id;


        try {
            let options = {
                inputType,
                topic,
                notes,
                difficulty,
                count,
                createdBy
            };
            
            if (req.file) {
                options.pdfBuffer = req.file.buffer;
            }

            const flashcards = await flashcardServices.createFlashcards(options);

            res.status(200).json({
                message: "Flashcards generated successfully.",
                group: flashcards.group,
                flashcards
            });
        } catch (error) {
            console.error("Error generating flashcards:", error);
            res.status(500).json({ message: "Failed to generate flashcards.", error: error.error});
        }
    }

    //di pa tapos to
    // async listUserFlashcards(req, res) {
    //     const userId = req.user._id;

    //     try {
    //         const flashcards = await flashcardServices.getUserFlashcards(userId);
    //         res.status(200).json({
    //             message: "User flashcards retrieved successfully.",
    //             flashcards
    //         });
    //     } catch (error) {
    //         console.error("Error retrieving user flashcards:", error);
    //         res.status(500).json({ message: "Failed to retrieve user flashcards.", error: error.message });
    //     }
    // }
}

export default new flashcardController();