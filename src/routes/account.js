import { Router } from "express";

import validateId from "../middlewares/validateId.js";

import { getAccounts, getAccount } from "../controllers/account.js";

import { accountIdName } from "../config.js";

const accountRouter = Router();

accountRouter.get("/", getAccounts);
accountRouter.get(`/:${accountIdName}`, validateId(accountIdName), getAccount);

export default accountRouter;
