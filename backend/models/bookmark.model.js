import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // mlCategory: { type: String }, // initially suggested category
  },
  { timestamps: true }
);


export default mongoose.model("Bookmark", bookmarkSchema);


