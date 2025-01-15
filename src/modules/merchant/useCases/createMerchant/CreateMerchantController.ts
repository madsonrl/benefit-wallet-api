import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMerchantUseCase } from "./CreateMerchantUseCase";

class CreateMerchantController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { merchantRegister, mcc } =
            request.body;
        const createMerchantUseCase = container.resolve(CreateMerchantUseCase);
        await createMerchantUseCase.execute({
            merchantRegister, mcc
        });
        return response.status(200).send();
    }
}

export { CreateMerchantController };

