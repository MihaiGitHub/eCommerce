const express = require("express");

// invoke Express router
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { generateToken, processPayment } = require("../controllers/braintree");

// middleware
// anytime there is a userId param in the route execute userById method
router.param("userId", userById);

router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);
router.post(
  "/braintree/payment/:userId",
  requireSignin,
  isAuth,
  processPayment
);

module.exports = router;
