import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * Uses MONGODB_URI environment variable
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    console.warn(
      `[Database Warning] Make sure MongoDB is running locally or check your MONGODB_URI in .env`
    );
    // In production we would exit, in local development we allow the server to run so health-check can be inspected
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
