const canvas = document.getElementById('bg-canvas')
const ctx = canvas.getContext('2d')
let w = canvas.width = window.innerWidth
let h = canvas.height = window.innerHeight

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth
  h = canvas.height = window.innerHeight
})

const particles = []
const count = 120
for (let i = 0; i < count; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * w,
    speed: Math.random() * 0.3 + 0.2
  })
}

let mouse = { x: w / 2, y: h / 2 }
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

function connect(p) {
  for (let i = 0; i < p.length; i++) {
    for (let j = i + 1; j < p.length; j++) {
      const dx = p[i].x - p[j].x
      const dy = p[i].y - p[j].y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 150) {
        ctx.strokeStyle = `rgba(247,37,133,${1 - d / 150})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p[i].screenX, p[i].screenY)
        ctx.lineTo(p[j].screenX, p[j].screenY)
        ctx.stroke()
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, w, h)
  for (let p of particles) {
    p.z -= p.speed
    if (p.z <= 1) p.z = w

    const px = (p.x - w / 2) * (500 / p.z) + w / 2 + (mouse.x - w / 2) / 50
    const py = (p.y - h / 2) * (500 / p.z) + h / 2 + (mouse.y - h / 2) / 50
    const size = (500 / p.z) * 2

    ctx.fillStyle = `rgba(${155 + Math.random()*50},${93 + Math.random()*50},${229},0.8)`
    ctx.beginPath()
    ctx.arc(px, py, size, 0, Math.PI * 2)
    ctx.fill()

    p.screenX = px
    p.screenY = py
  }
  connect(particles)
  requestAnimationFrame(draw)
}

draw()
