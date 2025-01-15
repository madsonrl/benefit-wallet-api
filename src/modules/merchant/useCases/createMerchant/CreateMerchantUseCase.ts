import { inject, injectable } from "tsyringe";

import { IMerchantRepository } from "@modules/merchant/repositories/IMerchantsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id?: string;
    merchantRegister: string;
    mcc: string;
}

@injectable()
class CreateMerchantUseCase {
    constructor(
        @inject("MerchantsRepository")
        private merchantsRepository: IMerchantRepository
    ) {}
    

    async execute({
        merchantRegister,
        mcc,
    }: IRequest): Promise<void> {
        
        const merchantAlreadyExists = await this.merchantsRepository.findOne({
            merchantRegister,
            mcc,
        });

        if (merchantAlreadyExists) {
            throw new AppError("Merchant Already exists!");
        }

        await this.merchantsRepository.create({
            merchantRegister,
            mcc,
        });
    }
}

export { CreateMerchantUseCase };

