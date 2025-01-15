import { MerchantsRepositoryInMemory } from "@modules/merchant/repositories/in-memory/MerchantsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateMerchantUseCase } from "./CreateMerchantUseCase";

let createMerchantUseCase: CreateMerchantUseCase;
let merchantsRepositoryInMemory: MerchantsRepositoryInMemory;

describe("Create Merchant", () => {
    beforeEach(() => {
        merchantsRepositoryInMemory = new MerchantsRepositoryInMemory();
        createMerchantUseCase = new CreateMerchantUseCase(
            merchantsRepositoryInMemory
        );
    });

    it("should be able to  create a new merchant", async () => {
        const merchant = {
            id: "idmerchant",
            merchantRegister: "Merchant Test",
            mcc: "5811",
        };

        await createMerchantUseCase.execute({
            id: merchant.id,
            merchantRegister: merchant.merchantRegister,
            mcc: merchant.mcc,
        });

        const merchantCreated = await merchantsRepositoryInMemory.findByName(
            merchant.merchantRegister
        );

        expect(merchantCreated).toHaveProperty("id");
    });

    it("should not allow creating a merchant with duplicate register and MCC", async () => {
        const merchant = {
            merchantRegister: "Merchant Test",
            mcc: "5811",
        };
    
        // Primeiro merchant criado com sucesso
        await createMerchantUseCase.execute({
            merchantRegister: merchant.merchantRegister,
            mcc: merchant.mcc,
        });
    
        // Tentativa de criar outro merchant com os mesmos dados
        await expect(
            createMerchantUseCase.execute({
                merchantRegister: merchant.merchantRegister,
                mcc: merchant.mcc,
            })
        ).rejects.toEqual(new AppError("Merchant Already exists!"));
    });
    
    it("should allow creating merchants with same register but different MCC", async () => {
        const merchant1 = {
            merchantRegister: "Merchant Test",
            mcc: "5811",
        };
    
        const merchant2 = {
            merchantRegister: "Merchant Test",
            mcc: "5812",
        };
    
        // Primeiro merchant criado com sucesso
        await createMerchantUseCase.execute(merchant1);
    
        // Segundo merchant com MCC diferente também deve ser criado com sucesso
        await expect(createMerchantUseCase.execute(merchant2)).resolves.not.toThrow();
    });
    
    it("should allow creating merchants with same MCC but different register", async () => {
        const merchant1 = {
            merchantRegister: "Merchant Test1",
            mcc: "5811",
        };
    
        const merchant2 = {
            merchantRegister: "Merchant Test2",
            mcc: "5811",
        };
    
        // Primeiro merchant criado com sucesso
        await createMerchantUseCase.execute(merchant1);
    
        // Segundo merchant com register diferente também deve ser criado com sucesso
        await expect(createMerchantUseCase.execute(merchant2)).resolves.not.toThrow();
    });
});

