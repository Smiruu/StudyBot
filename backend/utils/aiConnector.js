import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

class AIConnector {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1'
    });
    
  }

  async generateFlashcards(options) {
    const { inputType, content, difficulty, count } = options;

    // Validate input parameters
    if (!content || !difficulty || !count) {
      throw new Error('Missing required parameters');
    }

    let prompt;
    switch (inputType) {
      case 'topic':
        prompt = `Generate exactly ${count} flashcards about "${content}" for ${difficulty} level.`;
        break;
      case 'notes':
        prompt = `Create exactly ${count} flashcards from these notes: "${content}" for ${difficulty} level.`;
        break;
      default:
        throw new Error('Invalid input type. Choose "topic" or "notes".');
    }

    const systemPrompt = `You are a flashcard generator. Return ONLY valid JSON in this exact format:
    {
      "flashcards": [
        {"question": "What is...?", "answer": "It is..."},
        {...}
      ]
    }`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7
      });

      // Enhanced error handling
      if (!completion?.choices?.[0]?.message?.content) {
        console.error('Invalid AI response structure:', completion);
        throw new Error('AI returned an unexpected response format');
      }

      const responseText = completion.choices[0].message.content;
      const response = JSON.parse(responseText);
      
      // Debug logging
      console.log('Raw AI Response:', response);

      if (!response?.flashcards || !Array.isArray(response.flashcards)) {
        throw new Error('Response missing flashcards array');
      }

      // Validate and format flashcards for your system
      const validatedFlashcards = response.flashcards
        .filter(card => card?.question && card?.answer)
        .map(card => ({
          question: card.question,
          answer: card.answer,
          // Add any additional fields your model requires
          difficulty,
          topic: inputType === 'topic' ? content : 'From notes'
        }));

      if (validatedFlashcards.length === 0) {
        throw new Error('No valid flashcards were generated');
      }

      return validatedFlashcards;
    } catch (error) {
      console.error('Flashcard generation failed:', {
        error: error.message,
        stack: error.stack,
        options
      });
      throw new Error(`Flashcard generation failed: ${error.message}`);
    }
  }
}

export default new AIConnector();