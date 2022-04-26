const { errorHandler } = require("./middleware/errorMiddleware");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/forAuth");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const server = require("http").createServer(app);

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
// Socket io
///////////////////////////////////////////////
const io = require("socket.io")(server, {
  cors: {
		origin: "http://localhost:3000",
    methodes: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

//////////////////////////////////////////////

// jwt: for security auth
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const uploadRoutes = require("./routes/uploadFile");
const quizRoutes = require("./routes/quiz");
const quizHistoryRoutes = require("./routes/QuizHistory");
//Routes

const courseRoutes = require("./routes/courses.js");
const reviewRouter = require("./routes/review.js");
//Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/quizHistory", quizHistoryRoutes);

app.use("/api/category", require("./controllers/Category"));
app.use("/api/forum", require("./controllers/Forum"));
app.use("/api/topic", require("./controllers/Topic"));
app.use("/api/comment", require("./controllers/Comment"));

app.use("/api/category", require("./controllers/Category"));
app.use("/api/forum", require("./controllers/Forum"));
app.use("/api/topic", require("./controllers/Topic"));
app.use("/api/comment", require("./controllers/Comment"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/subcategories", require("./routes/subCategoryRoutes"));
app.use("/api/badges", require("./routes/badgeRoute"));
app.use("/courses", courseRoutes);
app.use("/reviews", reviewRouter);

// Server
server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
