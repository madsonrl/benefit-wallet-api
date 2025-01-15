import { getRepository, Repository } from "typeorm";

import { ICreateTransactionDTO } from "@modules/account/dtos/ICreateTransactionDTO";
import { ITransactionsRepository } from "@modules/account/repositories/ITransactionsRepository";
import { Transaction } from "../entities/Transaction";

class TransactionsRepository implements ITransactionsRepository {
    private repository: Repository<Transaction>;

    constructor() {
        this.repository = getRepository(Transaction);
    }

    async create({
        merchant,
        totalAmount,
        mcc,
        accountId,
    }: ICreateTransactionDTO): Promise<Transaction> {
        const transaction = this.repository.create({
            merchant,
            totalAmount,
            mcc,
            accountId,
        });

        await this.repository.save(transaction);

        return transaction;
    }

    async update({
        id,
        merchant,
        totalAmount,
        mcc,
        accountId,
    }: ICreateTransactionDTO): Promise<Transaction> {
        const transaction = await this.repository.findOne({ id });

        if (!transaction) {
            throw new Error("Transaction not found");
        }

        this.repository.merge(transaction, {
            id,
            merchant,
            totalAmount,
            mcc,
            accountId,
        });

        const updatedTransaction = await this.repository.save(transaction);

        return updatedTransaction;
    }

    async findByMerchant(merchant: string): Promise<Transaction> {
        const transaction = await this.repository.findOne({ merchant });

        return transaction;
    }

    async findAll(accountId?: string, id?: string): Promise<Transaction[]> {
        const transactionsQuery = this.repository.createQueryBuilder("t");

        if (accountId) {
            transactionsQuery.where("t.accountId = :accountId", { accountId });
        }
        if (id) {
            transactionsQuery.andWhere("t.id = :id", { id });
        }

        const transactions = await transactionsQuery.getMany();

        return transactions;
    }

    async findByID(id: string): Promise<Transaction> {
        const transaction = await this.repository.findOne({ id });
        return transaction;
    }

    async delete(id: string): Promise<void> {
        const transactionToRemove = await this.repository.findOne({ id });

        if (!transactionToRemove) {
            throw new Error("Transaction not found");
        }

        await this.repository.remove(transactionToRemove);
    }
}

export { TransactionsRepository };
