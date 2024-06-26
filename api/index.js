const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");
const {
  notFound,
  errorHandler,
} = require("./middlewares/errorhandlers.middleware");
const postRoutes = require("./routes/posts.routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const Port = process.env.PORT;

mongoose
  .connect(process.env.ATLAS_STRING)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => console.log("Error while connecting to MongoDb. ", error));

app.use(
  cors({
    origin: [
      "https://blog-app-xi-one.vercel.app",
      "https://blog-ekl5wlui8-ankits-projects-18edb47b.vercel.app",
      "https://my-blog-2q5rvq1kc-ankits-projects-18edb47b.vercel.app",
      "https://blog-app-8j8t.onrender.com",
      "https://my-blog-72apzwsh8-ankits-projects-18edb47b.vercel.app",
      "http://localhost:5173/",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/api/healthcheck", (req, res, next) => {
  res.status(200).json({ message: "HealthCheck Success" });
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);

app.use("*", (req, res, next) => {
  console.log(req.url);
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

app.use(notFound);
app.use(errorHandler);

app.listen(Port, () => {
  console.log("Server is running on Port:", Port);
});
