const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');


const login = async (req, res) => {
  const { username, password } = req.body;

  // simple validation
  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // pretend we validated credentials and got an id
  const id = new Date().getDate();

  // create token
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
