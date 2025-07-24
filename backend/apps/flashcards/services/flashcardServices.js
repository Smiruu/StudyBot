import generateFlashcard from "./generateFlashcard.js"
import pdf from "pdf-parse";
import { Flashcard, FlashcardGroup }  from "../models/flashcardModel.js";


class flashcardServices {

async extractTextFromPDF(pdfBuffer) {
        if (!Buffer.isBuffer(pdfBuffer)) {
            throw new Error("Invalid PDF buffer: Expected Buffer type");
        }

        // Basic PDF validation - check for PDF magic number
        if (pdfBuffer.length < 4 || pdfBuffer.slice(0, 4).toString() !== '%PDF') {
            throw new Error("Invalid PDF file: Missing PDF header");
        }

        try {
            const { text } = await pdf(pdfBuffer);
            if (!text?.trim()) {
                throw new Error("PDF appears to have no extractable text");
            }
            return text;
        } catch (error) {
            console.error("PDF extraction error:", error);
            throw new Error(`Failed to extract PDF text: ${error.message}`);
        }
    }




    async createFlashcards(options) {
        const { inputType, notes, topic, difficulty = 'beginner', count = 5 , createdBy} = options;

        if (!createdBy) throw new Error("User ID is required to create flashcards.");

        let content;
        
        if (inputType === 'topic'){
            if (!topic?.trim()) throw new Error("Topic is required for topic input type.");
            content = topic;
        }else if (inputType === 'notes') {
            if (!notes?.trim()) throw new Error("Notes cannot be empty.");
            content = notes;
        } else if (inputType === 'pdf') {
            if (!options.pdfBuffer) throw new Error("PDF buffer is required for PDF input type.");
            content = await this.extractTextFromPDF(options.pdfBuffer);
        } else {
            throw new Error('Invalid input type. Choose "topic", "notes", or "pdf".');
        }

       

        const flashcards = await generateFlashcard.generateFlashcards({
            inputType: inputType === 'pdf' ? 'notes' : inputType,
            content,
            difficulty,
            count
        });

        if (!flashcards || flashcards.length === 0) {
            throw new Error("AI did not return any flashcards. Please try again.");
        }
        
         const group = await FlashcardGroup.create({
            name: topic || 'Untitled Group',
            description: `Flashcards generated for ${topic || 'general topic'}`,
            createdBy,
            flashcards:[]
        })

        const saveFlashcards = await Promise.all(flashcards.map(card => 
            new Flashcard({
                question: card.question,
                answer: card.answer,
                topic: topic || 'General',
                difficulty,
                createdBy,
                group: group._id
            }).save()

        ));

        await FlashcardGroup.findByIdAndUpdate(group._id, {
            $push: { flashcards: { $each: saveFlashcards.map(f => f._id) } }
        });
        
        return {group};
    }

    // List flashcards created by a user
    async listUserFlashcards(userId) {
        if (!userId) throw new Error("User ID is required to list flashcards.");

        const listOfFlashcards = await FlashcardGroup.find({ createdBy: userId })
            .select('name description createdAt flashcards')
            .sort({ createdAt: -1 });

        return listOfFlashcards;
    }

    // List flashcards by group (used when viewing a specific group)
    async listGroupFlashcards(groupId) {
        if (!groupId) throw new Error("Group ID is required to list flashcards.");

        const flashcards = await Flashcard.find({ group: groupId })
            .select('question answer topic difficulty createdAt')
            .populate('group', 'name description createdBy createdAt')
            .sort({ createdAt: -1 });

        return flashcards;
    }

    async deleteGroupAndFlashcards(groupId) {
        if (!groupId) throw new Error("Group ID is required to delete flashcards.");

        const group = await FlashcardGroup.findByIdAndDelete(groupId);
        if (!group) throw new Error("Flashcard group not found.");
        await Flashcard.deleteMany({ group: groupId });
        return;
    }
}

export default new flashcardServices();