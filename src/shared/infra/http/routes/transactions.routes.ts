import { Router } from "express";


import { DeleteTransactionController } from "@modules/account/useCases/deleteTransaction/DeleteTransactionController";
import { ListTransactionsController } from "@modules/account/useCases/listTransactions/listTransactionsController";
import { CreateTransactionController } from "@modules/account/useCases/createTransaction/CreateTransactionController";

const transactionsRoutes = Router();

const createTransactionDependsMerchantController = new CreateTransactionController();
const listTransactionsController = new ListTransactionsController();
const deleteTransactionController = new DeleteTransactionController();


transactionsRoutes.post("/", createTransactionDependsMerchantController.handle);

transactionsRoutes.delete("/delete", deleteTransactionController.handle);

transactionsRoutes.get("/", listTransactionsController.handle);

export { transactionsRoutes };
