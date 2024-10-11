import { Schema } from "mongoose";

import {
  accountObject,
  currencies,
  transactionObject,
  transactionTypes,
} from "../config.js";

const AccountSchema = new Schema({
  [accountObject.accountName]: {
    type: String,
    required: true,
    unique: true,
  },
  [accountObject.balance]: {
    type: Number,
    default: 0,
  },
  [accountObject.transactions]: [
    {
      [transactionObject.type]: {
        type: String,
        enum: {
          values: transactionTypes,
          message:
            '{VALUE} is not a valid transaction type. Valid types are "income" and "expense".',
        },
        required: [true, "Transaction type is required"],
      },
      [transactionObject.amount]: {
        type: Number,
        required: [true, "Transaction amount is required"],
      },
      [transactionObject.currency]: {
        type: String,
        enum: currencies,
        default: "EUR",
      },
      [transactionObject.category]: {
        type: String,
        default: "All",
      },
      [transactionObject.date]: {
        type: Date,
        default: Date.now,
      },
      [transactionObject.date]: {
        type: String,
      },
    },
  ],
});

export default AccountSchema;
