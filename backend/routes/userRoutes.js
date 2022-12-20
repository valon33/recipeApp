const express = require("express");

// const userController = require('../controllers/userController')
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();
router.get("/logout", authController.logOut);

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/creatadminuser", userController.createUser);
router.post("/updateme", authController.protect, userController.updateMe);
router.get("/currentuser", authController.chekUser);
router.delete("/deleteme", authController.protect, userController.deleteMe);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );

router
  .route("/:id")
  .get(userController.getUser)
  .patch(authController.protect, userController.updateUser)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  );

module.exports = router;
