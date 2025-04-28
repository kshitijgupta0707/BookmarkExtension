import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { BookmarkGrid } from "@/components/BookmarkGrid";
import CategoryView from "@/components/CategoryView";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { jwtDecode } from "jwt-decode";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useAuthStore } from "../store/useAuthStore";

export default function ExtensionDashboard() {
    // Auth states
    const [authStatus, setAuthStatus] = useState("checking"); // "checking", "authenticated", "unauthenticated", "invalid"

    // Get state and actions from Zustand stores
    const { loginWithoutPassword, isAuthenticated } = useAuthStore();
    const { bookmarks, fetchBookmarks, fetchBookmarksByCategory } = useBookmarkStore();
    const { categories, fetchCategoryTree } = useCategoryStore();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [flattenedCategories, setFlattenedCategories] = useState([]);

    // Single authentication check and data loading effect
    useEffect(() => {
        const initializeApp = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            // Check authentication first
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    if (decoded.email) {
                        // Only login once
                        await loginWithoutPassword({ email: decoded.email });
                        console.log("Login successful");
                        setAuthStatus("authenticated");

                        // After authentication succeeds, fetch data
                        await Promise.all([
                            fetchBookmarks(),
                            fetchCategoryTree()
                        ]);
                    } else {
                        setAuthStatus("invalid");
                    }
                } catch (error) {
                    console.error("Invalid Token", error);
                    setAuthStatus("invalid");
                }
            } else {
                setAuthStatus("unauthenticated");
            }
        };

        initializeApp();
        // Include all dependencies that this effect uses
    }, [loginWithoutPassword, fetchBookmarks, fetchCategoryTree]);

    // Flatten category tree for easier navigation
    useEffect(() => {
        if (categories.length === 0) return;

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

    // Handle redirect to login page
    const handleLoginRedirect = () => {
        window.location.href = "/login"; // Change this to your login page URL
    };

    // Authentication state handling
    if (authStatus === "checking") {
        return (
            <div className="flex h-screen items-center justify-center bg-black">
                <div className="text-center p-8 rounded-lg">
                    <h1 className="text-2xl font-bold mb-4 text-white">Loading...</h1>
                    <p className="text-gray-300">Please wait while we verify your credentials.</p>
                </div>
            </div>
        );
    }

    if (authStatus === "unauthenticated" || authStatus === "invalid") {
        return (
            <div className="flex h-screen items-center justify-center bg-black">
                <div className="text-center p-8 rounded-lg border border-gray-700">
                    <h1 className="text-2xl font-bold mb-4 text-white">
                        {authStatus === "unauthenticated" ? "Please Log In" : "Invalid Authentication"}
                    </h1>
                    <p className="text-gray-300 mb-6">
                        {authStatus === "unauthenticated"
                            ? "You need to log in to access your bookmarks."
                            : "Your authentication token is invalid or expired. Please log in again."}
                    </p>
                    <button
                        onClick={handleLoginRedirect}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    // Render main content when authenticated
    return (
        <div className="flex h-screen flex-col overflow-hidden">
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