import User from '../models/User.js';

/**
 * @desc    Get currently authenticated user profile
 * @route   GET /api/users/me
 * @access  Private (Authenticated)
 */
export const getMe = async (req, res, next) => {
  try {
    // req.user was attached by authMiddleware
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update currently authenticated user profile
 * @route   PUT /api/users/me
 * @access  Private (Authenticated)
 */
export const updateMe = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (avatar !== undefined) updates.avatar = avatar.trim();

    // Notice we DO NOT allow modifying:
    // firebaseUid, email, xp, level, totalStudyMinutes, currentStreak, longestStreak, lastStudyDate
    // This prevents client-side tampering with gamification data.

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};
