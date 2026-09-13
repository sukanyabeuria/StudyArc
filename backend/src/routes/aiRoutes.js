import express from 'express';
import rateLimit from 'express-rate-limit';
import { askAssistant } from '../controllers/aiController.js';
import { optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Specific rate limiter for AI queries to prevent abuse and protect API quota
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 AI questions per 15 minutes
  message: {
    success: false,
    message: 'Too many AI requests from this IP, please take a short study break and try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// AI assistant query endpoint with optional auth (accessible by all study learners)
router.post('/ask', aiLimiter, optionalProtect, askAssistant);

export default router;
