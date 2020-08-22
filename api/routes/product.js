const express = require('express');
const router = express.Router();

const { 
    create, 
    productById, 
    read, 
    remove, 
    update, 
    list, 
    listRelated, 
    listCategories,
    listBySearch,
    listSearch,
    photo
} = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// middleware
// anytime there is a userId param in the route execute userById method
router.param('userId', userById);
router.param('productId', productById);

// routes
// use requireSignin, isAuth, isAdmin as middleware for this route
router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);
router.get('/products', list);
router.get('/products/search', listSearch);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);

module.exports = router;