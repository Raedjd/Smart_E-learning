const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/forAuth");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const app = express();
/////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
/////////////////////////////////////////////////////////////

// jwt: for security auth
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
const userRoutes = require("./routes/user");
//Routes
app.use("/api/user", userRoutes);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
