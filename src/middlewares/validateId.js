import { statusMessages } from "../config.js";

const validateId = (idName) => (req, res, next) => {
  const id = req.params[idName];

  if (id.length !== 24 || !id || typeof id !== "string")
    return res.status(400).json({
      status: statusMessages.error,
      message: "Id isn't valid",
    });

  next();
};

export default validateId;
