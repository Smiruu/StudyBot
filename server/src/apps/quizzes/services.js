import { supabaseAdmin } from "../../config/supabase.js";
import { extractMaterialText } from "../../utils/textExtractor.js";
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const prepareMaterialForQuiz = async (materialId, userId) => {

    const { data: material, error: materialError } = await supabaseAdmin
        .from('study_materials')
        .select('*')
        .eq('id', materialId)
        .eq('user_id', userId)
        .maybeSingle();

    if (materialError) {
        console.error('Service error:', materialError.message);
        throw new Error(materialError.message)
    }

    if (!material) {
        throw new Error('Material Not Found')
    }

    const url = material.storage_url.split('/study_files/');
    if (url.length < 2) {
        console.error('Service Error: Invalid storage format')
        throw new Error('Invalid storage URL format in database.');
    }
    const filePath = url[1];

    const { data: fileBlob, error: downloadError } = await supabaseAdmin.storage
        .from('study_files')
        .download(filePath);

    if (downloadError) {
        console.error('Service Error:', downloadError)
        throw new Error(downloadError.message)
    }

    const arrayBuffer = await fileBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await extractMaterialText(buffer, material.file_type);
}

export const generateQuizWithAI = async (rawText, questionCount, maxRetries = 3) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    })

    const prompt = `
    You are an expert educational tutor. I will provide you with a student's notes. 
        Your task is to generate a ${questionCount}-question multiple-choice quiz based strictly on the provided text.

        You MUST return a pure JSON array of objects. Do not include any markdown formatting or introductory text.
        Use this exact JSON schema for each question:
        {
            "title": "A descriptive title for the quiz",
            "questions": [
                {
                "question": "The text of the question?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct_answer": "Option B",
                "explanation": "A short, encouraging explanation of why Option B is correct based on the text."
                }
            ]
        }

        Here are the student's notes to base the quiz on:
        """
        ${rawText}
        """
    `;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            const quizArray = JSON.parse(responseText);
            return quizArray
        } catch (error) {
            if (error.message.includes('503') || error.status === 503) {
                if (attempt < maxRetries) {
                    const delay = attempt * 2000; // Wait 2s, then 4s...
                    console.warn(`[AI SERVICE] Gemini is busy (503). Retrying in ${delay}ms... (Attempt ${attempt} of ${maxRetries})`);

                    // Pause the execution for the delay period before looping again
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
            }
            console.error('[AI SERVICE ERROR] Gemini generation failed:', error);
            throw new Error('Failed to generate quiz. The AI provider is currently unavailable.');
        }
    }
}

export const saveQuizToDatabase = async (userId, materialId, title, questions) => {
    console.log("Received Title:", title);
    console.log("Received Questions:", questions);
    const { data: quiz, error: quizError } = await supabaseAdmin
        .from('quizzes')
        .insert({
            user_id: userId,
            material_id: materialId,
            title: title,
        })
        .select('id')
        .single();

    if (quizError) {
        console.error("Service Error: ", quizError.message);
        throw new Error(quizError.message)
    }

    const questionsToInsert = questions.map(q => ({
        quiz_id: quiz.id,
        question_text: q.question,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation
    }));

    const { error: questionsError } = await supabaseAdmin
        .from('questions')
        .insert(questionsToInsert);

    if (questionsError) {
        console.error("Service Error: ", questionsError.message);
        throw new Error(questionsError.message)
    }

    return quiz.id;
}