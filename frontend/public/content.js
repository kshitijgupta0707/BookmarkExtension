// Create button
const button = document.createElement("button");
button.innerText = "Save Bookmark";
button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.background = "#4CAF50";
button.style.color = "white";
button.style.padding = "10px";
button.style.border = "none";
button.style.cursor = "pointer";
button.style.borderRadius = "5px";
button.style.zIndex = "9999";

// Click event to save bookmark
button.addEventListener("click", async () => {
  console.log("Button clicked!");

  const { user } = await chrome.storage.sync.get("user");
  if (!user) {
    alert("Please log in to save bookmarks.");
    return;
  }
   alert("Saving bookmark...");
  const title = document.title;
  const url = window.location.href;
 console.log("Title: ", title);
  console.log("URL: ", url);
  await fetch("https://localhost:5000/api/bookmarks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ title, url }),
  });


 



  alert("Bookmark saved!");
});

// Add to page
document.body.appendChild(button);
