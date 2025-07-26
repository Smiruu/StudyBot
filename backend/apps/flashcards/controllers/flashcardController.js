import flashcardServices from "../services/flashcardServices.js";

class flashcardController {
  async createFlashcards(req, res) {
    const { inputType, topic, notes, difficulty, count } = req.body;
    const createdBy = req.user._id;

    try {
      let options = {
        inputType,
        topic,
        notes,
        difficulty,
        count,
        createdBy,
      };

      if (req.file) {
        options.pdfBuffer = req.file.buffer;
      }

      console.log(options)
      const flashcards = await flashcardServices.createFlashcards(options);

      res.status(200).json({
        message: "Flashcards generated successfully.",
        group: flashcards.group,
        flashcards,
      });
    } catch (error) {
      console.error("Error generating flashcards:", error);
      res
        .status(500)
        .json({
          message: "Failed to generate flashcards.",
          error: error.message,
        });
    }
  }

  async listUserFlashcards(req, res) {
    const userId = req.user._id;

    try {
      const flashcardsList = await flashcardServices.listUserFlashcards(userId);

      if (!flashcardsList || flashcardsList.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No flashcards found for this user.",
          count: 0,
          data: [],
        });
      }

      res.status(200).json({
        message: "User Flashcards retrieved successfully.",
        count: flashcardsList.length,
        data: flashcardsList,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Failed to retrieve flashcards.",
          error: error.message,
        });
    }
  }

  async listGroupFlashcards(req, res) {
    const groupId = req.body.groupId;

    try {
        const listOfFlashcards = await flashcardServices.listGroupFlashcards(groupId);
        if (!listOfFlashcards || listOfFlashcards.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No flashcards found for this group.",
                count: 0,
                data: [],
            });
        }

        res.status(200).json({
            message: "Flashcards retrieved successfully.",
            count: listOfFlashcards.length,
            data: listOfFlashcards,
        });

    }catch (error) {
        res.status(500).json({
            message: "Failed to retrieve flashcards.",
            error: error.message,
        });
    }
}
    async deleteGroupAndFlashcards(req, res) {
    const groupId = req.params.groupId;

    try{
        await flashcardServices.deleteGroupAndFlashcards(groupId);
        res.status(200).json({
            message: "Flashcard group and associated flashcards deleted successfully."
        });
    }catch(error){
        console.error("Error deleting flashcard group:", error);
        res.status(500).json({
            message: "Failed to delete flashcard group.",
            error: error.message,
        });
    }
}
}

export default new flashcardController();
