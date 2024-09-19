import { Router } from "express";

import { postUser, loginUser, logoutUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/register", postUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
