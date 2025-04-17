// import Bookmark from "../models/bookmark.model.js";

// export const addBookmark = async (req, res) => {
//   console.log("add book mark req recieved from extendsion")
//     const { title, url, category } = req.body;
//     console.log(req.body)
//   if (!title || !url) {
//     throw new Error("Title and URL are required");
//   }

//   const bookmark = new Bookmark({ userId: req.userId, title, url, category });
//   await bookmark.save();
//   res.status(201).json({ message: "Bookmark saved", bookmark });
  
// };

// export const getBookmarks = async (req, res) => {

//   console.log("requeset reieved to get all the book marks")
  
//     const bookmarks = await Bookmark.find({ userId: req.userId });
//     res.json(bookmarks);
//   console.log(bookmarks)
// };

// export const deleteBookmark = async (req, res) => {
//   try {
//     console.log("Deleete a book mark request")
//     await Bookmark.findByIdAndDelete(req.params.id);
//     res.json({ message: "Bookmark deleted" });
//   } catch (err) {
//     res.status(500).json({ error: "Delete failed" });
//   }
// };

import Bookmark from "../models/bookmark.model.js";

// Create a new bookmark
export const createBookmark = async (req, res) => {
  try {
    console.log("I am here")
    const { title, url, category, mlCategory } = req.body;
    const newBookmark = await Bookmark.create({
      title,
      url,
      category,
      mlCategory,
      userId: req.user._id,
    });
    res.status(201).json(newBookmark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get all bookmarks in a specific category (with subcategories optional)
export const getBookmarksByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const bookmarks = await Bookmark.find({
      userId: req.userId,
      category: categoryId,
    });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update bookmark (title, URL, category)
export const updateBookmark = async (req, res) => {
  try {
    const { title, url, category } = req.body;
    const updated = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, url, category },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Delete bookmark
export const deleteBookmark = async (req, res) => {
  try {
    await Bookmark.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Bookmark deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Move bookmark to another category
export const moveBookmark = async (req, res) => {
  try {
    const { newCategoryId } = req.body;
    const moved = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { category: newCategoryId },
      { new: true }
    );
    res.json(moved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
