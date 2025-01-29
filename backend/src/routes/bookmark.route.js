import express from "express";
import { saveBookmark } from "../controllers/bookmark.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const bookmarkRoute = express.Router();

bookmarkRoute.post("/save-bookmark", protectRoute, saveBookmark);

export default bookmarkRoute;