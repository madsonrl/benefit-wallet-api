import { inject, injectable } from "tsyringe";

import { ITransactionsRepository } from "@modules/account/repositories/ITransactionsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

@injectable()
class DeleteTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository
    ) {}

    async execute({ id }: IRequest): Promise<void> {
        const transactionAlreadyExists = await this.transactionsRepository.findByID(id);

        if (!transactionAlreadyExists) {
            throw new AppError("Transaction not exists!");
        }

        await this.transactionsRepository.delete(id);
    }
}

export { DeleteTransactionUseCase };
