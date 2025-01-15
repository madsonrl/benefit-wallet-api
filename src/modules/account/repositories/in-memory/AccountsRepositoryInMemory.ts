import { Account } from "../../infra/typeorm/entities/Account";
import { IAccountRepository } from "../IAccountsRepository";
import { ICreateAccountDTO } from "@modules/account/dtos/ICreateAccountDTO";

class AccountsRepositoryInMemory implements IAccountRepository {
    accounts: Account[] = [];

    async findByClientName(clientName: string): Promise<Account> {
        const account = this.accounts.find((account) => account.clientName === clientName);
        return account;
    }

    async list(): Promise<Account[]> {
        return this.accounts;
    }

    async create({
        clientName,
        foodBalance,
        mealBalance,
        cashBalance,
    }: ICreateAccountDTO): Promise<void> {
        const account = new Account();

        Object.assign(account, {
            clientName,
            foodBalance,
            mealBalance,
            cashBalance,
        });

        this.accounts.push(account);
    }

    async update({
        id,
        clientName,
        foodBalance,
        mealBalance,
        cashBalance,
    }: ICreateAccountDTO): Promise<Account> {
        const accountIndex = this.accounts.findIndex((account) => account.id === id);

        if (accountIndex === -1) {
            throw new Error("Account not found.");
        }

        const updatedAccount = this.accounts[accountIndex];

        Object.assign(updatedAccount, {
            clientName,
            foodBalance,
            mealBalance,
            cashBalance,
        });

        this.accounts[accountIndex] = updatedAccount;

        return updatedAccount;
    }

    async findByID(id: string): Promise<Account> {
        const account = this.accounts.find((account) => account.id === id);
        if (!account) {
            throw new Error("Account not found.");
        }
        return account;
    }

    async delete(id: string): Promise<void> {
        const accountIndex = this.accounts.findIndex((account) => account.id === id);

        if (accountIndex === -1) {
            throw new Error("Account not found.");
        }

        this.accounts.splice(accountIndex, 1);
    }
}

export { AccountsRepositoryInMemory };
