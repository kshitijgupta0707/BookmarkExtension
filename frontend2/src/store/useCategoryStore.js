import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,

  // ✅ Fetch category tree
  fetchCategoryTree: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/categories/tree");
      set({ categories: res.data });
    } catch (err) {
      toast.error("Failed to fetch categories");
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Create a category
  createCategory: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/categories/create", data);
      toast.success("Category created");
      get().fetchCategoryTree(); // Refresh tree after creation
    } catch (err) {
      toast.error("Failed to create category");
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Update category name
  updateCategory: async (id, name) => {
    set({ loading: true });
    try {
      await axiosInstance.put(`/categories/update/${id}`, { name });
      toast.success("Category updated");
      get().fetchCategoryTree(); // Refresh tree after update
    } catch (err) {
      toast.error("Update failed");
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Delete a category
  deleteCategory: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.delete(`/categories/delete/${id}`);
      console.log("Category deleted")
      toast.success("Category deleted");

      const {categories} = get()
      let newCategory = categories.filter((cat)=> cat._id !== id)

      set((state) => ({
        categories: newCategory,
      }));
      // get().fetchCategoryTree(); // Refresh tree after deletion
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Move category to a new parent
  moveCategory: async (id, newParentId) => {
    set({ loading: true });
    try {
      await axiosInstance.put(`/categories/move/${id}`, {
        newParentId,
      });
      toast.success("Category moved");
      get().fetchCategoryTree(); // Refresh tree after move
    } catch (err) {
      toast.error("Move failed");
    } finally {
      set({ loading: false });
    }
  },
}));
