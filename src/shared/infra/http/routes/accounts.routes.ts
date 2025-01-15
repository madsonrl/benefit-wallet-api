import { Router } from "express";

import { CreateAccountController } from "@modules/account/useCases/createAccount/CreateAccountController";
import { DeleteAccountController } from "@modules/account/useCases/deleteAccount/DeleteAccountController";
import { ListAccountsController } from "@modules/account/useCases/listAccounts/ListaccountsController";
import { UpdateAccountController } from "@modules/account/useCases/updateAccount/UpdateAccountController";


const accountsRoutes = Router();

const createAccountController = new CreateAccountController();
const listAccountsController = new ListAccountsController();
const updateAccountController = new UpdateAccountController();
const deleteAccountController = new DeleteAccountController();

accountsRoutes.post(
    "/",
    createAccountController.handle
);

accountsRoutes.get("/", listAccountsController.handle);

accountsRoutes.put(
    "/update",
    updateAccountController.handle
);

accountsRoutes.delete(
    "/delete",
    deleteAccountController.handle
);

export { accountsRoutes };
