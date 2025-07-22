import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

class AIConnector {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });
  }

  async generateResponse(messages, options ={}){
    const defaultOptions = {
      model: "deepseek/deepseek-r1-0528:free", //what type of model
      response_format: { type: "json_object" }, //what format the response should be in
      temperature: 0.5//how creative the response should be
  };

    try{
      // contact api
      const response = await this.openai.chat.completions.create({
        messages,
        ...defaultOptions,
      });
      return response?.choices?.[0]?.message?.content;
    }catch (error) {
      console.error("Error generating response:", error);
      throw new Error("Failed to generate response from AI model.");
    }
  }
}

export default new AIConnector();
