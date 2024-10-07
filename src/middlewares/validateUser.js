import jwt from "jsonwebtoken";

import { statusMessages, cookieName } from "../config.js";

export default function validateUser(req, res, next) {
  const token = req.cookies[cookieName];

  if (!token)
    return res.status(401).json({
      status: statusMessages.error,
      message: "You must login",
    });

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);

    if (id === undefined || id === null || id.length !== 24) {
      return res.status(400).json({
        status: statusMessages.error,
        message: "Id isn't valid",
      });
    }

    req.session = { id: id };

    next();
  } catch (error) {
    return res.status(401).json({
      status: statusMessages.error,
      message: "Unauthorized",
    });
  }
}
