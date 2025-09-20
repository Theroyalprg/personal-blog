const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Load hero/comic images
const icons = [
    'images/spiderman.png',
    'images/ironman.png',
    'images/captain.png',
    'images/thor.png',
    'images/hulk.png'
];

let particles = [];

for (let i = 0; i < 25; i++) {
    const img = new Image();
    img.src = icons[Math.floor(Math.random() * icons.length)];
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 500 + 100,
        size: Math.random() * 50 + 30,
        speed: Math.random() * 0.5 + 0.2,
        img
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.sort((a, b) => b.z - a.z); // depth effect

    particles.forEach(p => {
        const scale = 500 / (p.z);
        const x = p.x * scale + canvas.width / 2 - canvas.width/2 * scale;
        const y = p.y * scale + canvas.height / 2 - canvas.height/2 * scale;
        const size = p.size * scale;

        ctx.globalAlpha = Math.min(1, 1 - p.z / 600 + 0.2);
        ctx.drawImage(p.img, x, y, size, size);

        // Move forward in Z
        p.z -= p.speed;
        if (p.z < 50) {
            p.z = Math.random() * 500 + 400;
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
            p.size = Math.random() * 50 + 30;
            p.speed = Math.random() * 0.5 + 0.2;
            p.img.src = icons[Math.floor(Math.random() * icons.length)];
        }
    });

    requestAnimationFrame(draw);
}

draw();
