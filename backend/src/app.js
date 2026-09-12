import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { notFound } from './middleware/notFoundMiddleware.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();

// 1. Security Middleware
app.use(helmet());

// 2. CORS Middleware
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: [clientUrl, 'http://localhost:3000'],
    credentials: true
  })
);

// 3. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Request Logging (HTTP request logger)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// 5. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FocusNest API is running'
  });
});

// 6. API Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/ai', aiRoutes);

// 7. 404 Catch-all Handler (Must come after all defined routes)
app.use(notFound);

// 8. Centralized Error Handler (Must be the last middleware mounted)
app.use(errorHandler);

export default app;