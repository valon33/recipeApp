const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const recipeRouter = require("./routes/recipeRoutes");
const userRouter = require("./routes/userRoutes");
const uploadRouter = require("./routes/uploadRoutes");

const app = express();

app.use(fileUpload());

app.enable("trust proxy");

app.use(morgan("dev"));

app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.options("*", cors());

app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/upload", uploadRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.all("*", (req, res, next) => {
    next(
        new AppError(
            `Route ${req.originalUrl} is not defined on the server! 😒😒`,
            404
        )
    );
});

app.use(globalErrorHandler);

module.exports = app;
