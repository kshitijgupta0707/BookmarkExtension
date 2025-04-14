import { useEffect, useState } from "react";

const BookmarkList = ({ user }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookmarks", {
      headers: { Authorization: `Bearer ${user.token}` },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
       console.log("data is " , data)
        setBookmarks(data);

      })
  }, []);

  useEffect(()=>{
    console.log("Book Marks " , bookmarks)
  },[bookmarks])

 
  return (
    <div>
      <h2 className="text-lg font-bold">Your Bookmarks</h2>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default BookmarkList;
