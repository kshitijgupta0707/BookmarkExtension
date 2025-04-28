// import { useEffect, useState } from "react";

// const SettingsMenu = () => {
//   const [newTab, setNewTab] = useState(false);

//   useEffect(() => {
//     chrome.storage.sync.get("newTab", (data) => setNewTab(data.newTab || false));
//   }, []);

//   const toggleNewTab = () => {
//     const updatedValue = !newTab;
//     setNewTab(updatedValue);
//     chrome.storage.sync.set({ newTab: updatedValue });
//   };

//   return (
//     <div>
//       <button onClick={toggleNewTab}>{newTab ? "Disable New Tab" : "Use as New Tab"}</button>
//     </div>
//   );
// };

// export default SettingsMenu;
import { useEffect, useState } from "react";
import { Sun, Moon, LogOut } from "lucide-react";
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


export const SettingsMenu = ({ theme, toggleTheme, user, setUser }) => {
  const [newTab, setNewTab] = useState(false);

  useEffect(() => {
    safeStorage.get("newTab", (data) => setNewTab(data.newTab || false));
  }, []);

  // const toggleNewTab = () => {
  //   const updatedValue = !newTab;
  //   setNewTab(updatedValue);
  //   safeStorage.set({ newTab: updatedValue });
  // };
  const toggleNewTab = async () => {
    const updatedValue = !newTab;
    setNewTab(updatedValue);
    safeStorage.set({ newTab: updatedValue });
  
    if (updatedValue) {
      // Only redirect if enabling new tab
      safeStorage.get("token", (data) => {
        const token = data.token;
        if (token) {
          window.open(`http://localhost:5173/extension?token=${token}`, "_blank");
        }
      });
    }
  };
  
  const handleLogout = () => {
    safeStorage.remove(["token", "userId", "name", "user"]);
    setUser(null);
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={toggleNewTab}
        className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        {newTab ? "Disable New Tab" : "Use as New Tab"}
      </button>
      
      <button 
        onClick={toggleTheme} 
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      
      {user && (
        <button 
          onClick={handleLogout}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors text-destructive"
          title="Log out"
        >
          <LogOut size={16} />
        </button>
      )}
    </div>
  );
};