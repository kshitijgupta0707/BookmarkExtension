import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Plus, Trash2, ArrowRightLeft, PencilLine } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { useCategoryStore } from "@/store/useCategoryStore";

function CategoryView({ category, bookmarks, onBreadcrumbClick }) {
  const navigate = useNavigate();
  const { createBookmark, createBookmarkwithExistingCategory, deleteBookmark, moveBookmark, updateBookmark } = useBookmarkStore();
  const { categories, deleteCategory, updateCategory } = useCategoryStore();

  const [newBookmark, setNewBookmark] = useState({ title: "", url: "" });
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [targetCategory, setTargetCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial editing category name when category changes
  useEffect(() => {
    if (category) {
      setEditingCategoryName(category.name);
    }
  }, [category]);

  // Early return if category is null or undefined
  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg text-gray-300">
        <h2 className="text-xl font-medium mb-4">Category not found</h2>
        <p className="text-gray-400 mb-6">The category may have been deleted or doesn't exist.</p>
        <Button onClick={() => onBreadcrumbClick(0)} className="bg-purple-600 hover:bg-purple-700">
          Return to Categories
        </Button>
      </div>
    );
  }

  // Get bookmarks for current category
  const categoryBookmarks = bookmarks.filter(b =>
    b.category === category._id ||
    (b.category && b.category._id === category._id)
  );

  const handleAddBookmark = async () => {
    if (newBookmark.title.trim() && newBookmark.url.trim()) {
      setIsSubmitting(true);
      let url = newBookmark.url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      await createBookmarkwithExistingCategory({
        title: newBookmark.title,
        url,
        category: category._id,
      });

      setNewBookmark({ title: "", url: "" });
      setOpenDialog(false);
      setIsSubmitting(false);
    }
  };

  const handleEditBookmark = async () => {
    if (editingBookmark && editingBookmark.title.trim() && editingBookmark.url.trim()) {
      setIsSubmitting(true);
      let url = editingBookmark.url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      await updateBookmark(editingBookmark._id, {
        title: editingBookmark.title,
        url,
        category: editingBookmark.category
      });

      setEditingBookmark(null);
      setEditDialogOpen(false);
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (editingCategoryName.trim()) {
      setIsSubmitting(true);
      await updateCategory(category._id, editingCategoryName);
      setEditCategoryDialogOpen(false);
      setIsSubmitting(false);
    }
  };

  const handleDeleteBookmark = async (id) => {
    await deleteBookmark(id);
  };

  const handleMoveBookmark = async () => {
    if (selectedBookmark && targetCategory) {
      setIsSubmitting(true);
      await moveBookmark(selectedBookmark, targetCategory);
      setSelectedBookmark(null);
      setTargetCategory("");
      setMoveDialogOpen(false);
      setIsSubmitting(false);
    }
  };

  const prepareMove = (bookmarkId) => {
    setSelectedBookmark(bookmarkId);
    setMoveDialogOpen(true);
  };

  const prepareEdit = (bookmark) => {
    setEditingBookmark({ ...bookmark });
    setEditDialogOpen(true);
  };

  const prepareEditCategory = () => {
    setEditingCategoryName(category.name);
    setEditCategoryDialogOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (category._id) {
      if (categoryBookmarks.length > 0) {
        alert("Cannot delete category with bookmarks. Please move or delete all bookmarks first.");
        return;
      }
      
      setIsSubmitting(true);
      try {
        await deleteCategory(category._id);
        // Navigate to categories list after successful deletion
        // navigate("/categories");
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Extract favicon from URL
  const getFavicon = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
    } catch (error) {
      return "/placeholder.svg";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{category.name}</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={prepareEditCategory}
            className="hover:bg-gray-700"
          >
            <PencilLine size={16} className="mr-1" /> Edit
          </Button>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
                <Plus size={16} />
                <span>Add Bookmark</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-700">
              <DialogHeader>
                <DialogTitle>Add New Bookmark</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Website name"
                    value={newBookmark.title}
                    onChange={(e) =>
                      setNewBookmark({ ...newBookmark, title: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={newBookmark.url}
                    onChange={(e) =>
                      setNewBookmark({ ...newBookmark, url: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <Button 
                  onClick={handleAddBookmark} 
                  disabled={isSubmitting || !newBookmark.title.trim() || !newBookmark.url.trim()}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700"
                >
                  {isSubmitting ? "Adding..." : "Add Bookmark"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            variant="destructive" 
            onClick={handleDeleteCategory}
            disabled={isSubmitting}
          >
            <Trash2 size={16} className="mr-1" /> Delete Category
          </Button>
        </div>
      </div>

      <Dialog open={editCategoryDialogOpen} onOpenChange={setEditCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="categoryName">Name</Label>
              <Input
                id="categoryName"
                placeholder="Category name"
                value={editingCategoryName}
                onChange={(e) => setEditingCategoryName(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <Button 
              onClick={handleUpdateCategory} 
              disabled={isSubmitting || !editingCategoryName.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700"
            >
              {isSubmitting ? "Updating..." : "Update Category"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Edit Bookmark</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editTitle">Title</Label>
              <Input
                id="editTitle"
                placeholder="Website name"
                value={editingBookmark?.title || ""}
                onChange={(e) =>
                  setEditingBookmark({ ...editingBookmark, title: e.target.value })
                }
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editUrl">URL</Label>
              <Input
                id="editUrl"
                placeholder="https://example.com"
                value={editingBookmark?.url || ""}
                onChange={(e) =>
                  setEditingBookmark({ ...editingBookmark, url: e.target.value })
                }
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <Button 
              onClick={handleEditBookmark} 
              disabled={isSubmitting || !editingBookmark?.title?.trim() || !editingBookmark?.url?.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700"
            >
              {isSubmitting ? "Updating..." : "Update Bookmark"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Move Bookmark</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Select Target Category</Label>
              <Select value={targetCategory} onValueChange={setTargetCategory}>
                <SelectTrigger id="category" className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  {categories?.filter(cat => cat._id !== category._id).map(cat => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleMoveBookmark} 
              disabled={isSubmitting || !targetCategory}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700"
            >
              {isSubmitting ? "Moving..." : "Move Bookmark"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Bookmarks</h3>
        {categoryBookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categoryBookmarks.map((bookmark) => (
              <div key={bookmark._id} className="group relative">
                <Card className="h-full bg-gray-800 border-gray-700 hover:border-purple-500 transition-all text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={getFavicon(bookmark.url)}
                        alt={bookmark.title}
                        className="w-8 h-8 rounded bg-gray-700"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                      <CardTitle className="text-lg truncate text-wrap">{bookmark.title.length > 15 ? bookmark.title.slice(0,15) + ".." : bookmark.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-400 truncate">
                    {bookmark.url}
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-wrap items-center gap-2 ml-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => prepareEdit(bookmark)}
                        className="group-hover:text-yellow-400"
                      >
                        <PencilLine size={16} className="mr-1" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => prepareMove(bookmark._id)}
                        className="group-hover:text-blue-400"
                      >
                        <ArrowRightLeft size={16} className="mr-1" /> Move
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBookmark(bookmark._id)}
                        className="group-hover:text-red-400"
                      >
                        <Trash2 size={16} className="mr-1" /> Delete
                      </Button>
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="group-hover:text-purple-400"
                        >
                          <ExternalLink size={16} className="mr-1" /> Visit
                        </Button>
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400">
              No bookmarks yet. Add your first bookmark!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryView;