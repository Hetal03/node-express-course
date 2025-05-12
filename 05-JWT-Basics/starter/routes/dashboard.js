const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/dashboard', authMiddleware, (req, res) => {
  res.status(200).json({ msg: `Hello, ${req.user.username}` });
});

module.exports = router;
