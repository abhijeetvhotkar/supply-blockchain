import { Router } from "express";

import ProductController from "../controllers/ProductController";

const router = Router();
router.get("/", ProductController.getAllProducts);
router.post("/", ProductController.addProduct);

export default router;
