document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas')
  const ctx = canvas.getContext('2d')

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  let mouseX = 0, mouseY = 0
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX - window.innerWidth / 2
    mouseY = e.clientY - window.innerHeight / 2
  })

  const iconSources = [
    'images/marvel1.png',
    'images/marvel2.png',
    'images/spiderman.png',
    'images/ironman.png'
  ]
  const icons = iconSources.map(src => { const i = new Image(); i.src = src; return i })

  class Particle {
    constructor(){ this.reset() }
    reset(){
      this.x = Math.random()*window.innerWidth - window.innerWidth/2
      this.y = Math.random()*window.innerHeight - window.innerHeight/2
      this.z = Math.random()*window.innerWidth + 200
      this.size = 15+Math.random()*25
      this.speed = 0.0008+Math.random()*0.0012
      this.angle = Math.random()*Math.PI*2
      this.rotationSpeed = (Math.random()-0.5)*0.02
      this.icon = icons[Math.floor(Math.random()*icons.length)]
    }
    update(delta){
      this.z -= this.speed*window.innerWidth*delta
      this.angle += this.rotationSpeed*delta
      if(this.z<50) this.reset()
    }
    draw(){
      const k = 800/this.z
      const px = (this.x+mouseX*0.08)*k+window.innerWidth/2
      const py = (this.y+mouseY*0.08)*k+window.innerHeight/2
      const size = Math.max(8,this.size*k*0.06)

      ctx.save()
      ctx.globalAlpha = Math.max(0.2,1-(this.z/(window.innerWidth+400)))
      if(this.icon.complete && this.icon.naturalWidth){
        ctx.translate(px,py)
        ctx.rotate(this.angle)
        ctx.drawImage(this.icon,-size/2,-size/2,size,size)
      } else {
        ctx.beginPath()
        ctx.fillStyle='rgba(155,93,229,0.7)'
        ctx.arc(px,py,size/4,0,Math.PI*2)
        ctx.fill()
      }
      ctx.restore()
    }
  }

  const particles=[]
  for(let i=0;i<40;i++) particles.push(new Particle())

  let last=performance.now()
  function frame(now){
    const delta=(now-last)/16.67
    last=now
    ctx.clearRect(0,0,canvas.width,canvas.height)
    particles.sort((a,b)=>b.z-a.z)
    particles.forEach(p=>{p.update(delta);p.draw()})
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
})
