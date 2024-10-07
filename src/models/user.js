import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

import AccountSchema from "./account.js";

import { userObject } from "../config.js";

const UserSchema = new Schema({
  [userObject.fullname]: {
    type: String,
    required: [true, "Name is required"],
  },
  [userObject.email]: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  [userObject.password]: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  [userObject.accounts]: [AccountSchema],
});

const User = models.User ?? model("User", UserSchema);

export default User;
