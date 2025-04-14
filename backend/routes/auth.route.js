import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import catchAsync from "../utils/CatchAsync.js";
// import { protectRoute } from "../middleware.js";

const authRoutes = express.Router();

authRoutes.post("/signup", catchAsync(signup));
authRoutes.post("/login", catchAsync(login));
// authRoutes.post("/logout", logout);

export default authRoutes;


