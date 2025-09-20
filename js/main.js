async function loadPosts() {
  const res = await fetch("data/posts.json");
  const posts = await res.json();

  const postsContainer = document.getElementById("posts");
  if (!postsContainer) return;

  postsContainer.innerHTML = posts
    .map(
      (post, index) => `
      <div class="post-card reveal-card" style="animation-delay: ${index * 100}ms">
        <img src="${post.thumbnail}" alt="${post.title}" class="post-thumbnail">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="post.html?id=${index}">Read More →</a>
      </div>
    `
    )
    .join("");
}
