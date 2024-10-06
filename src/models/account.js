import { Schema } from "mongoose";

import { currencies, transactionTypes } from "../config.js";

const AccountSchema = new Schema({
  accountName: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: {
        type: String,
        enum: {
          values: transactionTypes,
          message:
            '{VALUE} is not a valid transaction type. Valid types are "income" and "expense".',
        },
        required: [true, "Transaction type is required"],
      },
      amount: {
        type: Number,
        required: [true, "Transaction amount is required"],
      },
      currency: {
        type: String,
        enum: currencies,
        default: "EUR",
      },
      category: {
        type: String,
        default: "All",
      },
      date: {
        type: Date,
        default: Date.now,
      },
      description: {
        type: String,
      },
    },
  ],
});

export default AccountSchema;
