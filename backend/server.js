const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception - Server is shuting down...");
    console.log(err);
    console.log(err.message);
    process.exit(1);
});

const app = require("./app");

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful!"));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on port: ${process.env.PORT || 5000}`);
});

process.on("unhandledRejection", (err) => {
    console.log("UnHandled Rejaction - Server is shuting down...");
    console.log(err.message);
    server.close(() => {
        process.exit(1);
    });
});
