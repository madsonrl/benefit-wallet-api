import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTransactionsUseCase } from "./ListTransactionsUseCase";

class ListTransactionsController {
    async handle(request: Request, reponse: Response): Promise<Response> {
        const { accountId, id } = request.query;

        const listTransactionsUseCase = container.resolve(ListTransactionsUseCase);

        const transactions = await listTransactionsUseCase.execute({
            accountId: accountId as string,
            id: id as string,
        });

        return reponse.json(transactions);
    }
}
export { ListTransactionsController };
