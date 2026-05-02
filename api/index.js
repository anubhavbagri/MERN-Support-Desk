const express = require('express');
const cors = require('cors');
const { errorHandler } = require('../backend/middleware/errorMiddleware');
const connectDB = require('../backend/config/db');

// Initialize app
const app = express();

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check route (no DB needed)
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

// Debug route to test DB connection
app.get('/api/health', async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ 
      status: 'ok',
      database: 'connected',
      envCheck: 'MONGO_URI is set'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      database: 'failed',
      errorMessage: error.message,
      envCheck: process.env.MONGO_URI ? 'MONGO_URI is set' : 'MONGO_URI is NOT set'
    });
  }
});

// Connect to database before handling API requests
app.use('/api/users', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
}, require('../backend/routes/userRoutes'));

app.use('/api/tickets', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
}, require('../backend/routes/ticketRoutes'));

// Error handler middleware
app.use(errorHandler);

// Export for Vercel serverless
module.exports = app;
