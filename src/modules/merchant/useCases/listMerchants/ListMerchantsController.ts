import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListMerchantsUsecase } from "./ListMerchantsUseCase";

class ListMerchantsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listMerchantsUseCase = container.resolve(ListMerchantsUsecase);
        const all = await listMerchantsUseCase.execute();
        return response.json(all);
    }
}

export { ListMerchantsController };
