import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAccountUseCase } from "./CreateAccountUseCase";

class CreateAccountController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { clientName, foodBalance, mealBalance, cashBalance } =
            request.body;
        const createAccountUseCase = container.resolve(CreateAccountUseCase);
        await createAccountUseCase.execute({
            clientName,
            foodBalance,
            mealBalance,
            cashBalance,
        });
        return response.status(200).send();
    }
}

export { CreateAccountController };

