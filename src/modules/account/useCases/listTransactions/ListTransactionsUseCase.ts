import { inject, injectable } from "tsyringe";

import { Transaction } from "@modules/account/infra/typeorm/entities/Transaction";
import { ITransactionsRepository } from "@modules/account/repositories/ITransactionsRepository";

interface IRequest {
    accountId?: string;
    id?: string;
}

@injectable()
class ListTransactionsUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository
    ) {}

    async execute({ accountId, id }: IRequest): Promise<Transaction[]> {
        const transactions = await this.transactionsRepository.findAll(
            accountId,
            id
        );
        return transactions;
    }
}

export { ListTransactionsUseCase };
