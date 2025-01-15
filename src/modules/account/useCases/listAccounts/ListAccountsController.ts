import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAccountsUsecase } from "./ListAccountsUseCase";

class ListAccountsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listAccountsUseCase = container.resolve(ListAccountsUsecase);
        const all = await listAccountsUseCase.execute();
        return response.json(all);
    }
}

export { ListAccountsController };
