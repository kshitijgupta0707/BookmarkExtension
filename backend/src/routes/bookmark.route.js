import express from "express";
import { saveBookmark , getAllBookmarks } from "../controllers/bookmark.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const bookmarkRoute = express.Router();

bookmarkRoute.post("/save-bookmark", protectRoute, saveBookmark);
bookmarkRoute.get("/bookmarks", protectRoute, getAllBookmarks);

export default bookmarkRoute;