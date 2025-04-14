import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import bookmarkRoutes from "./routes/bookmark.route.js";
import ExpressError from "./utils/ExpressError.js";


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "chrome-extension://ajjjglminmeilfbmmjedhilnkemeokbh",
  })
);

app.use(express.json());

// Database Connection
const DB_URL = process.env.MONGO_URI;
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
});

app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
// app.use('/api/media', mediaRoutes);
// app.use('/api/history', historyRoutes);
// app.use("/api/watchlist", watchlistRoutes);
// app.use("/api/progress", watchProgressRoutes);

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