import { inject, injectable } from "tsyringe";

import { IMerchantRepository } from "@modules/merchant/repositories/IMerchantsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    merchantRegister?: string;
    mcc?: string;
}

@injectable()
class UpdateMerchantUseCase {
    constructor(
        @inject("MerchantsRepository")
        private merchantsRepository: IMerchantRepository
    ) {}

    async execute({ id, merchantRegister, mcc }: IRequest): Promise<void> {
        const merchantAlreadyExists = await this.merchantsRepository.findByID(
            id
        );

        if (!merchantAlreadyExists) {
            throw new AppError("Merchant not exists!");
        }

        await this.merchantsRepository.update({
            id,
            merchantRegister,
            mcc,
        });
    }
}

export { UpdateMerchantUseCase };
