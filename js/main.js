// Load homepage posts
async function loadPosts() {
  const res = await fetch("posts.json");
  const posts = await res.json();
  const postsContainer = document.getElementById("posts");
  if (!postsContainer) return;

  postsContainer.innerHTML = posts.map(post => `
    <div class="post-card">
      <img src="images/${post.image}" alt="${post.title}" class="post-thumbnail">
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <a href="post.html?id=${post.id}">Read More</a>
    </div>
  `).join('');
}

// Load single post
async function loadSinglePost() {
  const postContainer = document.getElementById("post-content");
  if (!postContainer) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  if (!id) return;

  const res = await fetch("posts.json");
  const posts = await res.json();
  const post = posts.find(p => p.id === id);
  if (!post) return;

  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-meta").textContent = `${post.date} • by ${post.author}`;
  document.getElementById("post-content").innerHTML = post.content;
  document.getElementById("post-image").src = `images/${post.image}`;
}

// Auto-detect page
if (document.getElementById("posts")) {
  loadPosts();
}
if (document.getElementById("post-content")) {
  loadSinglePost();
}
