const User = require('../models/user')
const jwt = require('jsonwebtoken') // to generate signed token
const expressJwt = require('express-jwt') // for authorization check
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.signup = (req, res) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        }

        // do not send sensitive data back
        user.salt = undefined
        user.hashed_password = undefined

        res.json({
            user
        });
    })
}

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;

    User.findOne({
        email
    }, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                err: "User with that email does not exist. Please signup"
            });
        }

        // if user is found make sure email and password match
        // encrypt password coming from front end and compare to the password in the db
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }

        // once authenticated, generate a signed token using the user id and JWT_SECRET
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        // add token into a cookie with a t and add expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });

        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role }});
    });
};

exports.signout = (req, res) => {
    // clear token from cookie
    res.clearCookie('t');
    res.json({ message: 'Signout sucess' });
};

// middleware to protect a route to only logged in users
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth' // adding auth as user property
});

exports.isAuth = (req, res, next) => {
    // user variable to check req.profile && req.auth if true
    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    if(!user){
        return res.status(403).json({
            error: 'Access denied'
        });
    }

    // use next because this is middleware so app doesn't get hung
    next();
};

// middleware for checking user role
exports.isAdmin = (req, res, next) => {    
    if(req.profile.role === 0){
        return res.status(403).json({
            error: 'Admin resource! Access denied'
        });
    }

    next();
};