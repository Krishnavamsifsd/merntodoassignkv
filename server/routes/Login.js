const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  // Set token as cookie
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
  res.json({ message: 'Login successful' });
});

module.exports = router;
