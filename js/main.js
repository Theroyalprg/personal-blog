async function loadPosts() {
  const res = await fetch("data/posts.json")
  const posts = await res.json()
  const postsContainer = document.getElementById("posts")
  if (!postsContainer) return

  postsContainer.innerHTML = posts
    .map((post, index) => `
      <div class="post-card reveal-card" style="--i:${index % 5}; animation-delay:${index*100}ms">
        <img src="${post.thumbnail}" alt="${post.title}" class="post-thumbnail">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="post.html?id=${index}">Read More →</a>
      </div>
    `)
    .join("")

  addComicEffect()
}

async function loadSinglePost() {
  const res = await fetch("data/posts.json")
  const posts = await res.json()
  const params = new URLSearchParams(window.location.search)
  const id = params.get("id")
  const post = posts[id]

  const postContainer = document.getElementById("post-content")
  if (post && postContainer) {
    document.title = `${post.title} | Prakarsh's Comics`
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
    `
  }
}

function addComicEffect() {
  const cards = document.querySelectorAll('.post-card')
  cards.forEach(card => {
    card.addEventListener('mouseenter', e => {
      const burst = document.createElement('div')
      burst.className = 'comic-burst'
      burst.innerText = Math.random() > 0.5 ? 'POW!' : 'BAM!'
      burst.style.top = `${e.offsetY}px`
      burst.style.left = `${e.offsetX}px`
      card.appendChild(burst)
      setTimeout(() => burst.remove(), 500)
    })
  })
}

if (document.getElementById("posts")) loadPosts()
if (document.getElementById("post-content")) loadSinglePost()
