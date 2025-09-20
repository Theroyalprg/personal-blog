async function loadPosts() {
  const res = await fetch("posts.json");
  const posts = await res.json();
  const container = document.getElementById("posts");
  if (!container) return;
  container.innerHTML = posts
    .map((post, i) => `
      <div class="post-card" style="--i:${i}">
        <img src="${post.thumbnail}" alt="${post.title}" class="post-thumbnail">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="post.html?id=${i}">Read More</a>
      </div>
    `).join("");
}

async function loadSinglePost() {
  const res = await fetch("posts.json");
  const posts = await res.json();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (id === null) return;
  const post = posts[id];
  const container = document.getElementById("post-content");
  if (!container || !post) return;

  document.title = `${post.title} | Prakarsh's Blog`;

  container.innerHTML = `
    <div class="post-full-view">
      <img src="${post.thumbnail}" alt="${post.title}" class="post-banner-image">
      <article class="post-body">
        <h1>${post.title}</h1>
        <div class="post-meta">By ${post.author} | ${post.date}</div>
        <div class="post-content-full">${post.content}</div>
      </article>
      <a href="index.html" class="back-link">← Back to all posts</a>
    </div>
  `;
}

if (document.getElementById("posts")) loadPosts();
if (document.getElementById("post-content")) loadSinglePost();
