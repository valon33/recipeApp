const fs = require("fs");
const path = require("path");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.uploadPhoto = catchAsync(async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    console.log(req.files);
    console.log(__dirname);
    const photo = req.files.photo;
    // const uploadPath = __dirname + "./client/src/assets/images/" + photo.name;
    const uploadPath = path.join(
        __dirname,
        "../client/public/images/",
        // "../client/src/assets/images/",
        photo.name
    );

    photo.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        console.log(err);
    });

    res.status(200).json({
        status: true,
        message: "File is uploaded",
        data: {
            name: photo.name,
            mimetype: photo.mimetype,
            size: photo.size,
        },
    });
});

exports.deletePhoto = catchAsync(async (req, res) => {
    try {
        // const uploadDirectory = __dirname + "/client/src/assets";
        const uploadDirectory = path.join(
            __dirname,
            "../client/src/assets/images"
        );
        console.log(uploadDirectory);
        const file = `${uploadDirectory}/${req.params.filename}`;

        fs.unlinkSync(file);
        res.status(200).json({
            status: "success",
            msg: `File with name ${req.params.filename} is successfully deleted`,
        });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.stack });
    }
});
