const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// middleware
// anytime there is a userId param in the route execute userById method
router.param('userId', userById);
router.param('categoryId', categoryById);

// routes
// use requireSignin, isAuth, isAdmin as middleware for this route
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/category/:categoryId', read);
router.get('/categories', list);

module.exports = router;