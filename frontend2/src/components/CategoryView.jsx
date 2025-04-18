// import React, { useState } from "react";
// import { ExternalLink, Plus } from "lucide-react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// function CategoryView({ category, subCategoryId, onAddBookmark }) {
//   const [newBookmark, setNewBookmark] = useState({ name: "", url: "" });
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleAddBookmark = () => {
//     if (newBookmark.name.trim() && newBookmark.url.trim()) {
//       let url = newBookmark.url;
//       if (!url.startsWith("http://") && !url.startsWith("https://")) {
//         url = "https://" + url;
//       }

//       onAddBookmark(category.id, subCategoryId, { name: newBookmark.name, url });
//       setNewBookmark({ name: "", url: "" });
//       setOpenDialog(false);
//     }
//   };

//   const selectedSubCategory = subCategoryId
//     ? category.subCategories.find((sub) => sub.id === subCategoryId)
//     : null;

//   const bookmarks = selectedSubCategory ? selectedSubCategory.bookmarks : category.bookmarks;

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">
//           {selectedSubCategory ? selectedSubCategory.name : category.name}
//         </h2>
//         <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//           <DialogTrigger asChild>
//             <Button className="flex items-center gap-2">
//               <Plus size={16} />
//               <span>Add Bookmark</span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
//             <DialogHeader>
//               <DialogTitle>Add New Bookmark</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   id="name"
//                   placeholder="Website name"
//                   value={newBookmark.name}
//                   onChange={(e) =>
//                     setNewBookmark({ ...newBookmark, name: e.target.value })
//                   }
//                   className="bg-gray-800 border-gray-700"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="url">URL</Label>
//                 <Input
//                   id="url"
//                   placeholder="https://example.com"
//                   value={newBookmark.url}
//                   onChange={(e) =>
//                     setNewBookmark({ ...newBookmark, url: e.target.value })
//                   }
//                   className="bg-gray-800 border-gray-700"
//                 />
//               </div>
//               <Button onClick={handleAddBookmark}>Add Bookmark</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {!subCategoryId && category.subCategories.length > 0 && (
//         <div>
//           <h3 className="text-lg font-medium mb-3">Subcategories</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//             {category.subCategories.map((subCategory) => (
//               <Card
//                 key={subCategory.id}
//                 className="bg-gray-800 border-gray-700 hover:border-purple-500 cursor-pointer transition-all"
//               >
//                 <CardHeader>
//                   <CardTitle>{subCategory.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-gray-400">
//                     {subCategory.bookmarks.length} bookmarks
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       )}

//       <div>
//         <h3 className="text-lg font-medium mb-3">Bookmarks</h3>
//         {bookmarks.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {bookmarks.map((bookmark) => (
//               <a
//                 key={bookmark.id}
//                 href={bookmark.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group"
//               >
//                 <Card className="h-full bg-gray-800 border-gray-700 hover:border-purple-500 transition-all">
//                   <CardHeader className="pb-2">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={bookmark.favicon || "/placeholder.svg"}
//                         alt={bookmark.name}
//                         className="w-8 h-8 rounded"
//                         onError={(e) => {
//                           e.target.src = "/placeholder.svg?height=32&width=32";
//                         }}
//                       />
//                       <CardTitle className="text-lg">{bookmark.name}</CardTitle>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="text-sm text-gray-400 truncate">
//                     {bookmark.url}
//                   </CardContent>
//                   <CardFooter>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="ml-auto group-hover:text-purple-400"
//                     >
//                       <ExternalLink size={16} className="mr-1" /> Visit
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </a>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-gray-800 rounded-lg">
//             <p className="text-gray-400">
//               No bookmarks yet. Add your first bookmark!
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CategoryView;
import React, { useState } from "react";
import { ExternalLink, Plus, Trash2, ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { useCategoryStore } from "@/store/useCategoryStore";

function CategoryView({ category, bookmarks }) {
  const { createBookmark, deleteBookmark, moveBookmark } = useBookmarkStore();
  const { deleteCategory, moveCategory } = useCategoryStore();
  
  const [newBookmark, setNewBookmark] = useState({ title: "", url: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [targetCategory, setTargetCategory] = useState("");

  // Get bookmarks for current category
  const categoryBookmarks = bookmarks.filter(b => 
    b.category === category._id || 
    (b.category._id && b.category._id === category._id)
  );

  const handleAddBookmark = async () => {
    if (newBookmark.title.trim() && newBookmark.url.trim()) {
      let url = newBookmark.url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      await createBookmark({
        title: newBookmark.title,
        url,
        category: category._id
      });
      
      setNewBookmark({ title: "", url: "" });
      setOpenDialog(false);
    }
  };

  const handleDeleteBookmark = async (id) => {
    await deleteBookmark(id);
  };

  const handleMoveBookmark = async () => {
    if (selectedBookmark && targetCategory) {
      await moveBookmark(selectedBookmark, targetCategory);
      setSelectedBookmark(null);
      setTargetCategory("");
      setMoveDialogOpen(false);
    }
  };

  const prepareMove = (bookmarkId) => {
    setSelectedBookmark(bookmarkId);
    setMoveDialogOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (category._id) {
      await deleteCategory(category._id);
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
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>Add Bookmark</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
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
                <Button onClick={handleAddBookmark}>Add Bookmark</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="destructive" onClick={handleDeleteCategory}>
            <Trash2 size={16} className="mr-1" /> Delete Category
          </Button>
        </div>
      </div>

      {category.children && category.children.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3 text-white">Subcategories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {category.children.map((subCategory) => (
              <Card
                key={subCategory._id}
                className="bg-gray-800 border-gray-700 hover:border-purple-500 cursor-pointer transition-all text-white"
              >
                <CardHeader>
                  <CardTitle>{subCategory.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    {bookmarks.filter(b => 
                      b.category === subCategory._id || 
                      (b.category._id && b.category._id === subCategory._id)
                    ).length} bookmarks
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Move Bookmark</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Select Target Category</Label>
              <Select value={targetCategory} onValueChange={setTargetCategory}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800">
                  {/* Ideally you would have a flattened list of all categories here */}
                  <SelectItem value={category._id}>Current category</SelectItem>
                  {category.children?.map(cat => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleMoveBookmark}>Move Bookmark</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div>
        <h3 className="text-lg font-medium mb-3 text-white">Bookmarks</h3>
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
                        className="w-8 h-8 rounded"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=32&width=32";
                        }}
                      />
                      <CardTitle className="text-lg">{bookmark.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-400 truncate">
                    {bookmark.url}
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-2 ml-auto">
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