import { ICreateTransactionDTO } from "@modules/account/dtos/ICreateTransactionDTO";
import { Transaction } from "@modules/account/infra/typeorm/entities/Transaction";

import { ITransactionsRepository } from "../ITransactionsRepository";

class TransactionsRepositoryInMemory implements ITransactionsRepository {
    
    transactions: Transaction[] = [];

    async create({
        merchant,
        totalAmount,
        mcc,
        accountId,
    }: ICreateTransactionDTO): Promise<Transaction> {
        const transaction = new Transaction();

        Object.assign(transaction, {
            merchant,
            totalAmount,
            mcc,
            accountId,
        });

        this.transactions.push(transaction);

        return transaction;
    }

    async findByMerchant(merchant: string): Promise<Transaction | undefined> {
        return this.transactions.find(
            (transaction) => transaction.merchant === merchant
        );
    }

    async findByID(id: string): Promise<Transaction | undefined> {
        return this.transactions.find((transaction) => transaction.id === id);
    }

    async findAll(accountId?: string, id?: string): Promise<Transaction[]> {
        return this.transactions.filter((transaction) => {
            const isAccountMatch = accountId
                ? transaction.accountId === accountId
                : true;
            const isIdMatch = id ? transaction.id === id : true;

            return isAccountMatch && isIdMatch;
        });
    }

    async delete(id: string): Promise<void> {
        const transactionIndex = this.transactions.findIndex(
            (transaction) => transaction.id === id
        );

        if (transactionIndex === -1) {
            throw new Error("Transaction not found.");
        }

        this.transactions.splice(transactionIndex, 1);
    }
}

export { TransactionsRepositoryInMemory };