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

    it("should not be able to  create a new merchant with id exists", async () => {
        expect(async () => {
            const merchant = {
                id: "idmerchant",
                merchantRegister: "Merchant Test2",
                mcc: "5811",
            };

            await createMerchantUseCase.execute({
                id: merchant.id,
                merchantRegister: merchant.merchantRegister,
                mcc: merchant.mcc
            });

            await createMerchantUseCase.execute({
                id: merchant.id,
                merchantRegister: merchant.merchantRegister,
                mcc: merchant.mcc
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});

