const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllRecipes = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.find();

    res.status(200).json({
        status: "success",
        numOfRecipes: recipe.length,
        data: {
            recipe,
        },
    });
});

exports.getMyrecipes = catchAsync(async (req, res, next) => {
    const recipes = await Recipe.find({ author: req.user._id });
    
    res.status(200).json({
        status: "success",
        numOfRecipes: recipes.length,
        data: {
            recipes,
        },
    });
});

exports.createRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.create({ ...req.body, author: req.user._id });

    res.status(200).json({
        status: "success",
        data: {
            recipe,
        },
    });
});

exports.getRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        return next(new AppError("There is no Recipe with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            recipe,
        },
    });
});

exports.updateRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!recipe) {
        return next(new AppError("There is no Recipe with that Id!", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            recipe,
        },
    });
});

exports.likeRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id);


    if (!recipe) {
        return next(new AppError("There is no Recipe with that ID", 404));
    }

    if (
        recipe.likes.filter(
            (like) => like.user.toString() === req.user._id.toString()
        ).length > 0
    ) {
        return next(new AppError("User already liked this recipes", 400));
    }
    recipe.likes.unshift({ user: req.user._id });

    const likedRecipe = await recipe.save();

    res.status(200).json({
        status: "success",
        data: {
            likedRecipe,
        },
    });
});

exports.unLikeRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
        return next(new AppError("There is no Recipe with that ID", 404));
    }

    if (
        recipe.likes.filter(
            (like) => like.user.toString() === req.user._id.toString()
        ).length === 0
    ) {
        return next(new AppError("User has not yet liked this recipe", 400));
    }

    const removeIndex = recipe.likes
        .map((item) => item.user.toString())
        .indexOf(req.user.id);

    recipe.likes.splice(removeIndex, 1);

    const unlikedRecipe = await recipe.save();

    res.status(200).json({
        status: "success",
        data: {
            unlikedRecipe,
        },
    });
});

exports.deleteRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
        return next(new AppError("There is no Recipe with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
