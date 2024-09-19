import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

import {
  validateLogin,
  validatePartialUser,
  validateUser,
} from "../schemas/user.js";

import { statusMessages, saltRounds } from "../config.js";

export async function loginUser(req, res) {
  const { data, error } = validateLogin(req.body);

  if (error)
    return res.status(422).json({
      status: statusMessages.error,
      message: error.errors[0].message,
    });

  const { email, password } = data;

  try {
    const userInDb = await User.findOne({ email });

    if (!userInDb)
      return res.status(404).json({
        status: statusMessages.error,
        message: "User doesn't exists",
      });

    const isPasswordValid = await bcrypt.compare(password, userInDb.password);

    if (!isPasswordValid)
      return res.status(401).json({
        status: statusMessages.error,
        message: "Unauthorized",
      });

    const token = jwt.sign({ id: userInDb._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
      algorithm: "HS512",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    };

    res.cookie("access_token", token, cookieOptions);

    return res.json({
      status: statusMessages.success,
      message: "You logged in correctly",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while loggin in",
    });
  }
}

export async function postUser(req, res) {
  const { data, error } = validateUser(req.body);

  if (error)
    return res.status(422).json({
      status: statusMessages.error,
      message: error.errors[0].message,
    });

  try {
    const userInDb = await User.findOne({ email: data.email });

    if (userInDb)
      return res.status(409).json({
        status: statusMessages.error,
        message: "User already exists, log in",
      });

    const hassedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = new User({
      ...data,
      password: hassedPassword,
      accounts: [],
    });

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
      algorithm: "HS512",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    };

    res.cookie("access_token", token, cookieOptions);

    return res.status(201).json({
      status: statusMessages.success,
      message: "User registered",
    });
  } catch (error) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while registering the user",
    });
  }
}

export async function logoutUser(req, res) {
  return res
    .clearCookie("access_token")
    .json({ status: statusMessages.success, message: "Logout successful" });
}

export async function patchUser(req, res) {
  const { data, error } = validatePartialUser(req.body);

  if (error)
    return res.status(422).json({
      status: statusMessages.error,
      message: error.errors[0].message,
    });

  const { id } = req.session;

  try {
    if (data.email) {
      const emailExists = await User.findOne({ email: data.email });

      if (emailExists)
        return res.status(409).json({
          status: statusMessages.error,
          message: "Email already exists",
        });
    }

    if (data.password) {
      const hassedPassword = await bcrypt.hash(data.password, saltRounds);

      data.password = hassedPassword;
    }

    const user = await User.findByIdAndUpdate(id, data);

    if (!user)
      return res.status(404).json({
        status: statusMessages.error,
        message: "User not found",
      });

    return res.json({
      status: statusMessages.success,
      message: "User edited",
    });
  } catch (error) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while editing the user",
    });
  }
}
