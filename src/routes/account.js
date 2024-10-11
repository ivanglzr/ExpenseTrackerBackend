import { Router } from "express";

import validateId from "../middlewares/validateId.js";

import {
  getAccounts,
  getAccount,
  postAccount,
  patchAccount,
  deleteAccount,
} from "../controllers/account.js";

import { accountIdName } from "../config.js";

const accountRouter = Router();

accountRouter.get("/", getAccounts);
accountRouter.get(`/:${accountIdName}`, validateId(accountIdName), getAccount);

accountRouter.post("/", postAccount);

accountRouter.patch(
  `/:${accountIdName}`,
  validateId(accountIdName),
  patchAccount
);

accountRouter.delete(
  `/:${accountIdName}`,
  validateId(accountIdName),
  deleteAccount
);

export default accountRouter;
