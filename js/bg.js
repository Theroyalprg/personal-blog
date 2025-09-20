const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.z = Math.random() * width;
    this.size = Math.random() * 1.5 + 0.5;
    this.speed = Math.random() * 0.5 + 0.2;
  }
  move() {
    this.z -= this.speed;
    if (this.z <= 0) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.z = width;
    }
  }
  draw() {
    const sx = (this.x - width / 2) * (width / this.z) + width / 2;
    const sy = (this.y - height / 2) * (width / this.z) + height / 2;
    const r = (width - this.z) / width * this.size * 4;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(155,93,229,${1 - this.z / width})`;
    ctx.fill();
  }
}

for (let i = 0; i < 150; i++) particles.push(new Particle());

function animate() {
  ctx.fillStyle = "#0f0c29";
  ctx.fillRect(0, 0, width, height);
  particles.forEach(p => {
    p.move();
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();
