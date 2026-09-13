import dotenv from 'dotenv';

// Load environment variables from .env file before anything else
dotenv.config();

import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { initFirebase } from './src/config/firebase.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Start HTTP Server immediately so Render health check passes instantly
  const server = app.listen(PORT, () => {
    console.log(`\n🚀 StudyArc Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`📡 Health Check URL: http://localhost:${PORT}/api/health\n`);
  });

  // Connect to Database asynchronously
  connectDB().catch((err) => {
    console.warn(`[Database Warning] Async DB connection: ${err.message}`);
  });

  // Initialize Firebase Admin
  try {
    initFirebase();
  } catch (err) {
    console.warn(`[Firebase Warning] ${err.message}`);
  }

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
  });
};

startServer();