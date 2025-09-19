// Fetch posts from JSON and display them
async function loadPosts() {
  const res = await fetch("data/posts.json");
  const posts = await res.json();

  const postsContainer = document.getElementById("posts");
  if (!postsContainer) return;

  postsContainer.innerHTML = posts
    .map(
      (post, index) => `
      <div class="post-card">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="post.html?id=${index}">Read More →</a>
      </div>
    `
    )
    .join("");
}

// Load a single post
async function loadSinglePost() {
  const res = await fetch("data/posts.json");
  const posts = await res.json();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const post = posts[id];

  if (post && document.getElementById("post-content")) {
    document.getElementById("post-content").innerHTML = `
      <article>
        <h2>${post.title}</h2>
        <p>${post.content}</p>
      </article>
    `;
  }
}

loadPosts();
loadSinglePost();
