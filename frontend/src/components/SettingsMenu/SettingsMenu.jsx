import { useEffect, useState } from "react";

const SettingsMenu = () => {
  const [newTab, setNewTab] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get("newTab", (data) => setNewTab(data.newTab || false));
  }, []);

  const toggleNewTab = () => {
    const updatedValue = !newTab;
    setNewTab(updatedValue);
    chrome.storage.sync.set({ newTab: updatedValue });
  };

  return (
    <div>
      <button onClick={toggleNewTab}>{newTab ? "Disable New Tab" : "Use as New Tab"}</button>
    </div>
  );
};

export default SettingsMenu;
