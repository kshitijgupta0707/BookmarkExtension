// anime({
//   targets: "#loginPage",
//   translateX: [100, 0], // Move from right
//   opacity: [0, 1], // Fade in
//   duration: 1000,
//   easing: "easeOutExpo"
// });
// document.getElementById("showSignup").addEventListener("click", () => {
//   anime({
//     targets: "#signupPage",
//     translateX: [100, 0],
//     opacity: [0, 1],
//     duration: 800,
//     easing: "easeOutExpo"
//   });
// });
// anime({
//   targets: "#bookmarksList li",
//   opacity: [0, 1],
//   translateY: [10, 0], // Small bounce up
//   delay: anime.stagger(200), // Delay each list item
//   easing: "easeOutQuad"
// });

// Function to handle signup

const signup = async () => {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;
  
    try {
      const res = await fetch("http://localhost:3002/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
  
      const data = await res.json();
      console.log(data);
  
      if (res.ok) {
        alert("Signup successful! Redirecting to home page...");
        chrome.storage.sync.set({ token: data.token });
        showHomePage();
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };
  
  // Function to handle login
  const login = async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    try {
      const res = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      console.log(data);
  
      if (data.token) {
        chrome.storage.sync.set({ token: data.token });
        alert("Login successful!");
        showHomePage();
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };
  
  // Function to handle logout
  const logout = async () => {
    try {
      await fetch("http://localhost:3002/api/auth/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      chrome.storage.sync.remove("token");
      alert("Logged out successfully");
      showLoginPage();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  // Function to fetch and display bookmarks
  const fetchBookmarks = async () => {
    const tokenData = await chrome.storage.sync.get("token");
    if (!tokenData.token) return;
  
    try {
      const res = await fetch("http://localhost:3002/api/bookmarks", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
      console.log(data);
  
      const bookmarksList = document.getElementById("bookmarksList");
      bookmarksList.innerHTML = "";
  
      data.forEach((bookmark) => {
        const item = document.createElement("li");
        item.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.title}</a>`;
        bookmarksList.appendChild(item);
      });
  
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };
  
  // Function to show login page
  const showLoginPage = () => {
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("homePage").style.display = "none";
  };
  
  // Function to show signup page
  const showSignupPage = () => {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("signupPage").style.display = "block";
    document.getElementById("homePage").style.display = "none";
  };
  
  // Function to show home page
  const showHomePage = () => {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";
    fetchBookmarks();
  };
  
  // Check for stored token and show appropriate page on load
  document.addEventListener("DOMContentLoaded", async () => {
    const tokenData = await chrome.storage.sync.get("token");
    if (tokenData.token) {
      showHomePage();
    } else {
      showLoginPage();
    }
  });
  
  // Event listeners
  document.getElementById("signupBtn").addEventListener("click", signup);
  document.getElementById("loginBtn").addEventListener("click", login);
  document.getElementById("logoutBtn").addEventListener("click", logout);
  document.getElementById("showSignup").addEventListener("click", showSignupPage);
  document.getElementById("showLogin").addEventListener("click", showLoginPage);
  