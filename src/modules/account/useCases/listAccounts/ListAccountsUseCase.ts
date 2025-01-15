import { inject, injectable } from "tsyringe";

import { Account } from "@modules/account/infra/typeorm/entities/Account";
import { AccountsRepository } from "@modules/account/infra/typeorm/repositories/AccountsRepository";
import { IAccountRepository } from "@modules/account/repositories/IAccountsRepository";

@injectable()
class ListAccountsUsecase {
    constructor(
        @inject(AccountsRepository)
        private accountsRepository: IAccountRepository
    ) {}

    async execute(): Promise<Account[]> {
        const accounts = await this.accountsRepository.list();
        return accounts;
    }
}

export { ListAccountsUsecase };
