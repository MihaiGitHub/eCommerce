const express = require('express');
const router = express.Router();

const { create } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// middleware
// anytime there is a userId param in the route execute userById method
router.param('userId', userById);

// routes
// use requireSignin, isAuth, isAdmin as middleware for this route
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

module.exports = router;