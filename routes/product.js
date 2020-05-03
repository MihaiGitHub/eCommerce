const express = require('express');
const router = express.Router();

const { create, productById, read, remove } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// middleware
// anytime there is a userId param in the route execute userById method
router.param('userId', userById);
router.param('productId', productById);

// routes
// use requireSignin, isAuth, isAdmin as middleware for this route
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);

module.exports = router;