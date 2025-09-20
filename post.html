// Replace your old loadSinglePost function with this one
async function loadSinglePost() {
  const res = await fetch("data/posts.json");
  const posts = await res.json();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const post = posts[id];
  
  const postContainer = document.getElementById("post-content");

  if (post && postContainer) {
    // Dynamically update the page title to the post's title
    document.title = `${post.title} | Prakarsh's Blog`;

    postContainer.innerHTML = `
      <div class="post-full-view">
        <img src="${post.thumbnail}" alt="${post.title}" class="post-banner-image">
        <article class="post-body">
          <h1>${post.title}</h1>
          <div class="post-meta">
            <span>By ${post.author}</span> | <span>Published on ${post.date}</span>
          </div>
          <div class="post-content-full">
            ${post.content}
          </div>
        </article>
        <a href="index.html" class="back-link">← Back to all posts</a>
      </div>
    `;
  }
}
