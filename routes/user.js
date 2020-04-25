const express = require('express');

// invoke Express router
const router = express.Router();

const { signup, signin, signout, requireSignin } = require('../controllers/user');
const { userSignupValidator } = require('../validator/index');

// routes
// use userSignupValidator as middleware for this route
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;