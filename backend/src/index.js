import express from 'express'
import { dbConnect } from './config/database.js'
//googgle login
import authRoutes from './routes/auth.route.js'
import bookmarkRoute from './routes/bookmark.route.js'
// import googleAuth from "./routes/authRoutes.js"
// import geminiRouter from "./routes/gemini.route.js"
import cookieParser from 'cookie-parser'
import cors from "cors";
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: '../.env' });


const app = express()

//so you can send json response and request
app.use(express.json());

//so that we can access the data in the cookie file

app.use(cookieParser());

// //to remove cors error
// app.use(cors(
//   {
//     origin: "http://localhost:5173",
//     credentials: true
//   }
// ))
//merging the router with server
app.use("/api/auth", authRoutes);
app.use("/api/", bookmarkRoute);

// /AUTH/GOOGLE/CALLBACK
// app.use("/auth", googleAuth);
// app.use("/api/", geminiRouter);

//starting the server

const __dirname = path.resolve()
 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
  dbConnect()

})
