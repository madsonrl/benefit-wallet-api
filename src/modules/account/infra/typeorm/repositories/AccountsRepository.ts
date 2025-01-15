import { getRepository, Repository } from "typeorm";

import { IAccountRepository } from "@modules/account/repositories/IAccountsRepository";
import { ICreateAccountDTO } from "@modules/account/dtos/ICreateAccountDTO";
import { Account } from "../entities/Account";

class AccountsRepository implements IAccountRepository {
    private repository: Repository<Account>;

    constructor() {
        this.repository = getRepository(Account);
    }

    async create({
        clientName,
        foodBalance,
        mealBalance,
        cashBalance,
    }: ICreateAccountDTO): Promise<void> {
        const account = this.repository.create({
            clientName,
            foodBalance,
            mealBalance,
            cashBalance,
        });

        await this.repository.save(account);
    }

    async update({
        id,
        clientName,
        foodBalance,
        mealBalance,
        cashBalance,
    }: ICreateAccountDTO): Promise<Account> {
        const account = await this.repository.findOne({ id });

        if (!account) {
            throw new Error("Account not found");
        }

        this.repository.merge(account, {
            id,
            clientName,
            foodBalance,
            mealBalance,
            cashBalance,
        });

        const updatedAccount = await this.repository.save(account);

        return updatedAccount;
    }

    async list(): Promise<Account[]> {
        const accounts = await this.repository.find();
        return accounts;
    }

    async findByClientName(clientName: string): Promise<Account> {
        const account = await this.repository.findOne({ clientName });
        return account;
    }

    async findByID(id: string): Promise<Account> {
        const account = await this.repository.findOne({ id });
        return account;
    }

    async delete(id: string): Promise<void> {
        const accountToRemove = await this.repository.findOne({ id });

        if (!accountToRemove) {
            throw new Error("Account not found");
        }

        await this.repository.remove(accountToRemove);
    }
}

export { AccountsRepository };
