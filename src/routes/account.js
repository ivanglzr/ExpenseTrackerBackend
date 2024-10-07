import { Router } from "express";

import { getAccounts } from "../controllers/account.js";

const accountRouter = Router();

accountRouter.get("/", getAccounts);

export default accountRouter;
