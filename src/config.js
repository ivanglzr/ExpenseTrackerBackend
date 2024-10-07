export const cookieName = "access_token";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 1000,
};

export const userObject = {
  fullname: "fullname",
  email: "email",
  password: "password",
  accounts: "accounts",
};

export const accountObject = {
  accountName: "accountName",
  balance: "balance",
  transactions: "transactions",
};

export const transactionObject = {
  type: "type",
  amount: "amount",
  currency: "currency",
  category: "category",
  date: "date",
  description: "description",
};

export const statusMessages = {
  success: "success",
  error: "error",
};

export const saltRounds = 10;

export const transactionTypes = ["income", "expense"];

export const currencies = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "HKD",
  "NZD",
  "SEK",
];
