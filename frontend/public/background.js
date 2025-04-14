// // chrome.runtime.onInstalled.addListener(() => {
// //   chrome.contextMenus.create({
// //     id: "saveBookmark",
// //     title: "Save to AI Bookmark",
// //     contexts: ["page"]
// //   });
// // });

// // chrome.contextMenus.onClicked.addListener(async (info, tab) => {
// //   const { user } = await chrome.storage.sync.get("user");
// //   if (!user) {
// //     alert("Please log in to save bookmarks.");
// //     return;
// //   }

// //   await fetch("https://localhost:5000/api/bookmarks", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${user.token}`,
// //     },
// //     body: JSON.stringify({ title: tab.title, url: tab.url }),
// //   });

// //   alert("Bookmark saved!");
// // });


// // Register context menu on install
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.removeAll(() => {
//     chrome.contextMenus.create({
//       id: "saveBookmark",
//       title: "Save to AI Bookmark",
//       contexts: ["page"]
//     });
//     console.log("Context menu created on install");
//   });
// });

// // Also register it on browser startup
// chrome.runtime.onStartup.addListener(() => {
//   chrome.contextMenus.removeAll(() => {
//     chrome.contextMenus.create({
//       id: "saveBookmark",
//       title: "Save to AI Bookmark",
//       contexts: ["page"]
//     });
//     console.log("Context menu created on startup");
//   });
// });

// // Handle context menu click
// chrome.contextMenus.onClicked.addListener(async (info, tab) => {
//   if (info.menuItemId === "saveBookmark") {
//     try {
//       const { user } = await chrome.storage.sync.get("user");
//       if (!user || !user.token) {
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           func: () => alert("Please log in to save bookmarks."),
//         });
//         return;
//       }

//       await fetch("https://localhost:5000/api/bookmarks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({ title: tab.title, url: tab.url }),
//       });

//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: () => alert("Bookmark saved!"),
//       });
//     } catch (err) {
//       console.error("Error saving bookmark:", err);
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: () => alert("Failed to save bookmark."),
//       });
//     }
//   }
// });

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  console.log("User bookmarked:", bookmark.url);
  // Optionally send this to your backend or sync it
});

