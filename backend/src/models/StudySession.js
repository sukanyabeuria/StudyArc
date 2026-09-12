import mongoose from 'mongoose';

/**
 * StudySession Schema
 *
 * Tracks individual study or pomodoro sessions completed by users.
 * Directly fuels XP gain, study minutes, streaks, and leveling.
 */
const studySessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true
    },
    duration: {
      type: Number,
      required: [true, 'Session duration in minutes is required'],
      min: [1, 'Duration must be at least 1 minute']
    },
    type: {
      type: String,
      enum: {
        values: ['pomodoro', 'short_break', 'long_break'],
        message: '{VALUE} is not a valid session type'
      },
      default: 'pomodoro'
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Compound index to quickly fetch a user's recent study history
studySessionSchema.index({ userId: 1, createdAt: -1 });

const StudySession = mongoose.model('StudySession', studySessionSchema);

export default StudySession;
