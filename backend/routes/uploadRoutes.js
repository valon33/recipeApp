const express = require("express");
const {fileUploadCloudinary} = require("../cloudinary")

const router = express.Router();

router.route("/").post(fileUploadCloudinary);


module.exports = router;
