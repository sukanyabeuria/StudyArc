import { GoogleGenAI } from '@google/genai';

let aiClient = null;

const getAiClient = () => {
  const rawKey = process.env.GEMINI_API_KEY;
  if (!rawKey) {
    return null;
  }
  const apiKey = rawKey.trim();
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

const SYSTEM_INSTRUCTION = `You are the StudyArc AI Study Companion, an encouraging, clear, and empathetic study tutor.
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
    console.error('[Gemini Service] GEMINI_API_KEY is not defined in backend/.env');
    throw new Error(
      'Gemini is not configured. Add your Google AI Studio API key as GEMINI_API_KEY in backend/.env, then restart the backend.'
    );
  }

  // Attempt with primary models that are active in Google AI Studio
  const modelsToTry = ['gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash'];
  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: question,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      lastError = err;
      console.warn(`[Gemini Service] Model '${model}' call failed: ${err.message}. Trying next available model...`);
    }
  }

  console.error(`[Gemini Service Error]: All candidate models failed: ${lastError?.message}`);
  throw new Error(`Failed to generate response from Gemini: ${lastError?.message}`);
};
