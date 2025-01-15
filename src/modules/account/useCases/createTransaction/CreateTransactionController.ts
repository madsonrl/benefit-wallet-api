import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

class CreateTransactionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { merchant, totalAmount, mcc, account } = request.body;

        const createTransactionDependsMerchantUseCase = container.resolve(
            CreateTransactionUseCase
        );

        const transaction = await createTransactionDependsMerchantUseCase.execute({
            merchant,
            totalAmount,
            mcc,
            accountId: account,
        });

        return response.status(200).json(transaction);
    }
}

export { CreateTransactionController };
