const express = require('express');

const app = express();

const path = require('path');

// Require data from data.js
const { products } = require('./data');

app.use(express.static(path.join(__dirname, 'public')));
//console.log('Express Tutorial')

// app.get('/', (req, res) => {
//     res.send('Hello, welcome to my Express app!');
//   });
/* 
//   app.post('/submit', (req, res) => {
//     res.send('Data received!');
//   }); */


/* 
app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" });
  }); */

  app.get('/api/v1/products', (req, res) => {
    res.json(products);
  });


  app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID); 
    const product = products.find(p => p.id === idToFind); 

    if (product) {
      res.json(product); 
    } else {
      res.status(404).send('Product not found'); 
    }
  });


  app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query;  
    let result = products;
  

    if (search) {
      result = result.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }
  
    // If a 'limit' query is provided, slice the array to limit the number of results
    if (limit) {
      result = result.slice(0, parseInt(limit));
    }
  
    // Send the filtered result as a JSON response
    res.json(result);
  });
  
  // Optional: Filter products based on price
  app.get('/api/v1/query/price', (req, res) => {
    const { maxPrice, limit } = req.query;
    let result = products;
  
    // If a 'maxPrice' query is provided, filter the products based on price
    if (maxPrice) {
      result = result.filter(product => product.price < parseFloat(maxPrice));
    }
  
    // If a 'limit' query is provided, slice the array to limit the number of results
    if (limit) {
      result = result.slice(0, parseInt(limit));
    }
  
    // Send the filtered result as a JSON response
    res.json(result);
  });

  app.all('*', (req, res) => {
    res.status(404).send('Page not found');
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  })