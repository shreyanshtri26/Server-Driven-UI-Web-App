const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   POST /api/register
// @desc    Register user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route   GET /api/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    // Keep error logging for server errors
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 