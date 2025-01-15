import { TransactionsRepositoryInMemory } from "@modules/account/repositories/in-memory/TransactionsRepositoryInMemory";
import { AccountsRepositoryInMemory } from "@modules/account/repositories/in-memory/AccountsRepositoryInMemory";
import { MerchantsRepositoryInMemory } from "@modules/merchant/repositories/in-memory/MerchantsRepositoryInMemory";

import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

let createTransactionUseCase: CreateTransactionUseCase;
let transactionsRepositoryInMemory: TransactionsRepositoryInMemory;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let merchantsRepositoryInMemory: MerchantsRepositoryInMemory;

describe("CreateTransaction", () => {
    beforeEach(async () => {
        transactionsRepositoryInMemory = new TransactionsRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        merchantsRepositoryInMemory = new MerchantsRepositoryInMemory();

        createTransactionUseCase = new CreateTransactionUseCase(
            transactionsRepositoryInMemory,
            accountsRepositoryInMemory,
            merchantsRepositoryInMemory
        );

        await accountsRepositoryInMemory.create({
            clientName: "Client Name",
            foodBalance: 300,
            mealBalance: 200,
            cashBalance: 100,
        });

        await merchantsRepositoryInMemory.create({
            merchantRegister: "12345",
            mcc: "5412",
        });
    });

    it("Should be able to create a new transaction", async () => {
        const account = accountsRepositoryInMemory.accounts[0];
        const result = await createTransactionUseCase.execute({
            merchant: "12345",
            totalAmount: 100,
            mcc: "5412",
            accountId: account.id,
        });

        expect(result.code).toBe("00");
    });

    it("Should approve the transaction when balance is sufficient and MCC is valid", async () => {
        const account = accountsRepositoryInMemory.accounts[0];
        const result = await createTransactionUseCase.execute({
            merchant: "12345",
            totalAmount: 100,
            mcc: "5412",
            accountId: account.id,
        });
    
        expect(result.code).toBe("00");
    });

    it("Should reject the transaction if the category balance is insufficient", async () => {
        const account = accountsRepositoryInMemory.accounts[0];
        const result = await createTransactionUseCase.execute({
            merchant: "12345",
            totalAmount: 500,
            mcc: "5412",       
            accountId: account.id,
        });
    
        expect(result.code).toBe("51");
    });

    it("Should reject the transaction if the CASH balance is insufficient", async () => {
        const account = accountsRepositoryInMemory.accounts[0];
        
        const result = await createTransactionUseCase.execute({
            merchant: "12345",
            totalAmount: 500,  
            mcc: "5412",    
            accountId: account.id,
        });
    
        expect(result.code).toBe("51");
    });

    it("Should approve the transaction using CASH balance when other categories are insufficient", async () => {
        const account = accountsRepositoryInMemory.accounts[0];
    
        const result = await createTransactionUseCase.execute({
            merchant: "12345",  
            totalAmount: 50,  
            mcc: "9999",        
            accountId: account.id,
        });
    
        expect(result.code).toBe("00"); 
    });

    it("Should reject the transaction if the MCC is invalid and CASH balance is insufficient", async () => {
        const account = accountsRepositoryInMemory.accounts[0];
        
        const result = await createTransactionUseCase.execute({
            merchant: "12345",
            totalAmount: 500,  
            mcc: "9999",       
            accountId: account.id,
        });
    
        expect(result.code).toBe("51");
    });

    
});
