import { getRepository, Repository } from "typeorm";

import { IMerchantRepository } from "@modules/merchant/repositories/IMerchantsRepository";
import { ICreateMerchantDTO } from "@modules/merchant/dtos/ICreateMerchantDTO";
import { Merchant } from "../entities/Merchant";
import { AppError } from "@shared/errors/AppError";

class MerchantsRepository implements IMerchantRepository {
    private repository: Repository<Merchant>;

    constructor() {
        this.repository = getRepository(Merchant);
    }

    async create({ merchantRegister, mcc }: ICreateMerchantDTO): Promise<void> {

        const merchantAlreadyExistsByName =
            await this.repository.findOne({merchantRegister});
        
        const merchantAlreadyExistsByMcc =
            await this.repository.findOne({mcc});

        if (merchantAlreadyExistsByName && merchantAlreadyExistsByMcc) {
            throw new AppError("Merchant Already exists!");
        }
            
        const merchant = this.repository.create({
            merchantRegister,
            mcc,
        });

        await this.repository.save(merchant);
    }

    async update({
        id,
        merchantRegister,
        mcc
    }: ICreateMerchantDTO): Promise<Merchant> {
        const merchant = await this.repository.findOne({ id });

        if (!merchant) {
            throw new Error("Merchant not found");
        }

        this.repository.merge(merchant, {
            id,
            merchantRegister,
            mcc,
        });

        const updatedMerchant = await this.repository.save(merchant);

        return updatedMerchant;
    }

    async list(): Promise<Merchant[]> {
        const merchants = await this.repository.find();
        return merchants;
    }

    async findByName(merchantRegister: string): Promise<Merchant> {
        const merchant = await this.repository.findOne({ merchantRegister });
        return merchant;
    }

    async findByID(id: string): Promise<Merchant> {
        const merchant = await this.repository.findOne({ id });
        return merchant;
    }

    async delete(id: string): Promise<void> {
        const merchantToRemove = await this.repository.findOne({ id });

        if (!merchantToRemove) {
            throw new Error("Merchant not found");
        }

        await this.repository.remove(merchantToRemove);
    }
}

export { MerchantsRepository };

