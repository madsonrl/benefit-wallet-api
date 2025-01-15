import { Router } from "express";

import { CreateMerchantController } from "@modules/merchant/useCases/createMerchant/CreateMerchantController";
import { DeleteMerchantController } from "@modules/merchant/useCases/deleteMerchant/DeleteMerchantController";
import { ListMerchantsController } from "@modules/merchant/useCases/listMerchants/ListmerchantsController";
import { UpdateMerchantController } from "@modules/merchant/useCases/updateMerchant/UpdateMerchantController";


const merchantsRoutes = Router();

const createMerchantController = new CreateMerchantController();
const listMerchantsController = new ListMerchantsController();
const updateMerchantController = new UpdateMerchantController();
const deleteMerchantController = new DeleteMerchantController();

merchantsRoutes.post(
    "/",
    createMerchantController.handle
);

merchantsRoutes.get("/", listMerchantsController.handle);

merchantsRoutes.put(
    "/update",
    updateMerchantController.handle
);

merchantsRoutes.delete(
    "/delete",
    deleteMerchantController.handle
);

export { merchantsRoutes };
