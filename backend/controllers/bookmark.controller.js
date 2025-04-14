import Bookmark from "../models/bookmark.model.js";

export const addBookmark = async (req, res) => {
  console.log("add book mark req recieved from extendsion")
    const { title, url, category } = req.body;
    console.log(req.body)
  if (!title || !url) {
    throw new Error("Title and URL are required");
  }

  const bookmark = new Bookmark({ userId: req.userId, title, url, category });
  await bookmark.save();
  res.status(201).json({ message: "Bookmark saved", bookmark });
  
};

export const getBookmarks = async (req, res) => {

  console.log("requeset reieved to get all the book marks")
  
    const bookmarks = await Bookmark.find({ userId: req.userId });
    res.json(bookmarks);
  console.log(bookmarks)
};

export const deleteBookmark = async (req, res) => {
  try {
    console.log("Deleete a book mark request")
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: "Bookmark deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

