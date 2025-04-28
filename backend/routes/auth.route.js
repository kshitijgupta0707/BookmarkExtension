import express from "express";
import { signup, login , checkAuth , directLoginWithoutPassword} from "../controllers/auth.controller.js";
import catchAsync from "../utils/CatchAsync.js";
// import { protectRoute } from "../middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
 

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/loginWithoutPassword", directLoginWithoutPassword);

authRoutes.get("/check", authenticate , checkAuth);
// authRoutes.post("/logout", logout);

export default authRoutes;


