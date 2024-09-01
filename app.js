import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./src/routes/user.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ALLOWED_URL,
    credentials: true,
  })
);

app.use("/user", userRouter);

export default app;
