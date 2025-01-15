import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteTransactionUseCase } from "./DeleteTransactionUseCase";

class DeleteTransactionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.query;

        const deleteTransactionUseCase = container.resolve(DeleteTransactionUseCase);
        await deleteTransactionUseCase.execute({
            id: id as string,
        });

        return response.status(200).send();
    }
}

export { DeleteTransactionController };
