import express from 'express';
import { getMe, updateMe } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All user routes require authentication
router.use(protect);

router.route('/me')
  .get(getMe)
  .put(updateMe);

export default router;
