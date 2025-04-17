// chrome.bookmarks.onCreated.addListener(async (id, bookmark) => {
//   const token = await chrome.storage.sync.get("token"); // Retrieve JWT token
//   console.log(token)
//   console.log("i am here")
//   if (!token.token) return;

//   fetch("http://localhost:5000/api/bookmarks", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token.token,
//     },
//     body: JSON.stringify({
//       title: bookmark.title,
//       url: bookmark.url,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log("Bookmark saved:", data))
//     .catch((error) => console.error("Error saving bookmark:", error));

//   console.log("bhaiiii")
// });



chrome.bookmarks.onCreated.addListener(async (id, bookmark) => {``
  const { user } = await chrome.storage.sync.get("user");
  console.log("user", user)
  console.log("i am here")
  if (!user.token) return;


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

  console.log("bhaiiii")
});

