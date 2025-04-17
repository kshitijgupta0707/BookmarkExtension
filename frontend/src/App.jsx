import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import BookmarkList from "./components/BookmarkList/BookmarkList";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    chrome.storage.sync.get("user", (data) => setUser(data.user || null));
  }, []);

  return (
    
    <div>
      <h1 className="text-2xl font-bold">Bookmark Manager</h1>
      <SettingsMenu />
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div className="w-80 p-4">
          <BookmarkList user={user} />
        </div>
      )}
    
    </div>
  );
};

export default App;
