

// import { useState , useEffect} from "react"
// import { Sidebar } from "@/components/sidebar"
// import { BookmarkGrid } from "@/components/BookmarkGrid"
// import  CategoryView  from "@/components/CategoryView"
// import  Breadcrumbs  from "@/components/Breadcrumbs"
// import {Header}  from "@/components/Header"
// import { useBookmarkStore } from "@/store/useBookmarkStore"
// import { useCategoryStore } from "@/store/useCategoryStore"

// // Helper function to flatten the nested category tree for UI
// const flattenCategories = (categories, parent = null, level = 0) => {
//   let result = [];
  
//   categories.forEach(category => {
//     result.push({
//       ...category,
//       level,
//       parent
//     });
    
//     if (category.children && category.children.length > 0) {
//       result = [...result, ...flattenCategories(category.children, category._id, level + 1)];
//     }
//   });
  
//   return result;
// };

// export default function BookmarkDashboard() {

//   const { bookmarks, fetchBookmarks, fetchBookmarksByCategory , createBookmark, deleteBookmark, moveBookmark  } = useBookmarkStore()
//   const [categories, setCategories] = useState([
//     {
//       id: "1",
//       name: "Development",
//       bookmarks: [
//         {
//           id: "1",
//           name: "GitHub",
//           url: "https://github.com",
//           favicon: "https://github.com/favicon.ico",
//         },
//         {
//           id: "2",
//           name: "Stack Overflow",
//           url: "https://stackoverflow.com",
//           favicon: "https://stackoverflow.com/favicon.ico",
//         },
//       ],
//       subCategories: [
//         {
//           id: "1",
//           name: "JavaScript",
//           bookmarks: [
//             {
//               id: "3",
//               name: "MDN Web Docs",
//               url: "https://developer.mozilla.org",
//               favicon: "https://developer.mozilla.org/favicon.ico",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: "2",
//       name: "Social Media",
//       bookmarks: [
//         {
//           id: "4",
//           name: "Twitter",
//           url: "https://twitter.com",
//           favicon: "https://twitter.com/favicon.ico",
//         },
//         {
//           id: "5",
//           name: "LinkedIn",
//           url: "https://linkedin.com",
//           favicon: "https://linkedin.com/favicon.ico",
//         },
//       ],
//       subCategories: [],
//     },
//     {
//       id: "3",
//       name: "Entertainment",
//       bookmarks: [
//         {
//           id: "6",
//           name: "YouTube",
//           url: "https://youtube.com",
//           favicon: "https://youtube.com/favicon.ico",
//         },
//         {
//           id: "7",
//           name: "Netflix",
//           url: "https://netflix.com",
//           favicon: "https://netflix.com/favicon.ico",
//         },
//       ],
//       subCategories: [],
//     },
//   ])

//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null)
//   const [breadcrumbs, setBreadcrumbs] = useState([])

//   const handleCategorySelect = (categoryId) => {
//     const category = categories.find((cat) => cat.id === categoryId)
//     if (category) {
//       setSelectedCategory(categoryId)
//       setSelectedSubCategory(null)
//       setBreadcrumbs([{ id: categoryId, name: category.name, type: "category" }])
//     }
//   }

//   const handleSubCategorySelect = (categoryId, subCategoryId) => {
//     const category = categories.find((cat) => cat.id === categoryId)
//     const subCategory = category?.subCategories.find((subCat) => subCat.id === subCategoryId)

//     if (category && subCategory) {
//       setSelectedCategory(categoryId)
//       setSelectedSubCategory(subCategoryId)
//       setBreadcrumbs([
//         { id: categoryId, name: category.name, type: "category" },
//         { id: subCategoryId, name: subCategory.name, type: "subcategory" },
//       ])
//     }
//   }

//   const handleAddCategory = (name) => {
//     const newCategory = {
//       id: Date.now().toString(),
//       name,
//       bookmarks: [],
//       subCategories: [],
//     }
//     setCategories([...categories, newCategory])
//   }

//   const handleAddSubCategory = (categoryId, name) => {
//     const updatedCategories = categories.map((category) => {
//       if (category.id === categoryId) {
//         return {
//           ...category,
//           subCategories: [
//             ...category.subCategories,
//             {
//               id: Date.now().toString(),
//               name,
//               bookmarks: [],
//             },
//           ],
//         }
//       }
//       return category
//     })
//     setCategories(updatedCategories)
//   }

//   const handleAddBookmark = (categoryId, subCategoryId, bookmark) => {
//     const newBookmark = {
//       ...bookmark,
//       id: Date.now().toString(),
//       favicon: `https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=128`,
//     }

//     const updatedCategories = categories.map((category) => {
//       if (category.id === categoryId) {
//         if (subCategoryId) {
//           return {
//             ...category,
//             subCategories: category.subCategories.map((subCategory) => {
//               if (subCategory.id === subCategoryId) {
//                 return {
//                   ...subCategory,
//                   bookmarks: [...subCategory.bookmarks, newBookmark],
//                 }
//               }
//               return subCategory
//             }),
//           }
//         } else {
//           return {
//             ...category,
//             bookmarks: [...category.bookmarks, newBookmark],
//           }
//         }
//       }
//       return category
//     })

//     setCategories(updatedCategories)
//   }

//   const handleBreadcrumbClick = (index) => {
//     if (index === 0) {
//       setSelectedCategory(null)
//       setSelectedSubCategory(null)
//       setBreadcrumbs([])
//     } else if (index === 1 && breadcrumbs.length > 1) {
//       setSelectedCategory(breadcrumbs[0].id)
//       setSelectedSubCategory(null)
//       setBreadcrumbs([breadcrumbs[0]])
//     }
//   }

//   const resetSelection = () => {
//     setSelectedCategory(null)
//     setSelectedSubCategory(null)
//     setBreadcrumbs([])
//   }

//   return (
//     <div className="flex h-screen flex-col overflow-hidden">
//       {/* <Header /> */}
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar
//           categories={categories}
//           onCategorySelect={handleCategorySelect}
//           onSubCategorySelect={handleSubCategorySelect}
//           onAddCategory={handleAddCategory}
//           onAddSubCategory={handleAddSubCategory}
//           selectedCategory={selectedCategory}
//           selectedSubCategory={selectedSubCategory}
//         />
//         <main className="flex-1 overflow-auto p-6 bg-black">
//           <Breadcrumbs
//             items={[{ id: "home", name: "Home", type: "home" }, ...breadcrumbs]}
//             onBreadcrumbClick={handleBreadcrumbClick}
//           />
//           {selectedCategory ? (
//             <CategoryView
//               category={categories.find((cat) => cat.id === selectedCategory)}
//               subCategoryId={selectedSubCategory}
//               onAddBookmark={handleAddBookmark}
//             />
//           ) : (
//             <BookmarkGrid
//               categories={categories}
//               onCategorySelect={handleCategorySelect}
//               onAddBookmark={(bookmark) => handleAddBookmark("1", null, bookmark)}
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   )
// }


import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { BookmarkGrid } from "@/components/BookmarkGrid"
import CategoryView from "@/components/CategoryView"
import Breadcrumbs from "@/components/Breadcrumbs"
import { Header } from "@/components/Header"
import { useBookmarkStore } from "@/store/useBookmarkStore"
import { useCategoryStore } from "@/store/useCategoryStore"

export default function BookmarkDashboard() {
  // Get state and actions from Zustand stores
  const { bookmarks, fetchBookmarks, fetchBookmarksByCategory } = useBookmarkStore();
  const { categories, fetchCategoryTree } = useCategoryStore();
  
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [flattenedCategories, setFlattenedCategories] = useState([])

  // Fetch data on component mount
  useEffect(() => {
    fetchBookmarks();
    fetchCategoryTree();
  }, [fetchBookmarks, fetchCategoryTree]);

  // Flatten category tree for easier navigation
  useEffect(() => {
    const flatten = (cats, parentPath = []) => {
      return cats.reduce((acc, cat) => {
        const currentPath = [...parentPath, { id: cat._id, name: cat.name }];
        acc.push({
          id: cat._id,
          name: cat.name,
          path: currentPath,
          hasChildren: cat.children && cat.children.length > 0
        });
        
        if (cat.children && cat.children.length > 0) {
          acc = acc.concat(flatten(cat.children, currentPath));
        }
        
        return acc;
      }, []);
    };
    
    setFlattenedCategories(flatten(categories));
  }, [categories]);

  const handleCategorySelect = (categoryId) => {
    const category = flattenedCategories.find((cat) => cat.id === categoryId);
    
    if (category) {
      setSelectedCategory(categoryId);
      setSelectedSubCategory(null);
      setBreadcrumbs(category.path.map(item => ({ 
        id: item.id, 
        name: item.name, 
        type: "category" 
      })));
      
      // Fetch bookmarks for the selected category
      fetchBookmarksByCategory(categoryId);
    }
  };

  const getCategoryWithChildren = (categoryId) => {
    const findCategory = (cats, id) => {
      for (const cat of cats) {
        if (cat._id === id) return cat;
        if (cat.children && cat.children.length > 0) {
          const found = findCategory(cat.children, id);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findCategory(categories, categoryId);
  };

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      // Click on Home
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setBreadcrumbs([]);
      fetchBookmarks();
    } else if (index < breadcrumbs.length) {
      // Click on a category in the breadcrumb trail
      const targetCategory = breadcrumbs[index - 1];
      setSelectedCategory(targetCategory.id);
      setSelectedSubCategory(null);
      setBreadcrumbs(breadcrumbs.slice(0, index));
      fetchBookmarksByCategory(targetCategory.id);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* <Header /> */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          categories={categories}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <main className="flex-1 overflow-auto p-6 bg-black">
          <Breadcrumbs
            items={[{ id: "home", name: "Home", type: "home" }, ...breadcrumbs]}
            onBreadcrumbClick={handleBreadcrumbClick}
          />
          {selectedCategory ? (
            <CategoryView
              category={getCategoryWithChildren(selectedCategory)}
              bookmarks={bookmarks}
            />
          ) : (
            <BookmarkGrid
              bookmarks={bookmarks}
              categories={categories}
              onCategorySelect={handleCategorySelect}
            />
          )}
        </main>
      </div>
    </div>
  );
}
