const express = require('express');

// invoke Express router
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/secret/:userId', requireSignin, (req, res) => {
    res.json({
        user: req.profile // req.profile filled in middleware userById
    });
});

// middleware
// anytime there is a userId param in the route execute userById method
router.param('userId', userById);

module.exports = router;