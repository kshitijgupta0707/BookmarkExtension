import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const {cookie , cookies } = req;
  console.log(cookie , cookies    )
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
  }
};


