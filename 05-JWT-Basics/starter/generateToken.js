require('dotenv').config();
const jwt = require('jsonwebtoken');

const payload = {
  id: 123, // dummy ID
  username: 'testuser'
};

const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_LIFETIME,
});

console.log('Your JWT token:\n');
console.log(token);
