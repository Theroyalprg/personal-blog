const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
let mouseX = 0;
let mouseY = 0;

window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', e => {
    mouseX = e.clientX - w / 2;
    mouseY = e.clientY - h / 2;
});

// Load comic images
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

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * w - w/2;
        this.y = Math.random() * h - h/2;
        this.z = Math.random() * w;
        this.radius = 2 + Math.random() * 3;
        this.speed = 0.02 + Math.random() * 0.03;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.floatAmplitude = 5 + Math.random() * 10;
        this.icon = icons[Math.floor(Math.random() * icons.length)];
    }
    update() {
        this.z -= this.speed * w;
        this.angle += this.rotationSpeed;
        this.y += Math.sin(this.angle) * 0.5; // floating motion
        if (this.z < 1) this.reset();
    }
    draw() {
        const k = 500 / this.z;
        const px = (this.x + mouseX * 0.1) * k + w / 2;
        const py = (this.y + mouseY * 0.1) * k + h / 2;

        if (this.icon.complete) {
            const size = this.radius * k / 5;
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(this.angle);
            ctx.drawImage(this.icon, -size / 2, -size / 2, size, size);
            ctx.restore();
        } else {
            ctx.beginPath();
            ctx.arc(px, py, this.radius * k / 50, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(155,93,229,0.7)';
            ctx.fill();
            ctx.closePath();
        }
    }
}

const particles = [];
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

animate();
