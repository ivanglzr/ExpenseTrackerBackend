import { Router } from "express";

import {
  getUser,
  postUser,
  loginUser,
  logoutUser,
  patchUser,
  deleteUser,
} from "../controllers/user.js";

import validateUser from "../middlewares/validateUser.js";

const userRouter = Router();

userRouter.post("/", postUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

userRouter.use(validateUser);

userRouter.get("/", getUser);

userRouter.patch("/", patchUser);

userRouter.delete("/", deleteUser);

export default userRouter;
