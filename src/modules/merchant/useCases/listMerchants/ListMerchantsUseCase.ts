import { inject, injectable } from "tsyringe";

import { Merchant } from "@modules/merchant/infra/typeorm/entities/Merchant";
import { MerchantsRepository } from "@modules/merchant/infra/typeorm/repositories/MerchantsRepository";
import { IMerchantRepository } from "@modules/merchant/repositories/IMerchantsRepository";

@injectable()
class ListMerchantsUsecase {
    constructor(
        @inject(MerchantsRepository)
        private merchantsRepository: IMerchantRepository
    ) {}

    async execute(): Promise<Merchant[]> {
        const merchants = await this.merchantsRepository.list();
        return merchants;
    }
}

export { ListMerchantsUsecase };
