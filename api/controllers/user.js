const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

// middleware that adds the user to the request
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // store user data in req.profile
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  // do not send hashed password and salt in response
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

exports.update = (req, res) => {
  // find user by id, req.profile filled out by userById method
  // $set - method for updating the user found, new: true - newly updated json will be sent to frontend
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }

      // if no error return the user to frontend without hashed password and salt
      user.hashed_password = undefined;
      user.salt = undefined;

      res.json(user);
    }
  );
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Could not update user purchase history",
        });
      }
      next();
    }
  );
};

exports.purchaseHistory = (req, res) => {
  User.findById(req.profile._id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    res.status(200).json(user.history);
  });
};
