import { model } from "../../../config/firebase.js";

class generateFlashcard {
  async generateFlashcards(options) {
    const { inputType, content, difficulty = "beginner", count = 5 } = options;

    const systemPrompt = `
      You are a flashcard generator.
      Generate exactly ${count} flashcards at ${difficulty} difficulty.
      Return only valid JSON in this format:
      {
        "flashcards": [
          { "question": "string", "answer": "string" }
        ]
      }
      Input type: ${inputType}
      Content: ${content}
    `;

    console.log("System Prompt:", systemPrompt);

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
      ],
    });

    // Extract text from Gemini response
    const output = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      throw new Error("Gemini did not return any content.");
    }

    let flashcards;
    try {
      const cleaned = output
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      flashcards = JSON.parse(cleaned).flashcards;
    } catch (err) {
      console.error("Gemini raw output:", output);
      throw new Error("AI did not return valid JSON.");
    }

    return flashcards;
  }
}

export default new generateFlashcard();
