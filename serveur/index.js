const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/forAuth");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");

const app = express();
//////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//////////////////////////////////////////////////////////////
const corsOptions = {
  origin: process.env.CLIENTF_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
// jwt: for security auth
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
//Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
