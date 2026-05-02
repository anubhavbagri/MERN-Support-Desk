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

// Connect to database before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error.message);
    res.status(500).json({ 
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message,
      envCheck: process.env.MONGO_URI ? 'MONGO_URI is set' : 'MONGO_URI is NOT set'
    });
  }
});

// Routes
app.use('/api/users', require('../backend/routes/userRoutes'));
app.use('/api/tickets', require('../backend/routes/ticketRoutes'));

// Root route
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

// Error handler middleware
app.use(errorHandler);

// Export for Vercel serverless
module.exports = app;
