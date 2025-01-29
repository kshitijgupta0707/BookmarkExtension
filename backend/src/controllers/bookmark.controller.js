import { Bookmark } from "../models/bookmark.model.js";

export const saveBookmark = async (req, res) =>{
    try {
        const { title, url } = req.body;
        const newBookmark = new Bookmark({ userId: req.user._id, title, url });
        await newBookmark.save();
        res.json({ message: "Bookmark saved successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to save bookmark" });
      } 
}

