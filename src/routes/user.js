import { Router } from "express";

import { postUser, loginUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/register", postUser);
userRouter.post("/login", loginUser);

export default userRouter;
