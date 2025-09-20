async function loadPosts(){
  const res = await fetch("data/posts.json");
  const posts = await res.json();
  const postsContainer = document.getElementById("posts");
  if(!postsContainer) return;

  postsContainer.innerHTML = posts.map((post,index)=>`
    <div class="post-card reveal-card" style="--i:${index}">
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <a href="post.html?id=${index}">Read More</a>
    </div>
  `).join("");
}

async function loadSinglePost(){
  const res = await fetch("data/posts.json");
  const posts = await res.json();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const post = posts[id];
  const postContainer = document.getElementById("post-content");
  if(post && postContainer){
    document.title = `${post.title} | Prakarsh's Blog`;
    postContainer.innerHTML=`
      <div class="post-full-view">
        <img src="${post.thumbnail}" class="post-banner-image">
        <article class="post-body">
          <h1>${post.title}</h1>
          <div class="post-meta">
            By ${post.author} | ${post.date}
          </div>
          <div class="post-content-full">${post.content}</div>
        </article>
        <a href="index.html" class="back-link">← Back to all posts</a>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  if(document.getElementById("posts")) loadPosts();
  if(document.getElementById("post-content")) loadSinglePost();
});
