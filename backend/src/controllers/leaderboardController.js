import User from '../models/User.js';

/**
 * @desc    Get top users ranked by XP
 * @route   GET /api/leaderboard
 * @access  Private (or Public)
 */
export const getLeaderboard = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);

    // Fetch top users sorted by XP descending using the { xp: -1 } index
    const topUsers = await User.find({})
      .select('name avatar xp level totalStudyMinutes currentStreak')
      .sort({ xp: -1, createdAt: 1 })
      .limit(limit)
      .lean();

    // Attach dynamic rank numbers (1-indexed)
    const leaderboard = topUsers.map((user, index) => ({
      rank: index + 1,
      ...user
    }));

    // If user is authenticated, also calculate their personal rank
    let currentUserRank = null;
    if (req.user) {
      const usersAhead = await User.countDocuments({ xp: { $gt: req.user.xp } });
      currentUserRank = {
        rank: usersAhead + 1,
        userId: req.user._id,
        name: req.user.name,
        xp: req.user.xp,
        level: req.user.level
      };
    }

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      data: leaderboard,
      ...(currentUserRank && { currentUser: currentUserRank })
    });
  } catch (error) {
    next(error);
  }
};
