const express = require('express');
const router = express.Router();
//const { getPeople, createPerson, } = require('../controllers/people');  // Import controller functions

// Define routes for '/api/v1/people'
//router.get('/', getPeople);  // Route to get all people
//router.post('/', createPerson);  // Route to create a new person
//router.post('/', addPerson); 

const { getPeople, addPerson, getPersonById, updatePerson, deletePerson } = require('../controllers/people');

// Define the routes for '/api/v1/people'
router.get('/', getPeople); // Get all people
router.post('/', addPerson); // Add a new person

// Get a particular person by ID
router.get('/:id', getPersonById);

// Update a person by ID
router.put('/:id', updatePerson);

// Delete a person by ID
router.delete('/:id', deletePerson);
module.exports = router;
