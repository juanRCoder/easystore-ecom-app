import { Router } from "express";
import { param } from "express-validator";
import {
  getAll,
  getByCategoryId,
  create,
  getById,
} from "@server/api/products/products.controller";
import { uploader } from "@server/middlewares/imageUpload.middlware";

const productRouter = Router();

const validateUUID = (fieldName: string) =>
  param("id").isUUID().withMessage(`Invalid ${fieldName} ID`);

productRouter.get("/", getAll);
productRouter.get("/category/:id", validateUUID("category"), getByCategoryId);
productRouter.post("/", uploader("imageProduct"), create);
productRouter.get("/:id", validateUUID("product"), getById);

export default productRouter;
