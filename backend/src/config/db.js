import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * Uses MONGODB_URI environment variable
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[Database Warning] MONGODB_URI is not configured in environment variables.');
    return null;
  }
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    console.warn(
      `[Database Warning] Please ensure your MongoDB Atlas URI is set in Render environment variables (or local mongod is running).`
    );
    // Background retry without killing the process so Gemini AI and health checks remain 100% active
    setTimeout(() => {
      connectDB().catch(() => {});
    }, 10000);
    return null;
  }
};
