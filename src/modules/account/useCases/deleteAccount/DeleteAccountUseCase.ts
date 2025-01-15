import { inject, injectable } from "tsyringe";

import { IAccountRepository } from "@modules/account/repositories/IAccountsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

@injectable()
class DeleteAccountUseCase {
    constructor(
        @inject("AccountsRepository")
        private accountsRepository: IAccountRepository
    ) {}

    async execute({ id }: IRequest): Promise<void> {
        const accountAlreadyExists = await this.accountsRepository.findByID(id);

        if (!accountAlreadyExists) {
            throw new AppError("Account not exists!");
        }

        await this.accountsRepository.delete(id);
    }
}

export { DeleteAccountUseCase };
