const Product = require('../models/product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get a single product by ID
const getSingleProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: `No product with id ${productId}` });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update product by ID
const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ msg: `No product with id ${productId}` });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


// Delete product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ msg: `No product with id ${productId}` });
    }
    res.status(200).json({ msg: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


const getAllProducts = async (req, res) => {
    //res.status(200).json({ msg: 'get all products' });

    try {
      
      const { featured, company, name, sort, fields, numericFilters }  = req.query;
      const queryObject = {};
    
      if (featured) {
        queryObject.featured = featured === 'true';
      }
    
      if (company) {
        queryObject.company = company;
      }
    
      if (name) {
        queryObject.name = { $regex: name, $options: 'i' }; // case-insensitive
      }

      // Numeric Filters
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /(<|>|>=|=|<|<=)/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ['price', 'rating'];
    filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }


      let result = Product.find(queryObject);

      // Sort
      if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
      } else {
        result = result.sort('createdAt');
      }
    
      // Select Fields
      if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
      }
    
      // Pagination
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
    
      result = result.skip(skip).limit(limit);
    

      //const products = await Product.find(queryObject);
      const products = await result;
      res.status(200).json({ products, nbHits: products.length });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  const getAllProductsStatic = async (req, res) => {
   // res.status(200).json({ msg: 'get all products static' });
  try {

    const products = await Product.find({price: { $gt: 30} })
    .sort('price')
    .select('name price')
    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

  };
  
  module.exports = {
    getAllProducts,
    getAllProductsStatic,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
  };
  