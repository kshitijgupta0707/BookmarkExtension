// import { useState } from "react";
// import { ExternalLink, Plus } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function BookmarkGrid({ categories, onCategorySelect, onAddBookmark }) {
//   const [newBookmark, setNewBookmark] = useState({ name: "", url: "" });
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleAddBookmark = () => {
//     if (newBookmark.name.trim() && newBookmark.url.trim()) {
//       let url = newBookmark.url;
//       if (!url.startsWith("http://") && !url.startsWith("https://")) {
//         url = "https://" + url;
//       }

//       onAddBookmark({ name: newBookmark.name, url });
//       setNewBookmark({ name: "", url: "" });
//       setOpenDialog(false);
//     }
//   };

//   const allBookmarks = categories.flatMap((category) => [
//     ...category.bookmarks,
//     ...category.subCategories.flatMap((subCategory) => subCategory.bookmarks),
//   ]);

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-white">All Bookmarks</h2>
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

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-white">
//         {allBookmarks.map((bookmark) => (
//           <a
//             key={bookmark.id}
//             href={bookmark.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group"
//           >
//             <Card className="h-full bg-gray-800 border-gray-700 hover:border-purple-500 transition-all">
//               <CardHeader className="pb-2">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={bookmark.favicon || "/placeholder.svg"}
//                     alt={bookmark.name}
//                     className="w-8 h-8 rounded"
//                     onError={(e) => {
//                       e.target.src = "/placeholder.svg?height=32&width=32";
//                     }}
//                   />
//                   <CardTitle className="text-lg">{bookmark.name}</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent className="text-sm text-white truncate">
//                 {bookmark.url}
//               </CardContent>
//               <CardFooter>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="ml-auto group-hover:text-purple-400"
//                 >
//                   <ExternalLink size={16} className="mr-1" /> Visit
//                 </Button>
//               </CardFooter>
//             </Card>
//           </a>
//         ))}
//       </div>

//       <div className="mt-12">
//         <h2 className="text-2xl font-bold mb-6 text-white ">Categories</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {categories.map((category) => (
//             <Card
//               key={category.id}
//               className="bg-gray-800 border-gray-700 hover:border-purple-500 cursor-pointer transition-all text-white"
//               onClick={() => onCategorySelect(category.id)}
//             >
//               <CardHeader>
//                 <CardTitle>{category.name}</CardTitle>
//                 <CardDescription>
//                   {category.bookmarks.length} bookmarks,{" "}
//                   {category.subCategories.length} subcategories
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-wrap gap-2">
//                   {category.bookmarks.slice(0, 5).map((bookmark) => (
//                     <img
//                       key={bookmark.id}
//                       src={bookmark.favicon || "/placeholder.svg"}
//                       alt={bookmark.name}
//                       title={bookmark.name}
//                       className="w-6 h-6 rounded"
//                       onError={(e) => {
//                         e.target.src = "/placeholder.svg?height=24&width=24";
//                       }}
//                     />
//                   ))}
//                   {category.bookmarks.length > 5 && (
//                     <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-xs">
//                       +{category.bookmarks.length - 5}
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { ExternalLink, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBookmarkStore } from "@/store/useBookmarkStore";

export function BookmarkGrid({ bookmarks, categories, onCategorySelect }) {
  const { createBookmark } = useBookmarkStore();
  const [newBookmark, setNewBookmark] = useState({ title: "", url: "", category: "" });
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddBookmark = async () => {
    if (newBookmark.title.trim() && newBookmark.url.trim() && newBookmark.category) {
      let url = newBookmark.url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      await createBookmark({
        title: newBookmark.title,
        url: url,
        category: newBookmark.category
      });
      
      setNewBookmark({ title: "", url: "", category: "" });
      setOpenDialog(false);
    }
  };

  // Flatten categories for select dropdown
  const flattenCategories = (cats, result = []) => {
    cats.forEach(cat => {
      result.push(cat);
      if (cat.children && cat.children.length > 0) {
        flattenCategories(cat.children, result);
      }
    });
    return result;
  };
  
  const flatCategories = flattenCategories(categories);

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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">All Bookmarks</h2>
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
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newBookmark.category} 
                  onValueChange={(value) => setNewBookmark({ ...newBookmark, category: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800">
                    {flatCategories.map(cat => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddBookmark}>Add Bookmark</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-white">
        {bookmarks.map((bookmark) => (
          <a
            key={bookmark._id}
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="h-full bg-gray-800 border-gray-700 hover:border-purple-500 transition-all">
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
              <CardContent className="text-sm text-white truncate">
                {bookmark.url}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto group-hover:text-purple-400"
                >
                  <ExternalLink size={16} className="mr-1" /> Visit
                </Button>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card
              key={category._id}
              className="bg-gray-800 border-gray-700 hover:border-purple-500 cursor-pointer transition-all text-white"
              onClick={() => onCategorySelect(category._id)}
            >
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>
                  {bookmarks.filter(b => b.category === category._id || 
                                    (b.category._id && b.category._id === category._id))
                                    .length} bookmarks,{" "}
                  {category.children?.length || 0} subcategories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {bookmarks
                    .filter(b => b.category === category._id || 
                           (b.category._id && b.category._id === category._id))
                    .slice(0, 5)
                    .map((bookmark) => (
                    <img
                      key={bookmark._id}
                      src={getFavicon(bookmark.url)}
                      alt={bookmark.title}
                      title={bookmark.title}
                      className="w-6 h-6 rounded"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=24&width=24";
                      }}
                    />
                  ))}
                  {bookmarks.filter(b => b.category === category._id || 
                                (b.category._id && b.category._id === category._id)).length > 5 && (
                    <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-xs">
                      +{bookmarks.filter(b => b.category === category._id || 
                        (b.category._id && b.category._id === category._id)).length - 5}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}