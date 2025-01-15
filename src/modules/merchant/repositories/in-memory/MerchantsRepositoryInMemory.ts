import { Merchant } from "../../infra/typeorm/entities/Merchant";
import { IMerchantRepository } from "../IMerchantsRepository";
import { ICreateMerchantDTO } from "@modules/merchant/dtos/ICreateMerchantDTO";

class MerchantsRepositoryInMemory implements IMerchantRepository {
    merchants: Merchant[] = [];

    async findByName(clientName: string): Promise<Merchant> {
        const merchant = this.merchants.find(
            (merchant) => merchant.merchantRegister === clientName
        );
        return merchant;
    }

    async list(): Promise<Merchant[]> {
        return this.merchants;
    }

    async create({ merchantRegister, mcc }: ICreateMerchantDTO): Promise<void> {
        const merchant = new Merchant();

        Object.assign(merchant, {
            merchantRegister,
            mcc,
        });

        this.merchants.push(merchant);
    }

    async update({
        id,
        merchantRegister,
        mcc,
    }: ICreateMerchantDTO): Promise<Merchant> {
        const merchantIndex = this.merchants.findIndex(
            (merchant) => merchant.id === id
        );

        if (merchantIndex === -1) {
            throw new Error("Merchant not found.");
        }

        const updatedMerchant = this.merchants[merchantIndex];

        Object.assign(updatedMerchant, {
            merchantRegister,
            mcc,
        });

        this.merchants[merchantIndex] = updatedMerchant;

        return updatedMerchant;
    }

    async findByID(id: string): Promise<Merchant> {
        const merchant = this.merchants.find((merchant) => merchant.id === id);
        if (!merchant) {
            throw new Error("Merchant not found.");
        }
        return merchant;
    }

    async delete(id: string): Promise<void> {
        const merchantIndex = this.merchants.findIndex(
            (merchant) => merchant.id === id
        );

        if (merchantIndex === -1) {
            throw new Error("Merchant not found.");
        }

        this.merchants.splice(merchantIndex, 1);
    }
}

export { MerchantsRepositoryInMemory };

