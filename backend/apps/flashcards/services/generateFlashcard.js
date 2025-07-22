import AIConnector from "../../../utils/aiConnector.js";


class generateFlashcard {
  /*
    Generates flashcards based on the provided options.
    This is to seperate the generation logic from the service layer 
    and to allow for easier testing and maintenance.
    @param {Object} options - The options for generating flashcards.
    @param {string} options.inputType - The type of input ('topic', 'notes', or 'pdf').
    @param {string} options.content - The content for the flashcards.
    @param {string} options.difficulty - The difficulty level of the flashcards ('beginner', 'intermediate', 'advanced').
    @param {number} options.count - The number of flashcards to generate.
    */
  async generateFlashcards(options) {
    const { inputType,content, difficulty = "beginner", count = 5 } = options; //get options
   
    if (!content || !difficulty || !count) {
      throw new Error("Missing required parameters");
    } // Validate required parameters

    const { prompt, systemPrompt } = this.buildPrompts(options); //Building the prompt refer below
    console.log("Reached prompts, building response")
    try {
      const responseText = await AIConnector.generateResponse([
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ]); //response from AI

      console.log("Parsing now")
      const flashcards = JSON.parse(responseText); // Parse(Convert JsonObj to Obj) the AI response
         console.log("Response Text:", flashcards)
      return this.validateFlashcards(flashcards, options); // Validates the flashcards
    } catch (error) {
      console.error("Error generating flashcards:", error);
      throw new Error(`Flashcard generation failed: ${error.message}`);
    }
  }

  buildPrompts(options) {
    let prompt;
    
    switch (options.inputType) {
      case "topic":
        prompt = `Generate ${options.count} flashcards on the topic: "${options.content}" 
                with difficulty level "${options.difficulty}".`;
        break;
      case "notes":
        prompt = `Create exactly ${options.count} flashcards from these notes: "${options.content}" for ${options.difficulty} level.`;
        break;
      default:
        throw new Error('Invalid input type. Choose "topic",or "notes".');
    }

    const systemPrompt = `You are a flashcard generator. Return ONLY valid JSON in this exact format:
          {
      "flashcards": [
        {"question": "What is...?", "answer": "It is..."},
        {...}
      ]
    }`;

    return {
        prompt, systemPrompt
    }
  }

  validateFlashcards(response, options){
    if(!response?. flashcards || !Array.isArray(response.flashcards)){
        throw new Error("Response is missing flashcards")
    }

    const validatedFlashcards = response.flashcards
        .filter((card) => card?.question && card?.answer)
        .map((card)=> ({
            question: card.question,
            answer: card.answer,
            difficulty: options.difficulty,
            topic: options.inputType === "topic" ? options.content: "from notes",
        }))
    console.log("Validated Flashcards", validatedFlashcards)    
    if (validatedFlashcards.length === 0){
        throw new Error("No valid flashcards were generated")
    };

    return validatedFlashcards
  }
}

export default new generateFlashcard();