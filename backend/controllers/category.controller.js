import Category from "../models/category.model.js";

//  Create a new category
export const createCategory = async (req, res) => {
  try {
    console.log("Createing the category" , req.body)
    const { name } = req.body;
    const category = await Category.create({
      name,
      userId: req.user._id,
    });
    console.log("Category created", category)
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryTree = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user._id });
    res.json(categories);
  } catch (err) { 
    res.status(500).json({ error: err.message });
  }
};

//  Update category name
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Delete category (and optionally subcategories)
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Move category to a new parent
export const moveCategory = async (req, res) => {
  try {
    const { newParentId } = req.body;
    const moved = await Category.findByIdAndUpdate(req.params.id, { parent: newParentId || null }, { new: true });
    res.json(moved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
