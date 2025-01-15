import { Merchant } from "../infra/typeorm/entities/Merchant";
import { ICreateMerchantDTO } from "../dtos/ICreateMerchantDTO";

interface IMerchantRepository {
    findByName(merchantRegister: string): Promise<Merchant>;
    findByID(id: string): Promise<Merchant>;
    list(): Promise<Merchant[]>;
    create({
        merchantRegister,
        mcc
    }: ICreateMerchantDTO): Promise<void>;
    update({
        id,
        merchantRegister,
        mcc
    }: ICreateMerchantDTO): Promise<Merchant>;
    delete(id: string): Promise<void>;
}

export { IMerchantRepository };
