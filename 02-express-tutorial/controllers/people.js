// Sample data for people
let people = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];

//const { people } = require('../data');
//Making small change so I can create new PR
const getPeople = (req, res) => {
    res.status(200).json(people);  // Return all people
};

const createPerson = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }

    // Create a new person and add to the people array
    const newPerson = { id: people.length + 1, name };
    people.push(newPerson);

    // Return success response
    res.status(201).json({ success: true, name: newPerson.name });
};
const addPerson = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }

    const newPerson = { id: people.length + 1, name };
    people.push(newPerson);
    res.status(201).json({ success: true, name: newPerson.name });
};

// Function to get a person by ID
const getPersonById = (req, res) => {
    const personId = parseInt(req.params.id);
    const person = people.find(p => p.id === personId);

    if (person) {
        return res.status(200).json(person);
    }

    return res.status(404).json({ message: 'Person not found' });
};

// Function to update a person by ID
const updatePerson = (req, res) => {
    const personId = parseInt(req.params.id);
    const person = people.find(p => p.id === personId);

    if (!person) {
        return res.status(404).json({ message: 'Person not found' });
    }

    const { name } = req.body;
    if (name) {
        person.name = name;
    }

    res.status(200).json({ success: true, updatedPerson: person });
};

// Function to delete a person by ID
const deletePerson = (req, res) => {
    const personId = parseInt(req.params.id);
    const personIndex = people.findIndex(p => p.id === personId);

    if (personIndex === -1) {
        return res.status(404).json({ message: 'Person not found' });
    }

    // Remove the person from the array
    people.splice(personIndex, 1);
    res.status(200).json({ success: true, message: 'Person deleted' });
};

module.exports = { getPeople, addPerson, getPersonById, updatePerson, deletePerson };
