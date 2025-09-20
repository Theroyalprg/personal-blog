// Load all posts dynamically
async function loadPosts() {
  const res = await fetch("data/posts.json");
  const posts = await res.json();
  const container = document.getElementById("posts");
  if (!container) return;

  container.innerHTML = posts.map((post, index) => `
    <div class="post-card" style="--i:${index}">
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <a href="post.html?id=${index}">Read More →</a>
    </div>
  `).join("");

  // Add 3D hover effect for posts
  const cards = document.querySelectorAll('.post-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width/2;
      const centerY = rect.height/2;
      const rotateX = ((y - centerY)/centerY) * 8;
      const rotateY = ((x - centerX)/centerX) * 8;
      card.style.transform = `rotateX(${ -rotateX }deg) rotateY(${ rotateY }deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  });
}

// Load single post
async function loadSinglePost() {
  const res = await fetch("data/posts.json");
  const posts = await res.json();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const post = posts[id];
  const container = document.getElementById("post-content");
  if (!post || !container) return;

  document.title = `${post.title} | Prakarsh's Blog`;

  container.innerHTML = `
    <div class="post-full-view">
      <img src="${post.thumbnail}" alt="${post.title}" class="post-banner-image">
      <article class="post-body">
        <h1>${post.title}</h1>
        <div class="post-meta">
          <span>By ${post.author}</span> | <span>${post.date}</span>
        </div>
        <div class="post-content-full">${post.content}</div>
      </article>
      <a href="index.html" class="back-link">← Back to all posts</a>
    </div>
  `;
}

// About page interaction
function about3DEffect() {
  const img = document.querySelector('.about-img');
  const text = document.querySelector('.about-text');

  if (!img || !text) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    img.style.transform = `translateY(${scroll * 0.05}px) scale(1.05)`;
    text.style.transform = `translateY(${scroll * 0.03}px)`;
  });

  img.addEventListener('mousemove', e => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width/2;
    const centerY = rect.height/2;
    const rotateX = ((y - centerY)/centerY) * 10;
    const rotateY = ((x - centerX)/centerX) * 10;
    img.style.transform = `rotateX(${ -rotateX }deg) rotateY(${ rotateY }deg) scale(1.1)`;
  });

  img.addEventListener('mouseleave', () => {
    img.style.transform = `rotateX(0deg) rotateY(0deg) scale(1.05)`;
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('posts')) loadPosts();
  if (document.getElementById('post-content')) loadSinglePost();
  if (document.querySelector('.about-img')) about3DEffect();
});
