// app.js

const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');

// Import routes
const authRouter = require('./routes/auth');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');

// Import middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Middleware
app.use(express.json());
app.use(express.static('./public'));

// Routes
app.use('/api/v1', authRouter);
app.use('/api/v1', loginRouter);
app.use('/api/v1/dashboard', dashboardRouter);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
