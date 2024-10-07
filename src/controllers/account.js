import User from "../models/user.js";

import { statusMessages } from "../config.js";

export async function getAccounts(req, res) {
  const { id } = req.session;

  try {
    const { accounts } = await User.findById(id, "accounts");

    const message =
      accounts.length === 0
        ? "The user doesn't have any accounts"
        : `${accounts.length + 1} accounts found`;

    return res.json({
      status: statusMessages.success,
      message,
      accounts,
    });
  } catch (error) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while finding the accounts",
    });
  }
}
