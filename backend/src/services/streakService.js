/**
 * Streak Service
 *
 * Tracks and updates consecutive daily study streaks.
 * Uses calendar days (UTC normalized) rather than raw 24-hour millisecond windows:
 * - First study day -> streak = 1
 * - Study again on the next calendar day -> increment streak
 * - Study on the same calendar day -> maintain current streak without duplicate increment
 * - Miss 1 or more calendar days -> reset streak to 1
 * - Update longestStreak whenever currentStreak exceeds it
 */

/**
 * Calculate the difference in calendar days between two dates
 * @param {Date|string} dateEarlier
 * @param {Date|string} dateLater
 * @returns {number} difference in calendar days
 */
export const getCalendarDayDifference = (dateEarlier, dateLater) => {
  const d1 = new Date(dateEarlier);
  const d2 = new Date(dateLater);

  // Normalize both dates to UTC midnight to compare calendar days accurately
  const utc1 = Date.UTC(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate());
  const utc2 = Date.UTC(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((utc2 - utc1) / msPerDay);
};

/**
 * Update user streak based on a new study session
 * @param {Object} user - User document/object with currentStreak, longestStreak, lastStudyDate
 * @param {Date} [sessionDate=new Date()] - Date of the completed study session
 * @returns {{ currentStreak: number, longestStreak: number, lastStudyDate: Date, streakIncremented: boolean, streakReset: boolean }}
 */
export const calculateStreakUpdate = (user, sessionDate = new Date()) => {
  let currentStreak = user.currentStreak || 0;
  let longestStreak = user.longestStreak || 0;
  const lastStudyDate = user.lastStudyDate;

  let streakIncremented = false;
  let streakReset = false;

  if (!lastStudyDate) {
    // First study session ever
    currentStreak = 1;
    longestStreak = Math.max(longestStreak, 1);
    streakIncremented = true;
  } else {
    const dayDiff = getCalendarDayDifference(lastStudyDate, sessionDate);

    if (dayDiff === 0) {
      // Studied again on the same calendar day -> keep streak, don't increment
      streakIncremented = false;
    } else if (dayDiff === 1) {
      // Studied on the next consecutive calendar day -> increment streak
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
      streakIncremented = true;
    } else if (dayDiff > 1) {
      // Missed at least one calendar day -> streak reset to 1
      currentStreak = 1;
      longestStreak = Math.max(longestStreak, 1);
      streakReset = true;
    }
    // If dayDiff < 0 (session date in the past relative to last study), we keep current values
  }

  return {
    currentStreak,
    longestStreak,
    lastStudyDate: sessionDate,
    streakIncremented,
    streakReset
  };
};
