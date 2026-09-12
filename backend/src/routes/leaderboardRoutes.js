import express from 'express';
import { getLeaderboard } from '../controllers/leaderboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected so authenticated user gets their personalized rank in addition to top 10
router.get('/', protect, getLeaderboard);

export default router;
