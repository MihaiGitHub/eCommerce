const express = require('express')

// invoke Express router
const router = express.Router()

const { signup } = require('../controllers/user')
const { userSignupValidator } = require('../validator/index')

// routes
// use userSignupValidator as middleware for this route
router.post('/signup', userSignupValidator, signup)

module.exports = router