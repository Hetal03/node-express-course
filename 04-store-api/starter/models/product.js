const mongoose = require('mongoose');

// Create Schema for Product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    default: 0,
  },
  rating: {
    type: Number,
    default: 4.0,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
    enum: {
      values: ['nike', 'adidas', 'puma', 'reebok', 'marcos', 'liddy', 'ikea', 'caressa'],
      message: '{VALUE} is not a valid company',
    },
    required: [true, 'Please provide a company'],
  },
});

// Create model from schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
