import { Router } from "express";
import { param } from "express-validator";
import {
  getAllProducts,
  getProductsByCategoryId,
  createProduct
} from "@server/api/products/products.controller";
import { uploader } from "@server/middlewares/imageUpload.middlware";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get(
  "/category/:id",
  param("id").isUUID().withMessage(`Invalid category ID`),
  getProductsByCategoryId
);
productRouter.post("/", uploader("imageProduct"), createProduct)

export default productRouter;
