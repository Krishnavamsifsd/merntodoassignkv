const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/create-account', async (req, res) => {
  const { username, password } = req.body;
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create new user object
  const user = new User({ username, password: hashedPassword });
  // Save user to database
  try {
    await user.save();
    res.json({ message: 'Account created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
