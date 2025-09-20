async function fetchPosts() {
  try {
    const res = await fetch("data/posts.json");
    if (!res.ok) throw new Error("Cannot fetch posts.json");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function loadPosts() {
  const posts = await fetchPosts();
  const container = document.getElementById("posts-grid");
  if (!container) return;

  container.innerHTML = posts.map((p,i)=>`
    <div class="post-card">
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      <a href="post.html?id=${i}">Read More →</a>
    </div>
  `).join("");
}

async function loadSinglePost() {
  const posts = await fetchPosts();
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  if (isNaN(id) || !posts[id]) return;

  const post = posts[id];
  const container = document.getElementById("post-body");
  if (!container) return;

  document.title = `${post.title} | Prakarsh Blog`;

  container.innerHTML = `
    <img src="${post.thumbnail || 'images/default.jpg'}" alt="${post.title}" class="post-banner-image">
    <h1>${post.title}</h1>
    <div class="post-meta">By ${post.author} | ${post.date}</div>
    <div class="post-content-full">${post.content}</div>
  `;
}

// Auto-detect page
if (document.getElementById("posts-grid")) loadPosts();
if (document.getElementById("post-body")) loadSinglePost();
