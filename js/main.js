async function loadPosts() {
  try {
    const res = await fetch("data/posts.json");
    if (!res.ok) throw new Error("Failed to fetch posts.json");
    const posts = await res.json();

    const postsContainer = document.getElementById("posts-grid");
    if (!postsContainer) return;

    postsContainer.innerHTML = posts.map((post, index) => `
      <div class="post-card">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="post.html?id=${index}">Read More</a>
      </div>
    `).join("");
  } catch (err) {
    console.error("Error loading posts:", err);
    const postsContainer = document.getElementById("posts-grid");
    if (postsContainer) postsContainer.innerHTML = "<p style='color:red;'>Failed to load posts.</p>";
  }
}

// Single post loader
async function loadSinglePost() {
  try {
    const res = await fetch("data/posts.json");
    if (!res.ok) throw new Error("Failed to fetch posts.json");
    const posts = await res.json();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id === null || id >= posts.length) throw new Error("Invalid post ID");

    const post = posts[id];
    const postBody = document.getElementById("post-body");
    if (!postBody) return;

    document.title = `${post.title} | Prakarsh Blog`;

    postBody.innerHTML = `
      <img src="${post.thumbnail || 'images/default.jpg'}" alt="${post.title}" class="post-banner-image">
      <h1>${post.title}</h1>
      <div class="post-meta">By ${post.author} | ${post.date}</div>
      <div class="post-content-full">${post.content}</div>
    `;
  } catch (err) {
    console.error("Error loading post:", err);
    const postBody = document.getElementById("post-body");
    if (postBody) postBody.innerHTML = "<p style='color:red;'>Failed to load this post.</p>";
  }
}

// Auto detect which page
if (document.getElementById("posts-grid")) {
  loadPosts();
} else if (document.getElementById("post-body")) {
  loadSinglePost();
}
