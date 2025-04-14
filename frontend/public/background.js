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



chrome.bookmarks.onCreated.addListener(async (id, bookmark) => {
  const { user } = await chrome.storage.sync.get("user");
  console.log("user", user)
  console.log("i am here")
  if (!user.token) return;

  fetch("http://localhost:5000/api/bookmarks", {
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

