require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); // clears the collection before inserting new data
    await Product.create(jsonProducts);
    console.log('Success! Data inserted.');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
