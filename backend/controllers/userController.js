const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { isValidObjectId } = require("mongoose");

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("There is no User with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("There is no User with that Id", 404));
  }

  if (!req.body.password || req.body.password !== req.body.passwordConfirm) {
    return next(
      new AppError(
        "Bad request. Password does not exist or does not match the confirmation password.",
        400
      )
    );
  }

  req.body.password = bcrypt.hashSync(req.body.password);

  req.user.name = req.body.name;
  req.user.lastName = req.body.lastName;
  req.user.email = req.body.email;
  req.user.password = req.body.password;
  await req.user.save();

  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError("There is no User with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.changeUserPassword = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("There is no User with that Id", 404));
  }
  console.log(req.user);
  // const user = await User.findOne({ email });

  // if (!user) {
  //   return next(new AppError("Bad request. Email not registered.", 400));
  // }

  if (!bcrypt.compareSync(req.body.oldPassword, req.user.password)) {
    return next(new AppError("Bad request.Old Password do not match.", 400));
  }

  if (!req.body.password || req.body.password !== req.body.passwordConfirm) {
    return next(
      new AppError(
        "Bad request. Password does not exist or does not match the confirmation password.",
        400
      )
    );
  }

  req.body.password = bcrypt.hashSync(req.body.password);

  req.user.password = req.body.password;
  await req.user.save();
  req.user.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("There is no User with that id", 404));
  }

  res.status(200).json({
    status: "success",
    msg: "User has been deleted",
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
