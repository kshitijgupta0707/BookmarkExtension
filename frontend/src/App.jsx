// import { useEffect, useState } from "react";
// import Login from "./components/Login/Login";
// import BookmarkList from "./components/BookmarkList/BookmarkList";
// import SettingsMenu from "./components/SettingsMenu/SettingsMenu";

// const App = () => {
//   const [user, setUser] = useState(null);

//   // Chrome Extension Storage API
//   // It's part of the Chrome Extensions API, used to store data in the cloud (i.e., synchronized across the user's devices).
//   // chrome.storage.sync: Data saved here is synced via the user's Google account.
//   // chrome.storage.local: Stores data only locally, not synced.
//   useEffect(() => {
//     chrome.storage.sync.get("user", (data) => setUser(data.user || null));
//   }, []);

//   return (
    
//     <div>
//       <h1 className="text-2xl font-bold">Bookmark Manager</h1>
//       <SettingsMenu />
//       {!user ? (
//         <Login setUser={setUser} />
//       ) : (
//         <div className="w-80 p-4">
//           <BookmarkList user={user} />
//         </div>
//       )}
    
//     </div>
//   );
// };

// export default App;
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import {Login} from "./components/Login/Login";
import {BookmarkList} from "./components/BookmarkList/BookmarkList";
import {SettingsMenu} from "./components/SettingsMenu/SettingsMenu";
import { Alert, AlertDescription } from "@/components/ui/alert";  

const safeStorage = {
  get: (key, callback) => {
    // Check if Chrome extension API is available
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(key, callback);
    } else {
      // Fallback to localStorage for browser environment
      try {
        const value = localStorage.getItem(key);
        callback({ [key]: value ? JSON.parse(value) : null });
      } catch (e) {
        callback({ [key]: null });
      }
    }
  },
  set: (data) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set(data);
    } else {
      // Fallback to localStorage
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
    }
  },
  remove: (keys) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.remove(keys);
    } else {
      // Fallback to localStorage
      keys.forEach(key => localStorage.removeItem(key));
    }
  }
};

const App = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);

  // Initialize dark mode based on system preference for preview
  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Get user data
    safeStorage.get("user", (data) => {
      setUser(data.user || null);
      setLoading(false);
    });
    
    // Get theme preference
    safeStorage.get("theme", (data) => {
      const savedTheme = data.theme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    });
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    safeStorage.set({ theme: newTheme });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-md mx-auto p-4">
        <header className="mb-6">
          <div className="flex justify-between items-center gap-10">
            <div className="flex items-center gap-2">
              <Bookmark className="text-primary" size={24} />
              <h1 className="text-2xl font-bold">Bookmark </h1>
            </div>
            <SettingsMenu 
              theme={theme} 
              toggleTheme={toggleTheme} 
              user={user} 
              setUser={setUser}
            />
          </div>
          <div className="mt-2 text-sm text-muted-foreground text-center">
            {user ? `Signed in as ${user.name}` : 'Sign in to manage your bookmarks'}
          </div>
        </header>
        
        <main>
          {!user ? (
            <Login setUser={setUser} />
          ) : (
            <BookmarkList user={user} />
          )}
        </main>
        
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>© 2025 Bookmark Hub Extension</p>
        </footer>
      </div>
    </div>
  );
};
export default App;