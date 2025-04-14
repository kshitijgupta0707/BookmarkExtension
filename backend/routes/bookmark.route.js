import express from "express";
import { authMiddleware } from "../middleware.js";
import catchAsync from "../utils/CatchAsync.js";
import { addBookmark, deleteBookmark, getBookmarks } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.post("/", authMiddleware, catchAsync(addBookmark));
router.get("/", authMiddleware, catchAsync(getBookmarks));
router.delete("/:id", authMiddleware, catchAsync(deleteBookmark));

export default router;
