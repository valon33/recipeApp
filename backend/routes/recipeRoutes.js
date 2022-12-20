const express = require("express");
const {
  getAllRecipes,
  getMyrecipes,
  createRecipe,
  deleteRecipe,
  getRecipe,
  updateRecipe,
  likeRecipe,
  unLikeRecipe,
} = require("../controllers/recipeController");

const authController = require("../controllers/authController");

const router = express.Router();

router.route("/myrecipes").get(authController.protect, getMyrecipes);

// router.route("/like/:id").post(authController.protect, likeRecipe);
router.route("/like/:id").post(authController.protect, likeRecipe);
router.route("/unlike/:id").post(authController.protect, unLikeRecipe);

router.route("/").get(getAllRecipes).post(authController.protect, createRecipe);

router
  .route("/:id")
  .get(getRecipe)
  .patch(authController.protect, updateRecipe)
  .delete(
    authController.protect,
    // authController.restrictTo("admin"),
    deleteRecipe
  );

module.exports = router;
