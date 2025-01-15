import { inject, injectable } from "tsyringe";

import { IAccountRepository } from "@modules/account/repositories/IAccountsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id?: string;
    clientName: string;
    foodBalance: number;
    mealBalance: number;
    cashBalance: number;
}

@injectable()
class CreateAccountUseCase {
    constructor(
        @inject("AccountsRepository")
        private accountsRepository: IAccountRepository
    ) {}

    async execute({
        clientName,
        foodBalance,
        mealBalance,
        cashBalance,
    }: IRequest): Promise<void> {
        const accountAlreadyExists =
            await this.accountsRepository.findByClientName(clientName);

        if (accountAlreadyExists) {
            throw new AppError("Account Already exists!");
        }

        await this.accountsRepository.create({
            clientName,
            foodBalance,
            mealBalance,
            cashBalance,
        });
    }
}

export { CreateAccountUseCase };

