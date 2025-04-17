import Category from "../models/category.model.js";

//  Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const category = await Category.create({
      name,
      parent: parent || null,
      userId: req.user._id,
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all categories in nested structure
const buildTree = (categories, parent = null) => {
  return categories
    .filter(cat => String(cat.parent) === String(parent))
    .map(cat => ({
      _id: cat._id,
      name: cat.name,
      children: buildTree(categories, cat._id),
    }));
};

export const getCategoryTree = async (req, res) => {
  try {     
    const allCategories = await Category.find({ userId: req.user._id });
  
    const tree = buildTree(allCategories);
    res.json(tree);
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
