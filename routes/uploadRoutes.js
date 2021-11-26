const express = require("express");
const { uploadPhoto, deletePhoto } = require("../controllers/uploadController");

const router = express.Router();

router.route("/").post(uploadPhoto);

router.route("/:filename").delete(deletePhoto);

module.exports = router;
