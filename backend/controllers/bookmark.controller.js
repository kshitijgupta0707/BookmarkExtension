import Bookmark from "../models/bookmark.model.js";

export const addBookmark = async (req, res) => {
    const { title, url, category } = req.body;
  if (!title || !url) {
    throw new Error("Title and URL are required");
  }

  const bookmark = new Bookmark({ userId: req.userId, title, url, category });
  await bookmark.save();
  res.status(201).json({ message: "Bookmark saved", bookmark });
  
};

export const getBookmarks = async (req, res) => {
  
    const bookmarks = await Bookmark.find({ userId: req.userId });
    res.json(bookmarks);
  
};

export const deleteBookmark = async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: "Bookmark deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

