import { askGemini } from '../services/geminiService.js';

/**
 * @desc    Ask the Gemini AI Study Assistant a question
 * @route   POST /api/ai/ask
 * @access  Private
 */
export const askAssistant = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid question for the AI study assistant'
      });
    }

    const trimmedQuestion = question.trim();

    if (trimmedQuestion.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Question cannot exceed 2000 characters'
      });
    }

    const userLabel = req.user?.name ? `${req.user.name}` : 'Study Learner (Guest)';
    console.log(`[AI Assistant] Received question from ${userLabel}: "${trimmedQuestion.substring(0, 70)}..."`);

    const answer = await askGemini(trimmedQuestion);

    console.log(`[AI Assistant] Successfully generated response (${answer ? answer.length : 0} characters)`);

    return res.status(200).json({
      success: true,
      data: {
        question: trimmedQuestion,
        answer
      }
    });
  } catch (error) {
    console.error(`[AI Assistant Controller Error]:`, error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate answer from AI Assistant'
    });
  }
};
