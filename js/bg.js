const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});

// Load comic images (replace URLs with actual images you want)
const icons = [];
const iconSources = [
    'images/marvel1.png',
    'images/marvel2.png',
    'images/spiderman.png',
    'images/ironman.png'
];

iconSources.forEach(src => {
    const img = new Image();
    img.src = src;
    icons.push(img);
});

// Particle class
class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.z = Math.random() * w;
        this.radius = 2 + Math.random() * 3;
        this.speed = 0.02 + Math.random() * 0.03;
        this.icon = icons[Math.floor(Math.random() * icons.length)];
    }
    update() {
        this.z -= this.speed * w;
        if (this.z < 1) this.reset();
    }
    draw() {
        const k = 500 / this.z;
        const px = (this.x - w/2) * k + w/2;
        const py = (this.y - h/2) * k + h/2;

        if (this.icon.complete) {
            const size = this.radius * k / 5;
            ctx.drawImage(this.icon, px - size/2, py - size/2, size, size);
        } else {
            ctx.beginPath();
            ctx.arc(px, py, this.radius * k / 50, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(155,93,229,0.7)';
            ctx.fill();
            ctx.closePath();
        }
    }
}

// Initialize particles
const particles = [];
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

animate();
