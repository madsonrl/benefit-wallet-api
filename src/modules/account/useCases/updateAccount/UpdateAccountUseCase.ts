import { inject, injectable } from "tsyringe";

import { IAccountRepository } from "@modules/account/repositories/IAccountsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    clientName?: string;
    foodBalance?: number;
    mealBalance?: number;
    cashBalance?: number;
}

@injectable()
class UpdateAccountUseCase {
    constructor(
        @inject("AccountsRepository")
        private accountsRepository: IAccountRepository
    ) {}

    async execute({
        id,
        clientName,
        foodBalance,
        mealBalance,
        cashBalance,
    }: IRequest): Promise<void> {
        const accountAlreadyExists = await this.accountsRepository.findByID(id);

        if (!accountAlreadyExists) {
            throw new AppError("Account not exists!");
        }

        await this.accountsRepository.update({
            id,
            clientName,
            foodBalance,
            mealBalance,
            cashBalance
        });
    }
}

export { UpdateAccountUseCase };
