import { useEffect, useState } from "react";

const BookmarkList = ({ user }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookmarks", {
      headers: { Authorization: `Bearer ${user.token}` },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setBookmarks(data));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Your Bookmarks</h2>
      {Object.entries(bookmarks).map(([category, items]) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {items.map((bookmark) => (
              <li key={bookmark.id}>
                <a href={bookmark.url} target="_blank">{bookmark.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
