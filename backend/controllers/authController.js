const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { createSendToken } = require("../utils/crateSendToken");
// const sendEmail = require('./../utils/email');

// *route   Post api/v1/users/signup
// *desc    Sign Up
// *access  Public

exports.signUp = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return next(new AppError("Bad request. Email is already in use", 400));
    }

    if (!req.body.password || req.body.password !== req.body.passwordConfirm) {
        return next(
            new AppError(
                "Bad request. Password does not exist or does not match the confirmation password.",
                400
            )
        );
    }

    req.body.passwordConfirm = undefined;
    req.body.password = bcrypt.hashSync(req.body.password);
    const newUser = await User.create({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.date,
    });

    createSendToken(newUser, 201, res);
});

// *route   Post api/v1/users/login
// *desc    Log In
// *access  Public

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError("Bad request. Email not registered.", 400));
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return next(new AppError("Bad request. Passwords do not match.", 400));
    }

    createSendToken(user, 200, res);
});

exports.chekUser = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (req.headers.cookie) {
        token = req.headers.cookie.split("=")[1];
    }

    if (!token) {
        return next(new AppError("There is no user logged in!", 401));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    const { email, name, lastName, birthday, _id, role, photo, password } =
        currentUser;
    const curUser = {
        email,
        name,
        lastName,
        birthday,
        _id,
        role,
        photo,
        password,
    };
    res.status(200).json({ status: "success", user: curUser });
    // res.status(200).json({ status: "success", user: currentUser });
});

// *desc   Middlewear for verification if the user is log in

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (req.headers.cookie) {
        token = req.headers.cookie.split("=")[1];
    }

    if (!token) {
        return next(
            new AppError(
                "You are not logged in! Please log in to get access.",
                401
            )
        );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                "User recently changed password! Please log in again.",
                401
            )
        );
    }

    //!Access Granted
    req.user = currentUser;
    next();
});

// *desc   Middlewear for verification of user role

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "You do not have permission to perform this action",
                    403
                )
            );
        }

        next();
    };
};

// *route   Post api/v1/users/updatepassword
// *desc    Reset Password
// *access  Public

exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select("+password");

    // 2) Check if POSTed current password is correct

    if (!bcrypt.compareSync(req.body.passwordCurrent, user.password)) {
        return next(new AppError("Your current password is wrong.", 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    if (!req.body.password || req.body.password !== req.body.passwordConfirm) {
        return next(
            new AppError(
                "Bad request. Password does not exist or does not match the confirmation password.",
                400
            )
        );
    }

    user.password = bcrypt.hashSync(user.password);
    user.passwordConfirm = undefined;

    createSendToken(newUser, 201, res);

    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
});

exports.logOut = (req, res) => {
    res.cookie("jwt", " ", { maxAge: 1 });

    res.status(200).json({
        msg: "Loged Out",
    });
};
