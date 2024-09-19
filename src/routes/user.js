import { Router } from "express";

import {
  postUser,
  loginUser,
  logoutUser,
  patchUser,
} from "../controllers/user.js";

import validateUser from "../middlewares/validateUser.js";

const userRouter = Router();

userRouter.post("/", postUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

userRouter.use(validateUser);

userRouter.patch("/", patchUser);

export default userRouter;
