import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { connectDB } from './utils/connect-db.js';
import { isAuthenticated } from './middlewares/auth.middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/todos", isAuthenticated, todoRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server Started At Port ${PORT}`)
})