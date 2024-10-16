import { z } from "zod";

import {
  transactionTypes,
  currencies,
  transactionObject,
  accountObject,
} from "../config.js";

const accountNameSchema = z
  .string({
    invalid_type_error: "Account Name must be a string",
    required_error: "Account Name is required",
  })
  .min(1, "Account Name is required")
  .min(3, "Account Name must be longer than 3 characters")
  .max(30, "Account Name must be less than 30 characters long");

const balanceSchema = z.number({
  invalid_type_error: "Balance must be a number",
  required_error: "Balance is required",
});

const transactionSchema = z.object({
  [transactionObject.type]: z.enum(transactionTypes),
  [transactionObject.amount]: z.number({
    invalid_type_error: "Amount must be a number",
    required_error: "Amount is required",
  }),
  [transactionObject.currency]: z.enum(currencies),
  [transactionObject.category]: z
    .string({ invalid_type_error: "Category must be a string" })
    .optional(),
  [transactionObject.date]: z.date(),
  [transactionObject.description]: z.string().optional(),
});

const accountSchema = z.object({
  [accountObject.accountName]: accountNameSchema,
  [accountObject.balance]: balanceSchema,
  [accountObject.transactions]: z.array(transactionSchema),
});

export function validateAccount(account) {
  return accountSchema.safeParse(account);
}

export function validatePartialAccount(account) {
  return accountSchema.partial().safeParse(account);
}
