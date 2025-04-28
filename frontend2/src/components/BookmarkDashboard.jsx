import { useState, useEffect } from "react"
import { Sidebar } from "@/components/Sidebar"
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
        setSelectedCategory(null);
      setBreadcrumbs([]);
      fetchBookmarks();
    } else if (index < breadcrumbs.length) {

      const targetCategory = breadcrumbs[index - 1];
      setSelectedCategory(targetCategory.id);
      setBreadcrumbs(breadcrumbs.slice(0, index));
      fetchBookmarksByCategory(targetCategory.id);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
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
              onBreadcrumbClick={handleBreadcrumbClick}
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
