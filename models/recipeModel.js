const mongoose = require("mongoose");
const slugify = require("slugify");

const { Schema } = mongoose;

const recipeSchema = new Schema({
  recipeTitle: {
    type: String,
    required: [true, "Recipe must have a name"],
    trim: true,
    maxlength: [40, "Recipe name must have less or equal then 40 characters"],
    minlength: [3, "Recipe name must have more ore equal than 3 characters"],
  },
  photo: {
    type: String,
  },
  prepTime: {
    type: Number,
    required: [true, "Recepie must have preparation time"],
  },
  recipe: {
    type: String,
    required: [true, "Recipe must have a description"],
    trim: true,
    minlength: [20, "Recipe must have more ore equal than 20characters"],
    maxlength: [2000, "Recipe must have less or equal than 2000characters"],
  },
  shortDescription: {
    type: String,
    trim: true,
    minlength: [
      20,
      "Recipe short description must have more or equal than 20 characters",
    ],
    maxlength: [
      1000,
      "Recipe short description must have less or equal than 1000 characters",
    ],
  },
  numberPeople: {
    type: Number,
    default: 4,
  },
  category: {
    type: String,
    lowercase: true,
    require: [true, "Recipe must belong to one of the categories"],
    enum: ["breakfast", "brunch", "lunch", "dinner"],
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

recipeSchema.pre("save", function (next) {
  this.slug = slugify(this.recipeTitle, { lower: true });
  next();
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
