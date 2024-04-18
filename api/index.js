const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
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
    origin: "https://my-blog-mlk047igp-ankits-projects-18edb47b.vercel.app/",
    methods: "*",
  }),
); // Allow CORS for specified origin and all methods
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

app.use(notFound);
app.use(errorHandler);

app.listen(Port, () => {
  console.log("Server is running on Port:", Port);
});
