import mongoose from "mongoose";
import { User } from "./user.model.js";

const BookmarkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    url: String,
  },{
    timestamps: true
  });
  const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
  export { Bookmark };
    