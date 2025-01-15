import { container } from "tsyringe";

import { TransactionsRepository } from "@modules/account/infra/typeorm/repositories/TransactionsRepository";
import { ITransactionsRepository } from "@modules/account/repositories/ITransactionsRepository";

import { AccountsRepository } from "../../modules/account/infra/typeorm/repositories/AccountsRepository";
import { IAccountRepository } from "../../modules/account/repositories/IAccountsRepository";

import { MerchantsRepository } from "../../modules/merchant/infra/typeorm/repositories/MerchantsRepository";
import { IMerchantRepository } from "../../modules/merchant/repositories/IMerchantsRepository";

container.registerSingleton<IAccountRepository>(
    "AccountsRepository",
    AccountsRepository
);

container.registerSingleton<ITransactionsRepository>(
    "TransactionsRepository",
    TransactionsRepository
);

container.registerSingleton<IMerchantRepository>(
    "MerchantsRepository",
    MerchantsRepository
);
