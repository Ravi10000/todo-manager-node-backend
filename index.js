import express from "express";
import dotenv from "dotenv";
dotenv.config();
import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { connectDB } from "./utils/connect-db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.use("/api/todos", todoRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome! This is Todo API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server Started At Port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});
