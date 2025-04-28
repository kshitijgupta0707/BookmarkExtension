import express from "express";
import {
  createCategory,
  getCategoryTree,
  updateCategory,
  deleteCategory,
  // moveCategory
} from "../controllers/category.controller.js";
// import { authMiddleware } from "../middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// router.use(authenticate); // assumes user is authenticated

router.post("/create", createCategory);
router.get("/tree", getCategoryTree);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);
// router.put("/move/:id", moveCategory);

export default router;
