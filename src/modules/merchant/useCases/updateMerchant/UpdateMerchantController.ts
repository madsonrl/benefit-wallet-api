import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateMerchantUseCase } from "./UpdateMerchantUseCase";

class UpdateMerchantController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, merchantRegister, mcc } = request.body;

        const updateMerchantUseCase = container.resolve(UpdateMerchantUseCase);

        await updateMerchantUseCase.execute({
            id,
            merchantRegister,
            mcc,
        });

        return response.status(200).send();
    }
}

export { UpdateMerchantController };
