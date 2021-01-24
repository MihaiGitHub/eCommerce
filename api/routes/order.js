const express = require("express");

// invoke Express router
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { create } = require("../controllers/order");

// middleware
// anytime there is a userId param in the route execute userById method
router.param("userId", userById);

// routes
router.post("/order/create/:userId", requireSignin, isAuth, create);

module.exports = router;
