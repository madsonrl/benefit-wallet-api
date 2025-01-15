import { AccountsRepositoryInMemory } from "@modules/account/repositories/in-memory/AccountsRepositoryInMemory";

import { CreateAccountUseCase } from "./CreateAccountUseCase";
import { AppError } from "@shared/errors/AppError";

let createAccountUseCase: CreateAccountUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;

describe("Create Account", () => {
    beforeEach(() => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        createAccountUseCase = new CreateAccountUseCase(
            accountsRepositoryInMemory
        );
    });

    it("should be able to  create a new account", async () => {
        const account = {
            id: "idaccount",
            clientName: "Account Test",
            foodBalance: 100,
            mealBalance: 50,
            cashBalance: 200,
        };

        await createAccountUseCase.execute({
            id: account.id,
            clientName: account.clientName,
            foodBalance: account.foodBalance,
            mealBalance: account.mealBalance,
            cashBalance: account.cashBalance,
        });

        const accountCreated =
            await accountsRepositoryInMemory.findByClientName(
                account.clientName
            );

        expect(accountCreated).toHaveProperty("id");
    });

    it("should not be able to  create a new account with id exists", async () => {
        expect(async () => {
            const account = {
                id: "idaccount",
                clientName: "Account Test 2",
                foodBalance: 100,
                mealBalance: 50,
                cashBalance: 200,
            };

            await createAccountUseCase.execute({
                id: account.id,
                clientName: account.clientName,
                foodBalance: account.foodBalance,
                mealBalance: account.mealBalance,
                cashBalance: account.cashBalance,
            });

            await createAccountUseCase.execute({
                id: account.id,
                clientName: account.clientName,
                foodBalance: account.foodBalance,
                mealBalance: account.mealBalance,
                cashBalance: account.cashBalance,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});

