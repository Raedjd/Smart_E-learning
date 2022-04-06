const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/forAuth");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
//////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//////////////////////////////////////////////////////////////
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type", "Authorization"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// jwt: for security auth
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const uploadRoutes = require("./routes/uploadFile");
const quizRoutes = require("./routes/quiz");
//Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/quiz", quizRoutes);
app.use('/api/category', require("./controllers/Category"));
app.use('/api/forum', require("./controllers/Forum"));
app.use('/api/topic', require("./controllers/Topic"));
app.use('/api/comment', require("./controllers/Comment"));

// Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
