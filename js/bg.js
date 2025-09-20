const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// Particle class
class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.z = Math.random() * 3 + 1;
    this.size = this.z * 2;
    this.speed = this.z * 0.3;
  }
  update() {
    this.y -= this.speed;
    if (this.y < 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(155,93,229,0.7)`;
    ctx.fill();
  }
}

// Create particles
const particles = [];
for (let i = 0; i < 150; i++) {
  particles.push(new Particle());
}

// Animate particles
function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
