const jwt = require("jsonwebtoken");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 hour
        path: "/",
    };
    // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    // res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    // res.cookie("jwt", token, cookieOptions);
    res.cookie("jwt", token);

    user.password = undefined;
    // Remove password from output

    res.status(statusCode).json({
        status: "success",
        data: {
            token,
            user,
        },
    });
};

module.exports = { createSendToken, signToken };
