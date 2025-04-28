import Bookmark from "../models/bookmark.model.js";
import Category from "../models/category.model.js";
// Create a new bookmark
export const createBookmark = async (req, res) => {
  try {
    console.log("create book mark")
    const { title, url} = req.body;

    // const predictCategory = await fetch(
    //   `http://127.0.0.1:5000/predict`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify({url, content: title}),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    console.log("I am here")

    // const predictCategoryData = await predictCategory.json();
    // console.log(predictCategoryData)
    console.log("I am here")
    const existingCategory = await Category.findOne({
      userId: req.user._id, 
      name: "facebook",
    });

    console.log("I am here")

    if (existingCategory) {
      const newBookmark = await Bookmark.create({
        title,
        url,
        category : existingCategory._id,
        userId: req.user._id,
      });
      console.log(newBookmark)
      return res.status(201).json(newBookmark);
    }

    console.log("I am here")


    const newCategory = await Category.create({
      name: "facebook",
      userId: req.user._id,
    });

    const newBookmark = await Bookmark.create({
      title,
      url,
      category: newCategory._id,
      userId: req.user._id,
    });

    console.log("I am here")
    
    console.log(newBookmark)
    res.status(201).json(newBookmark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBookmarkWithCategory = async (req, res) => {
  try {
    console.log("create bookmark with category");
    const { title, url, category } = req.body;
    if (!title || !url) {
      throw new Error("Title and URL are required");
    }

    const bookmark = new Bookmark({
      userId: req.user._id,
      title,
      url,
      category,
    });
    await bookmark.save();
    res.status(201).json({ message: "Bookmark saved", bookmark });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//  Get all bookmarks in a specific category (with subcategories optional)
export const getBookmarksByCategory = async (req, res) => {
  try {
    console.log("get book mark by category called");
    const categoryId = req.params.categoryId;
    const bookmarks = await Bookmark.find({
      userId: req.user._id,
      category: categoryId,
    });
    console.log(bookmarks);
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get all bookmarks in a specific category (with subcategories optional)
export const getBookmarks = async (req, res) => {
  try {
    console.log("get all bookmarks");
    const bookmarks = await Bookmark.find({
      userId: req.user._id,
    }).populate("category");
    console.log()
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
      { _id: req.params.id, userId: req.user._id },
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
    await Bookmark.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: "Bookmark deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Move bookmark to another category
export const moveBookmark = async (req, res) => {
  try {
    console.log(" move book mark is called")
    const { newCategoryId } = req.body;
    const moved = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { category: newCategoryId },
      { new: true }
    );
    res.json(moved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
