import mongoose from 'mongoose';

/**
 * User Schema
 *
 * Represents a registered user in FocusNest.
 * Note: Authentication identity is managed by Firebase Authentication.
 * `firebaseUid` is the immutable primary link between Firebase Auth and MongoDB.
 */
const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: [true, 'Firebase UID is required'],
      unique: true,
      index: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Please provide a valid email address'
      ]
    },
    avatar: {
      type: String,
      default: '',
      trim: true
    },
    xp: {
      type: Number,
      default: 0,
      min: [0, 'XP cannot be negative']
    },
    level: {
      type: Number,
      default: 1,
      min: [1, 'Level must be at least 1']
    },
    totalStudyMinutes: {
      type: Number,
      default: 0,
      min: [0, 'Total study minutes cannot be negative']
    },
    currentStreak: {
      type: Number,
      default: 0,
      min: [0, 'Current streak cannot be negative']
    },
    longestStreak: {
      type: Number,
      default: 0,
      min: [0, 'Longest streak cannot be negative']
    },
    lastStudyDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Secondary index for XP to power the leaderboard efficiently
userSchema.index({ xp: -1 });

const User = mongoose.model('User', userSchema);

export default User;
