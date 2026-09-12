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

    if (trimmedQuestion.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Question cannot exceed 1000 characters'
      });
    }

    const answer = await askGemini(trimmedQuestion);

    res.status(200).json({
      success: true,
      data: {
        question: trimmedQuestion,
        answer
      }
    });
  } catch (error) {
    next(error);
  }
};
