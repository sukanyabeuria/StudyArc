import express from 'express';
import rateLimit from 'express-rate-limit';
import { askAssistant } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Specific rate limiter for AI queries to prevent abuse and protect API quota
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 AI questions per 15 minutes
  message: {
    success: false,
    message: 'Too many AI requests from this IP, please take a short study break and try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// All AI endpoints require authentication and rate limiting
router.use(protect);
router.post('/ask', aiLimiter, askAssistant);

export default router;
