import User from "../models/user.js";

import { userObject, statusMessages, accountIdName } from "../config.js";

export async function getAccounts(req, res) {
  const { id } = req.session;

  try {
    const { accounts } = await User.findById(id, userObject.accounts);

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

export async function getAccount(req, res) {
  const { id } = req.session;
  const accountId = req.params[accountIdName];

  try {
    const { accounts } = await User.findById(id, userObject.accounts);

    const account = accounts.find(
      (account) => account._id.toString() === accountId
    );

    if (!account)
      return res.status(404).json({
        status: statusMessages.error,
        message: "Account not found",
      });

    return res.json({
      status: statusMessages.success,
      message: "Account found",
      account,
    });
  } catch (error) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error ocurred while finding the account",
    });
  }
}
