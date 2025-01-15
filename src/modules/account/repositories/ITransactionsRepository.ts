import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { Transaction } from "../infra/typeorm/entities/Transaction";

interface ITransactionsRepository {
    create(data: ICreateTransactionDTO): Promise<Transaction>;
    findByMerchant(merchant: string): Promise<Transaction>;
    findByID(id: string): Promise<Transaction>;
    findAll(accountId?: string, id?: string): Promise<Transaction[]>;
    delete(id: string): Promise<void>;
}

export { ITransactionsRepository };
