const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const app = express();
////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
////////////////////////////////////////////////////////////
const userRoutes = require("./routes/user");
//Routes
app.use("/api/user", userRoutes);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
