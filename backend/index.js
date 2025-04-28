import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import ExpressError from "./utils/ExpressError.js";
import categoryRoutes from "./routes/category.route.js"
import bookmarkRoutes from "./routes/bookmark.route.js"
import { authenticate } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["chrome-extension://ajjjglminmeilfbmmjedhilnkemeokbh", "http://localhost:5173", "https://onebookmarker.vercel.app"],
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

// Database Connection
const DB_URL = process.env.MONGO_URI;
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Database connected")
});

// Health check route
app.get("/", (req, res) => {
  res.send(" Bookmark Organizer Server Running");
});



app.use('/api/auth', authRoutes);
app.use("/api/categories", authenticate, categoryRoutes);
app.use("/api/bookmarks", authenticate, bookmarkRoutes);

// 404 Error Handling
app.all("*", (req, res, next) => {
  next(new ExpressError('page not found', 404));
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  console.log(err);
  res.status(statusCode).json(err.message);
});


if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
export default app