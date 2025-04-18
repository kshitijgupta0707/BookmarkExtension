
// // import { useState } from "react";
// // import {
// //   ChevronDown,
// //   ChevronRight,
// //   FolderPlus,
// //   Plus,
// //   Bookmark,
// //   FolderOpen,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";

// // export function Sidebar({
// //   categories,
// //   selectedCategory,
// //   selectedSubCategory,
// //   onCategorySelect,
// //   onSubCategorySelect,
// //   onAddCategory,
// //   onAddSubCategory,
// // }) {
// //   const [newCategoryName, setNewCategoryName] = useState("");
// //   const [newSubCategoryName, setNewSubCategoryName] = useState("");
// //   const [addingSubCategoryFor, setAddingSubCategoryFor] = useState(null);
// //   const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
// //   const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false);

// //   const handleAddCategory = () => {
// //     if (newCategoryName.trim()) {
// //       onAddCategory(newCategoryName);
// //       setNewCategoryName("");
// //       setOpenCategoryDialog(false);
// //     }
// //   };

// //   const handleAddSubCategory = () => {
// //     if (newSubCategoryName.trim() && addingSubCategoryFor) {
// //       onAddSubCategory(addingSubCategoryFor, newSubCategoryName);
// //       setNewSubCategoryName("");
// //       setAddingSubCategoryFor(null);
// //       setOpenSubCategoryDialog(false);
// //     }
// //   };

// //   const startAddSubCategory = (categoryId) => {
// //     setAddingSubCategoryFor(categoryId);
// //     setOpenSubCategoryDialog(true);
// //   };

// //   return (
// //     <div className="w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto flex flex-col">
// //       <div className="p-4 border-b border-gray-800">
// //         <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
// //           <DialogTrigger asChild>
// //             <Button variant="outline" className="w-full flex items-center justify-center gap-2">
// //               <FolderPlus size={16} />
// //               <span>Add Category</span>
// //             </Button>
// //           </DialogTrigger>
// //           <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
// //             <DialogHeader>
// //               <DialogTitle>Add New Category</DialogTitle>
// //             </DialogHeader>
// //             <div className="grid gap-4 py-4">
// //               <Input
// //                 placeholder="Category name"
// //                 value={newCategoryName}
// //                 onChange={(e) => setNewCategoryName(e.target.value)}
// //                 className="bg-gray-800 border-gray-700"
// //               />
// //               <Button onClick={handleAddCategory}>Add Category</Button>
// //             </div>
// //           </DialogContent>
// //         </Dialog>
// //       </div>

// //       <Dialog open={openSubCategoryDialog} onOpenChange={setOpenSubCategoryDialog}>
// //         <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
// //           <DialogHeader>
// //             <DialogTitle>Add New Subcategory</DialogTitle>
// //           </DialogHeader>
// //           <div className="grid gap-4 py-4">
// //             <Input
// //               placeholder="Subcategory name"
// //               value={newSubCategoryName}
// //               onChange={(e) => setNewSubCategoryName(e.target.value)}
// //               className="bg-gray-800 border-gray-700"
// //             />
// //             <Button onClick={handleAddSubCategory}>Add Subcategory</Button>
// //           </div>
// //         </DialogContent>
// //       </Dialog>

// //       <nav className="flex-1 p-2">
// //         <ul className="space-y-1">
// //           {categories.map((category) => (
// //             <li key={category.id} className="text-sm">
// //               <div className="flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer">
// //                 <div
// //                   className={`flex items-center gap-2 flex-1 ${
// //                     selectedCategory === category.id ? "text-purple-400 font-medium" : "text-gray-300"
// //                   }`}
// //                   onClick={() => onCategorySelect(category.id)}
// //                 >
// //                   {category.subCategories.length > 0 ? (
// //                     selectedCategory === category.id ? (
// //                       <ChevronDown size={16} />
// //                     ) : (
// //                       <ChevronRight size={16} />
// //                     )
// //                   ) : (
// //                     <Bookmark size={16} />
// //                   )}
// //                   <span>{category.name}</span>
// //                 </div>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   className="h-6 w-6"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     startAddSubCategory(category.id);
// //                   }}
// //                 >
// //                   <Plus size={14} />
// //                 </Button>
// //               </div>

// //               {selectedCategory === category.id && category.subCategories.length > 0 && (
// //                 <ul className="pl-6 mt-1 space-y-1">
// //                   {category.subCategories.map((subCategory) => (
// //                     <li key={subCategory.id}>
// //                       <div
// //                         className={`flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer ${
// //                           selectedSubCategory === subCategory.id
// //                             ? "text-purple-400 font-medium"
// //                             : "text-gray-300"
// //                         }`}
// //                         onClick={() => onSubCategorySelect(category.id, subCategory.id)}
// //                       >
// //                         <FolderOpen size={16} />
// //                         <span>{subCategory.name}</span>
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               )}
// //             </li>
// //           ))}
// //         </ul>
// //       </nav>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   FolderPlus,
//   Plus,
//   Bookmark,
//   FolderOpen,
//   Trash2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useCategoryStore } from "@/store/useCategoryStore";

// export function Sidebar({
//   categories,
//   selectedCategory,
//   onCategorySelect,
// }) {
//   const { createCategory, createSubCategory } = useCategoryStore();
  
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newSubCategoryName, setNewSubCategoryName] = useState("");
//   const [addingSubCategoryFor, setAddingSubCategoryFor] = useState(null);
//   const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
//   const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false);

//   const handleAddCategory = async () => {
//     if (newCategoryName.trim()) {
//       await createCategory({ name: newCategoryName });
//       setNewCategoryName("");
//       setOpenCategoryDialog(false);
//     }
//   };

//   const handleAddSubCategory = async () => {
//     if (newSubCategoryName.trim() && addingSubCategoryFor) {
//       await createCategory({ 
//         name: newSubCategoryName, 
//         parent: addingSubCategoryFor 
//       });
//       setNewSubCategoryName("");
//       setAddingSubCategoryFor(null);
//       setOpenSubCategoryDialog(false);
//     }
//   };

//   const startAddSubCategory = (categoryId, e) => {
//     e.stopPropagation();
//     setAddingSubCategoryFor(categoryId);
//     setOpenSubCategoryDialog(true);
//   };

//   // Recursive function to render category tree
//   const renderCategoryTree = (cats, level = 0) => {
//     return cats.map((category) => (
//       <li key={category._id} className="text-sm">
//         <div className="flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer">
//           <div
//             className={`flex items-center gap-2 flex-1 ${
//               selectedCategory === category._id ? "text-purple-400 font-medium" : "text-gray-300"
//             }`}
//             onClick={() => onCategorySelect(category._id)}
//             style={{ paddingLeft: `${level * 12}px` }}
//           >
//             {category.children && category.children.length > 0 ? (
//               selectedCategory === category._id ? (
//                 <ChevronDown size={16} />
//               ) : (
//                 <ChevronRight size={16} />
//               )
//             ) : (
//               <Bookmark size={16} />
//             )}
//             <span>{category.name}</span>
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-6 w-6"
//             onClick={(e) => startAddSubCategory(category._id, e)}
//           >
//             <Plus size={14} />
//           </Button>
//         </div>

//         {category.children && category.children.length > 0 && (
//           <ul className="mt-1">
//             {renderCategoryTree(category.children, level + 1)}
//           </ul>
//         )}
//       </li>
//     ));
//   };

//   return (
//     <div className="w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto flex flex-col">
//       <div className="p-4 border-b border-gray-800">
//         <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
//           <DialogTrigger asChild>
//             <Button variant="outline" className="w-full flex items-center justify-center gap-2">
//               <FolderPlus size={16} />
//               <span>Add Category</span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
//             <DialogHeader>
//               <DialogTitle>Add New Category</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <Input
//                 placeholder="Category name"
//                 value={newCategoryName}
//                 onChange={(e) => setNewCategoryName(e.target.value)}
//                 className="bg-gray-800 border-gray-700"
//               />
//               <Button onClick={handleAddCategory}>Add Category</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Dialog open={openSubCategoryDialog} onOpenChange={setOpenSubCategoryDialog}>
//         <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
//           <DialogHeader>
//             <DialogTitle>Add New Subcategory</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <Input
//               placeholder="Subcategory name"
//               value={newSubCategoryName}
//               onChange={(e) => setNewSubCategoryName(e.target.value)}
//               className="bg-gray-800 border-gray-700"
//             />
//             <Button onClick={handleAddSubCategory}>Add Subcategory</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <nav className="flex-1 p-2">
//         <ul className="space-y-1">
//           {renderCategoryTree(categories)}
//         </ul>
//       </nav>
//     </div>
//   );
// }

// import { useState } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   FolderPlus,
//   Plus,
//   Bookmark,
//   FolderOpen,
//   Trash2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useCategoryStore } from "@/store/useCategoryStore";

// export function Sidebar({
//   categories,
//   selectedCategory,
//   onCategorySelect,
// }) {
//   const { createCategory, createSubCategory } = useCategoryStore();
  
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newSubCategoryName, setNewSubCategoryName] = useState("");
//   const [addingSubCategoryFor, setAddingSubCategoryFor] = useState(null);
//   const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
//   const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false);
//   const [expandedCategories, setExpandedCategories] = useState({});

//   const handleAddCategory = async () => {
//     if (newCategoryName.trim()) {
//       await createCategory({ name: newCategoryName });
//       setNewCategoryName("");
//       setOpenCategoryDialog(false);
//     }
//   };

//   const handleAddSubCategory = async () => {
//     if (newSubCategoryName.trim() && addingSubCategoryFor) {
//       await createCategory({ 
//         name: newSubCategoryName, 
//         parent: addingSubCategoryFor 
//       });
//       setNewSubCategoryName("");
//       setAddingSubCategoryFor(null);
//       setOpenSubCategoryDialog(false);
//     }
//   };

//   const startAddSubCategory = (categoryId, e) => {
//     e.stopPropagation();
//     setAddingSubCategoryFor(categoryId);
//     setOpenSubCategoryDialog(true);
//   };

//   const toggleCategory = (categoryId, e) => {
//     e.stopPropagation();
//     setExpandedCategories(prev => ({
//       ...prev,
//       [categoryId]: !prev[categoryId]
//     }));
//     onCategorySelect(categoryId);
//   };

//   // Recursive function to render category tree
//   const renderCategoryTree = (cats, level = 0) => {
//     return cats.map((category) => (
//       <li key={category._id} className="text-sm">
//         <div className="flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer">
//           <div
//             className={`flex items-center gap-2 flex-1 ${
//               selectedCategory === category._id ? "text-purple-400 font-medium" : "text-gray-300"
//             }`}
//             onClick={(e) => toggleCategory(category._id, e)}
//             style={{ paddingLeft: `${level * 12}px` }}
//           >
//             {category.children && category.children.length > 0 ? (
//               expandedCategories[category._id] ? (
//                 <ChevronDown size={16} />
//               ) : (
//                 <ChevronRight size={16} />
//               )
//             ) : (
//               <Bookmark size={16} />
//             )}
//             <span>{category.name}</span>
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-6 w-6"
//             onClick={(e) => startAddSubCategory(category._id, e)}
//           >
//             <Plus size={14} />
//           </Button>
//         </div>

//         {expandedCategories[category._id] && category.children && category.children.length > 0 && (
//           <ul className="mt-1">
//             {renderCategoryTree(category.children, level + 1)}
//           </ul>
//         )}
//       </li>
//     ));
//   };

//   return (
//     <div className="w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto flex flex-col">
//       <div className="p-4 border-b border-gray-800">
//         <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
//           <DialogTrigger asChild>
//             <Button variant="outline" className="w-full flex items-center justify-center gap-2">
//               <FolderPlus size={16} />
//               <span>Add Category</span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
//             <DialogHeader>
//               <DialogTitle>Add New Category</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <Input
//                 placeholder="Category name"
//                 value={newCategoryName}
//                 onChange={(e) => setNewCategoryName(e.target.value)}
//                 className="bg-gray-800 border-gray-700"
//               />
//               <Button onClick={handleAddCategory}>Add Category</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Dialog open={openSubCategoryDialog} onOpenChange={setOpenSubCategoryDialog}>
//         <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
//           <DialogHeader>
//             <DialogTitle>Add New Subcategory</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <Input
//               placeholder="Subcategory name"
//               value={newSubCategoryName}
//               onChange={(e) => setNewSubCategoryName(e.target.value)}
//               className="bg-gray-800 border-gray-700"
//             />
//             <Button onClick={handleAddSubCategory}>Add Subcategory</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <nav className="flex-1 p-2">
//         <ul className="space-y-1">
//           {renderCategoryTree(categories)}
//         </ul>
//       </nav>
//     </div>
//   );
// }

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FolderPlus,
  Plus,
  Folder,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCategoryStore } from "@/store/useCategoryStore";

export function Sidebar({
  categories,
  selectedCategory,
  onCategorySelect,
}) {
  const { createCategory, createSubCategory } = useCategoryStore();
  
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [addingSubCategoryFor, setAddingSubCategoryFor] = useState(null);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      await createCategory({ name: newCategoryName });
      setNewCategoryName("");
      setOpenCategoryDialog(false);
    }
  };

  const handleAddSubCategory = async () => {
    if (newSubCategoryName.trim() && addingSubCategoryFor) {
      await createCategory({ 
        name: newSubCategoryName, 
        parent: addingSubCategoryFor 
      });
      setNewSubCategoryName("");
      setAddingSubCategoryFor(null);
      setOpenSubCategoryDialog(false);
    }
  };

  const startAddSubCategory = (categoryId, e) => {
    e.stopPropagation();
    setAddingSubCategoryFor(categoryId);
    setOpenSubCategoryDialog(true);
  };

  const toggleCategory = (categoryId, e) => {
    e.stopPropagation();
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
    onCategorySelect(categoryId);
  };

  // Recursive function to render category tree
  const renderCategoryTree = (cats, level = 0) => {
    return cats.map((category) => {
      const hasChildren = category.children && category.children.length > 0;
      const isExpanded = expandedCategories[category._id];
      const isSelected = selectedCategory === category._id;
      
      return (
        <li key={category._id} className="text-sm">
          <div 
            className={`flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer ${
              isSelected ? "bg-gray-800" : ""
            }`}
          >
            <div
              className={`flex items-center gap-2 flex-1 ${
                isSelected ? "text-purple-400 font-medium" : "text-gray-300"
              }`}
              onClick={(e) => toggleCategory(category._id, e)}
              style={{ paddingLeft: `${level * 12}px` }}
            >
              {hasChildren ? (
                <div className="flex items-center gap-2">
                  {isExpanded ? 
                    <ChevronDown size={16} className="text-gray-400" /> : 
                    <ChevronRight size={16} className="text-gray-400" />
                  }
                  {isExpanded ? 
                    <FolderOpen size={16} className="text-yellow-500" /> : 
                    <Folder size={16} className="text-yellow-500" />
                  }
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-4"></div> {/* Spacer to align with categories that have dropdowns */}
                  <Folder size={16} className="text-yellow-500" />
                </div>
              )}
              <span>{category.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100"
              onClick={(e) => startAddSubCategory(category._id, e)}
            >
              <Plus size={14} />
            </Button>
          </div>

          {isExpanded && hasChildren && (
            <ul className="mt-1">
              {renderCategoryTree(category.children, level + 1)}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <FolderPlus size={16} />
              <span>Add Category</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
              <Button onClick={handleAddCategory}>Add Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={openSubCategoryDialog} onOpenChange={setOpenSubCategoryDialog}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Add New Subcategory</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Subcategory name"
              value={newSubCategoryName}
              onChange={(e) => setNewSubCategoryName(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
            <Button onClick={handleAddSubCategory}>Add Subcategory</Button>
          </div>
        </DialogContent>
      </Dialog>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {renderCategoryTree(categories)}
        </ul>
      </nav>
    </div>
  );
}