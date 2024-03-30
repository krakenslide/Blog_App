const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const {
    notFound,
    errorHandler,
} = require("./middlewares/errorhandlers.middleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const app = express();
const Port = process.env.PORT;

mongoose
    .connect(process.env.CONN_STRING)
    .then(() => {
        console.log("Connected to MongoDb");
    })
    .catch((error) => console.log("Error while connecting to MongoDb. ", error));

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(Port, () => {
    console.log("Server is running on Port:", Port);
});
