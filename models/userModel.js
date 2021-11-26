const mongoose = require("mongoose");
const { isEmail } = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "Please provide a valid email"],
  },
  birthday: {
    type: Date,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    min: 6,
    max: 32,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
