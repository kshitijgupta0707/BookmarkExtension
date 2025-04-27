// src/store/bookmarkStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useBookmarkStore = create((set, get) => ({
  bookmarks: [],
  loading: false,

  fetchBookmarks: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/bookmarks");
      set({ bookmarks: res.data });
    } catch (err) {
      toast.error("Failed to fetch bookmarks");
    } finally {
      set({ loading: false });
    }
  },

  fetchBookmarksByCategory: async (categoryId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/bookmarks/category/${categoryId}`);
      set({ bookmarks: res.data });
    } catch (err) {
      toast.error("Failed to fetch category bookmarks");
    } finally {
      set({ loading: false });
    }
  },

  createBookmark: async (bookmarkData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/bookmarks/create", bookmarkData);
      set((state) => ({
        bookmarks: [...state.bookmarks, res.data],
      }));
      toast.success("Bookmark created");
    } catch (err) {
      toast.error("Failed to create bookmark");
    } finally {
      set({ loading: false });
    }
  },

  createBookmarkwithExistingCategory: async (bookmarkData) => {
    set({ loading: true }); 
    try {
      const res = await axiosInstance.post("/bookmarks/createwithcategory", bookmarkData);
      set((state) => ({
        bookmarks: [...state.bookmarks, res.data],
      }));
      toast.success("Bookmark created");
    } catch (err) {
      toast.error("Failed to create bookmark");
    } finally {
      set({ loading: false });
    }
  },

  updateBookmark: async (id, updatedData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.put(`/bookmarks/update/${id}`, updatedData);
      set((state) => ({
        bookmarks: state.bookmarks.map((b) =>
          b._id === id ? res.data : b
        ),
      }));
      toast.success("Bookmark updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      set({ loading: false });
    }
  },

  deleteBookmark: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/bookmarks/delete/${id}`);
      set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b._id !== id),
      }));
      toast.success("Bookmark deleted");
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      set({ loading: false });
    }
  },

  moveBookmark: async (id, newCategoryId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.put(`/bookmarks/move/${id}`, {
        newCategoryId,
      });
      set((state) => ({
        bookmarks: state.bookmarks.map((b) =>
          b._id === id ? res.data : b
        ),
      }));
      toast.success("Bookmark moved");
    } catch (err) {
      toast.error("Failed to move bookmark");
    } finally {
      set({ loading: false });
    }
  },
}));
