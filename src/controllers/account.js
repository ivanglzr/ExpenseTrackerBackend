import User from "../models/user.js";

import { validateAccount, validatePartialAccount } from "../schemas/account.js";

import {
  userObject,
  statusMessages,
  accountIdName,
  accountObject,
} from "../config.js";

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

export async function postAccount(req, res) {
  const { data, error } = validateAccount(req.body);

  if (error)
    return res.status(422).json({
      status: statusMessages.error,
      message: error.errors[0].message,
    });

  const { id } = req.session;

  try {
    const user = await User.findById(id, userObject.accounts);

    if (!user)
      return res.status(404).json({
        status: statusMessages.error,
        message: "User not found",
      });

    const accountExists = user[userObject.accounts].some(
      (account) =>
        account[accountObject.accountName] === data[accountObject.accountName]
    );

    if (accountExists)
      return res.status(409).json({
        status: statusMessages.error,
        message: "Account already exists",
      });

    user[userObject.accounts].push(data);

    await user.save();

    return res.status(201).json({
      status: statusMessages.success,
      message: "Account created",
    });
  } catch (error) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while posting the account",
    });
  }
}

export async function patchAccount(req, res) {
  const { data, error } = validatePartialAccount(req.body);

  if (error)
    return res.status(422).json({
      status: statusMessages.error,
      message: error.errors[0].message,
    });

  const { id } = req.session;
  const accountId = req.params[accountIdName];

  try {
    const user = await User.findById(id, userObject.accounts);

    if (!user)
      return res.status(404).json({
        status: statusMessages.error,
        message: "User doesn't exists",
      });

    const accountIndex = user[userObject.accounts].findIndex(
      (account) => account._id.toString() === accountId
    );

    if (accountIndex === -1)
      return res.status(404).json({
        status: statusMessages.error,
        message: "Account not found",
      });

    const newAccount = {
      ...user[userObject.accounts][accountIndex],
      ...data,
    };

    user[userObject.accounts][accountIndex] = newAccount;

    await user.save();

    return res.json({
      status: statusMessages.success,
      message: "Account edited correctly",
    });
  } catch (error) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while",
    });
  }
}
