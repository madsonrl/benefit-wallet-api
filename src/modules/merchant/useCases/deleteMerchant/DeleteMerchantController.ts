import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteMerchantUseCase } from "./DeleteMerchantUseCase";

class DeleteMerchantController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.query;
        const deleteMerchantUseCase = container.resolve(DeleteMerchantUseCase);
        await deleteMerchantUseCase.execute({
            id: id as string,
        });

        return response.status(200).send();
    }
}

export { DeleteMerchantController };
