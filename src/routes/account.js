import { Router } from "express";

import validateId from "../middlewares/validateId.js";

import {
  getAccounts,
  getAccount,
  postAccount,
  patchAccount,
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

export default accountRouter;
