// import express from "express";
// import { authMiddleware } from "../middleware.js";
// import catchAsync from "../utils/CatchAsync.js";
// import { addBookmark, deleteBookmark, getBookmarks } from "../controllers/bookmark.controller.js";

// const router = express.Router();

// router.post("/", authMiddleware, catchAsync(addBookmark));
// router.get("/", authMiddleware, catchAsync(getBookmarks));
// router.delete("/:id", authMiddleware, catchAsync(deleteBookmark));

// export default router;


import express from "express";
import {
  createBookmark,
  getBookmarksByCategory,
  updateBookmark,
  deleteBookmark,
  moveBookmark,
} from "../controllers/bookmark.controller.js";
// import { authMiddleware } from "../middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();

// router.use(authenticate);
router.post("/", createBookmark);
router.get("/category/:categoryId", getBookmarksByCategory);
router.put("/:id", updateBookmark);
router.delete("/:id", deleteBookmark);
router.put("/move/:id", moveBookmark);

export default router;
