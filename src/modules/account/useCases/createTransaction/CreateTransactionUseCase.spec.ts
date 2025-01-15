import { TransactionsRepositoryInMemory } from "@modules/account/repositories/in-memory/TransactionsRepositoryInMemory";
import { AccountsRepositoryInMemory } from "@modules/account/repositories/in-memory/AccountsRepositoryInMemory";
import { MerchantsRepositoryInMemory } from "@modules/merchant/repositories/in-memory/MerchantsRepositoryInMemory";

import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

let createTransactionUseCase: CreateTransactionUseCase;
let transactionsRepositoryInMemory: TransactionsRepositoryInMemory;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let merchantsRepositoryInMemory: MerchantsRepositoryInMemory;

describe("CreateTransaction", () => {
    beforeEach(() => {
        transactionsRepositoryInMemory = new TransactionsRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        merchantsRepositoryInMemory = new MerchantsRepositoryInMemory();

        createTransactionUseCase = new CreateTransactionUseCase(
            transactionsRepositoryInMemory,
            accountsRepositoryInMemory,
            merchantsRepositoryInMemory
        );

        // Criação de conta com saldos
        accountsRepositoryInMemory.create({
            id: "account",
            clientName: "Client Name",
            foodBalance: 300,
            mealBalance: 200,
            cashBalance: 100,
        });

        // Criação de comerciante com MCC
        merchantsRepositoryInMemory.create({
            id: "merchant",
            merchantRegister: "12345",
            mcc: "5412",
        });
    });

    // it("Should be able to create a new transaction", async () => {
        
    //     const result = await createTransactionUseCase.execute({
    //         merchant: "12345",
    //         totalAmount: 100,
    //         mcc: "5412",
    //         accountId: "account",
    //     });

    //     const code  = 0;

    //     console.log(result)

    //     expect(code).toBe(0); // Transação aprovada
    // });

    
});
