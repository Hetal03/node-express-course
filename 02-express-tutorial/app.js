const express = require('express');

const path = require('path');
const app = express();


const peopleRouter = require('./routes/people');


app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data (e.g., form data)
app.use(express.json());


/*const router = express.Router();
const { getPeople, createPerson } = require('../controllers/people');

// GET all people
router.get('/', getPeople);

// POST create a new person
router.post('/', createPerson);

module.exports = router;

*/


const logger = (req, res, next) => {
    const currentTime = new Date().toLocaleString(); // get local time string
    console.log(`[${currentTime}] ${req.method} ${req.url}`); // 👈 Logs method, url, time
    next();
  };


app.use(logger);


app.use('/api/v1/people', peopleRouter);
// Require data from data.js
//const { products } = require('./data'); //week3



// Add middleware to parse request bodies


//app.use(express.static(path.join(__dirname, 'public')));



const { products, people } = require('./data');

//const peopleRouter = require('./routes/people');


app.use(express.static(path.join(__dirname, 'methods-public')));

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
 
  
 /* app.get('/api/v1/products', logger, (req, res) => {
    res.json(products);
  });*/

 // app.use(logger);

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

 // Endpoint to get all people
 app.get('/api/v1/people', (req, res) => {
    //console.log("GET /api/v1/people hit");
    res.status(200).json(people);
  });
  
  
  // Endpoint to add a new person week 4
  app.post('/api/v1/people', (req, res) => {
    // Check if name is provided in the body
    if (!req.body.name) {
      return res.status(400).json({ success: false, message: "Please provide a name" });
    }
  
    // Add a new person to the people array
    people.push({ id: people.length + 1, name: req.body.name });
  
    // Return a success response
    res.status(201).json({ success: true, name: req.body.name });
  });
  

  app.all('*', (req, res) => {
    res.status(404).send('Page not found');
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });