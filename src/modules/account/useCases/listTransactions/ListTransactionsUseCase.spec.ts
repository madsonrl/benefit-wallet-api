import { TransactionsRepositoryInMemory } from "@modules/account/repositories/in-memory/TransactionsRepositoryInMemory";

import { ListTransactionsUseCase } from "./ListTransactionsUseCase";

let listTransactionsUseCase: ListTransactionsUseCase;
let transactionsRepositoryInMemory: TransactionsRepositoryInMemory;
describe("List transactions", () => {
    beforeEach(() => {
        transactionsRepositoryInMemory = new TransactionsRepositoryInMemory();
        listTransactionsUseCase = new ListTransactionsUseCase(transactionsRepositoryInMemory);
    });

    it("Should be able to list all transactions", async () => {
        const transaction = await transactionsRepositoryInMemory.create({
            accountId: "123",
            totalAmount: 100.0,
            mcc: "5811",
            merchant: "PADARIA DO ZE               SAO PAULO BR",
        });

        const transactions = await listTransactionsUseCase.execute({});

        expect(transactions).toEqual([transaction]);
    });

    it("Should be able to list by account id", async () => {
        const transaction = await transactionsRepositoryInMemory.create({
            accountId: "accountId_test",
            totalAmount: 100.0,
            mcc: "5811",
            merchant: "PADARIA DO ZE               SAO PAULO BR",
        });

        const transactions = await listTransactionsUseCase.execute({
            accountId: "accountId_test",
        });

        expect(transactions).toEqual([transaction]);
    });

    
});
