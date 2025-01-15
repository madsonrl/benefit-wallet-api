import { Router } from "express";

import { accountsRoutes } from "./accounts.routes";
import { transactionsRoutes } from "./transactions.routes";
import { merchantsRoutes } from "./merchants.routes";


const router = Router();

router.use("/accounts", accountsRoutes);
router.use("/transactions", transactionsRoutes);
router.use("/merchants", merchantsRoutes);

export { router };
