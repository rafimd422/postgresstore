import express, { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controller/productController.ts";

const router: Router = express.Router();
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/:id", deleteProduct);

export default router;