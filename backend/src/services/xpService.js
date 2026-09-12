/**
 * XP & Leveling Service
 *
 * Handles gamification calculations:
 * - 1 study minute = 1 XP (e.g. 25 min Pomodoro = 25 XP)
 * - Level progression based on progressive XP thresholds
 */

// Level thresholds: simple, transparent progression
const LEVEL_TABLE = [
  { level: 1, minXp: 0, nextLevelXp: 100 },
  { level: 2, minXp: 100, nextLevelXp: 250 },
  { level: 3, minXp: 250, nextLevelXp: 500 },
  { level: 4, minXp: 500, nextLevelXp: 850 },
  { level: 5, minXp: 850, nextLevelXp: 1300 },
  { level: 6, minXp: 1300, nextLevelXp: 1850 },
  { level: 7, minXp: 1850, nextLevelXp: 2500 },
  { level: 8, minXp: 2500, nextLevelXp: 3250 },
  { level: 9, minXp: 3250, nextLevelXp: 4100 },
  { level: 10, minXp: 4100, nextLevelXp: 5050 }
];

/**
 * Calculate XP awarded for a given study duration
 * Rule: 1 study minute = 1 XP
 * @param {number} durationInMinutes
 * @returns {number} xpAwarded
 */
export const calculateXp = (durationInMinutes) => {
  if (!durationInMinutes || durationInMinutes < 1) return 0;
  return Math.round(durationInMinutes);
};

/**
 * Calculate user level and progress based on total XP
 * @param {number} totalXp
 * @returns {{ level: number, nextLevelXp: number, currentLevelBaseXp: number }}
 */
export const calculateLevelInfo = (totalXp) => {
  const xp = Math.max(0, totalXp || 0);

  // Check defined table first
  for (let i = LEVEL_TABLE.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_TABLE[i].minXp) {
      return {
        level: LEVEL_TABLE[i].level,
        currentLevelBaseXp: LEVEL_TABLE[i].minXp,
        nextLevelXp: LEVEL_TABLE[i].nextLevelXp
      };
    }
  }

  // Fallback for levels beyond level 10 (+1000 XP per level)
  const highest = LEVEL_TABLE[LEVEL_TABLE.length - 1];
  const excessXp = xp - highest.nextLevelXp;
  const extraLevels = Math.floor(excessXp / 1000) + 1;
  const currentLevel = highest.level + extraLevels;
  const currentLevelBaseXp = highest.nextLevelXp + (extraLevels - 1) * 1000;
  const nextLevelXp = currentLevelBaseXp + 1000;

  return {
    level: currentLevel,
    currentLevelBaseXp,
    nextLevelXp
  };
};

/**
 * Convenience function returning just the level number
 * @param {number} totalXp
 * @returns {number}
 */
export const calculateLevel = (totalXp) => {
  return calculateLevelInfo(totalXp).level;
};
