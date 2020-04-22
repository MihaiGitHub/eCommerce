exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
        .isLength({
            min: 6
        })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number')

    // grab all the errors if any
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg)[0]

        return res.status(400).json({
            error: firstError
        });
    }

    // move to next phase so app doesn't halt
    // needed everytime you create middleware
    next();
};