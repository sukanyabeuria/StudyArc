import dotenv from 'dotenv';

// Load environment variables from .env file before anything else
dotenv.config();

import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { initFirebase } from './src/config/firebase.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Initialize Firebase Admin
  initFirebase();

  // Start HTTP Server
  const server = app.listen(PORT, () => {
    console.log(`\n🚀 StudyArc Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`📡 Health Check URL: http://localhost:${PORT}/api/health\n`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    // Close server & exit process in production
    if (process.env.NODE_ENV === 'production') {
      server.close(() => process.exit(1));
    }
  });
};

startServer();