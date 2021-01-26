const express = require("express");

// invoke Express router
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { create, listOrders } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

// middleware
// anytime there is a userId param in the route execute userById method
router.param("userId", userById);

// routes
router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);
router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);

module.exports = router;
