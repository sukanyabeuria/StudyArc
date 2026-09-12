import express from 'express';
import { getSessions, createSession } from '../controllers/sessionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All study session routes require authentication
router.use(protect);

router.route('/')
  .get(getSessions)
  .post(createSession);

export default router;
