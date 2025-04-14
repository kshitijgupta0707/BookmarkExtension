import mongoose from "mongoose";
const BookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  url: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
  visitCount: { type: Number, default: 0 }
});


const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
export default Bookmark;
