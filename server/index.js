
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import courseRoutes from './routes/courses.js';
import userRouter from "./routes/user.js";
import reviewRouter from './routes/review.js';
const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/courses', courseRoutes);
app.use("/user", userRouter);
app.use("/reviews", reviewRouter);


const CONNECTION_URL = 'mongodb+srv://Amine:AZOV1xIWvl5Y9sof@crud.qj1eh.mongodb.net/CoursesData?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

