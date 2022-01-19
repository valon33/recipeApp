const express = require("express");
const { uploadPhoto, deletePhoto } = require("../controllers/uploadController");
const { fileUploadS3, fileDownloadS3 } = require("../s3");

const router = express.Router();

router.route("/").post(fileUploadS3);

router.route("/:key").get(fileDownloadS3);

//router.route("/:filename").delete(deletePhoto);

module.exports = router;
