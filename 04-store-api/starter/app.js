require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productRoutes = require('./routes/products');

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/v1/products', productRoutes);

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    app.listen(3000, () => {
      console.log('Server is listening on port 3000...');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
