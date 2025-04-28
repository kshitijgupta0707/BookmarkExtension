import { useEffect, useState } from "react";
import { BookmarkCard } from "../BookmarkCard/BookmarkCard";
export const BookmarkList = ({ user }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // For demo purposes, use mock data if no backend is available
    if (!user?.token) {
      const mockBookmarks = [
        { id: 1, title: "Google", url: "https://www.google.com" },
        { id: 2, title: "GitHub", url: "https://github.com" },
        { id: 3, title: "Stack Overflow", url: "https://stackoverflow.com" },
        { id: 4, title: "MDN Web Docs", url: "https://developer.mozilla.org" }
      ];
      setBookmarks(mockBookmarks);
      setLoading(false);
      return;
    }

    fetch("http://localhost:4000/api/bookmarks", {
      headers: { Authorization: `Bearer ${user.token}` },
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookmarks");
        return res.json();
      })
      .then((data) => {
        setBookmarks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user?.token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center p-6 rounded-lg bg-secondary/50 mt-4">
        <BookmarkCard className="mx-auto mb-2 text-muted-foreground" size={24} />
        <p className="text-muted-foreground">No bookmarks found. Add some to get started!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Bookmarks</h2>
        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
          {bookmarks.length} {bookmarks.length === 1 ? "bookmark" : "bookmarks"}
        </span>
      </div>
      <div className="grid gap-3">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
};

