const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide username and password' });
  }

  // Normally, you'd fetch user from the database here
  const id = new Date().getDate();

  // Create JWT
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(200).json({ msg: 'User created', token });
});

module.exports = router;
