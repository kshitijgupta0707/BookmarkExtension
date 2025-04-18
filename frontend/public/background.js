
// This line registers a listener that fires whenever a new bookmark is created in Chrome
chrome.bookmarks.onCreated.addListener(async (id, bookmark) => {

  //For the authentication part, we are using the chrome.storage API to store and retrieve the user's authentication token.
  const { user } = await chrome.storage.sync.get("user");
  if (!user.token) return;
  
  console.log("Bookmark created:", bookmark , id);

  //is mein category bhi bhejni hain jo abhi ke liye mein 68011b6a758a18514de7b7df set krra backend mein
  // ml categroy jayegi yha se 
  ///fir muuje if ml category ke name ki category exist hogi toh usmein backend mein add hogi nhi toh backend mein he create hogi

  fetch("http://localhost:5000/api/bookmarks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(
      {
        title: bookmark.title,
        url: bookmark.url,
      },
    ),
  })
    .then((response) => response.json())
    .then((data) => console.log("Bookmark saved:", data))
    .catch((error) => console.error("Error saving bookmark:", error));

});

