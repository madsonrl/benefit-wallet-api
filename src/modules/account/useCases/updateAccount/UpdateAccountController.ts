import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAccountUseCase } from "./UpdateAccountUseCase";

class UpdateAccountController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, clientName, foodBalance, mealBalance, cashBalance } =
            request.body;

        const updateAccountUseCase = container.resolve(UpdateAccountUseCase);

        await updateAccountUseCase.execute({
            id,
            clientName,
            foodBalance,
            mealBalance,
            cashBalance,
        });

        return response.status(200).send();
    }
}

export { UpdateAccountController };
