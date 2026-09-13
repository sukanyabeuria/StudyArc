import { GoogleGenAI } from '@google/genai';

let aiClient = null;

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : null;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

const SYSTEM_INSTRUCTION = `You are the FocusNest AI Study Companion, an encouraging, clear, and empathetic study tutor.
Your goals:
1. Explain concepts simply and intuitively using relatable analogies.
2. Break down complex study problems into step-by-step actionable parts.
3. Keep responses structured, concise, and friendly, using markdown with bullet points or code snippets where appropriate.
4. Encourage the student to stay focused during their study sessions.`;

/**
 * Sends a study question to Google Gemini and returns the AI response
 * @param {string} question - Student's study question
 * @returns {Promise<string>} Generated answer
 */
export const askGemini = async (question) => {
  const client = getAiClient();

  if (!client) {
    throw new Error(
      'Gemini is not configured. Add your Google AI Studio API key as GEMINI_API_KEY in backend/.env, then restart the backend.'
    );
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: question,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 1024
      }
    });

    return response.text;
  } catch (error) {
    console.error(`[Gemini Service Error]: ${error.message}`);
    throw new Error(`Failed to generate response from Gemini: ${error.message}`);
  }
};
