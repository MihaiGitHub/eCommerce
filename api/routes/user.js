const express = require('express');

// invoke Express router
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, read, update } = require('../controllers/user');

// middleware
// anytime there is a userId param in the route execute userById method
router.param('userId', userById);

// routes
// to access this route you have to be currently logged in, currently authenticated user and an admin
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile // req.profile filled in middleware userById
    });
});
router.get('/user/:userId', requireSignin, isAuth, read);
router.patch('/user/:userId', requireSignin, isAuth, update);

module.exports = router;