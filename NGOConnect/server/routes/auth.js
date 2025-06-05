const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// @route   POST /signup
// @desc    Register a new user (NGO, Volunteer, Admin)
// @access  Public
router.post('/signup', signup);

// @route   POST /login
// @desc    Login user (NGO, Volunteer, Admin)
// @access  Public
router.post('/login', login);

module.exports = router;