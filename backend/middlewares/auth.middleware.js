import jwt from "jsonwebtoken";
import User  from "../models/user.model.js";


export const authenticate = async (req, res, next) => {
  
    const token = req.cookies.token;
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("adding the user in rqust")
      req.user = await User.findById(decoded.id).select("-password");
      console.log("authenticated user:", req.user);
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };

  