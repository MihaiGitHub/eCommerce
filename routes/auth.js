const express = require('express');

// invoke Express router
const router = express.Router();

const { signup, signin, signout, requireSignin } = require('../controllers/auth');
const { userSignupValidator } = require('../validator');

// routes
// use userSignupValidator as middleware for this route
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;