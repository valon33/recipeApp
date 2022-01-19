// require("dotenv").config({ path: "./.env" });
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

console.log("bucketName", process.env.AWS_S3_BUCKET_NAME);
console.log("region", process.env.AWS_S3_BUCKET_REGION);
console.log("accessKeyId", process.env.AWS_S3_ACCESS_KEY);
console.log("secretAccessKeyId", process.env.AWS_S3_SECRET_ACCESS_KEY);

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_S3_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKeyId = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({ region, accessKeyId, secretAccessKeyId });

// upload a file to s3
exports.fileUploadS3 = async (req, res) => {
    // Binary data base64
    const fileContent = Buffer.from(req.files.photo.data, "binary");
    // Setting up S3 upload parameters
    const params = {
        Bucket: bucketName,
        Key: req.files.photo.name, // File name you want to save as in S3
        Body: fileContent,
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        res.status(200).json({
            status: "Success",
            data: data,
        });
        // res.send({
        //     response_code: 200,
        //     response_message: "Success",
        //     response_data: data,
        // });
    });
};

// download a file from s3
exports.fileDownloadS3 = async (req, res) => {
    const fileNameS3 = req.params.key;

    const downloadParams = {
        Key: fileNameS3,
        Bucket: bucketName,
    };

    const readStream = s3.getObject(downloadParams).createReadStream();

    readStream.pipe(res);
};
