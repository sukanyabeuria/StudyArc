import StudySession from '../models/StudySession.js';
import User from '../models/User.js';
import { calculateXp, calculateLevel, calculateLevelInfo } from '../services/xpService.js';
import { calculateStreakUpdate } from '../services/streakService.js';

/**
 * @desc    Get authenticated user's study sessions
 * @route   GET /api/sessions
 * @access  Private
 */
export const getSessions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const [sessions, total] = await Promise.all([
      StudySession.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      StudySession.countDocuments({ userId: req.user._id })
    ]);

    res.status(200).json({
      success: true,
      count: sessions.length,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
        total
      },
      data: sessions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Record a completed study session and award gamification rewards
 * @route   POST /api/sessions
 * @access  Private
 */
export const createSession = async (req, res, next) => {
  try {
    const { duration, type = 'pomodoro', startedAt, completedAt } = req.body;

    const sessionDuration = Number(duration);
    if (!sessionDuration || sessionDuration < 1) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid session duration of at least 1 minute'
      });
    }

    const sessionStarted = startedAt ? new Date(startedAt) : new Date(Date.now() - sessionDuration * 60 * 1000);
    const sessionCompleted = completedAt ? new Date(completedAt) : new Date();

    // 1. Save StudySession record
    const session = await StudySession.create({
      userId: req.user._id,
      duration: sessionDuration,
      type,
      startedAt: sessionStarted,
      completedAt: sessionCompleted
    });

    // 2. Compute gamification rewards (for pomodoro sessions)
    let xpGained = 0;
    let oldLevel = req.user.level || 1;
    let leveledUp = false;

    const user = await User.findById(req.user._id);

    if (type === 'pomodoro') {
      // Calculate XP (1 min = 1 XP)
      xpGained = calculateXp(sessionDuration);
      user.xp += xpGained;
      user.totalStudyMinutes += sessionDuration;

      // Recalculate level
      const newLevel = calculateLevel(user.xp);
      if (newLevel > oldLevel) {
        leveledUp = true;
        user.level = newLevel;
      }

      // Calculate streak update
      const streakResult = calculateStreakUpdate(user, sessionCompleted);
      user.currentStreak = streakResult.currentStreak;
      user.longestStreak = streakResult.longestStreak;
      user.lastStudyDate = streakResult.lastStudyDate;

      await user.save();
    }

    const levelInfo = calculateLevelInfo(user.xp);

    res.status(201).json({
      success: true,
      data: {
        session,
        gamification: {
          xpGained,
          totalXp: user.xp,
          level: user.level,
          leveledUp,
          nextLevelXp: levelInfo.nextLevelXp,
          currentStreak: user.currentStreak,
          longestStreak: user.longestStreak,
          totalStudyMinutes: user.totalStudyMinutes
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
