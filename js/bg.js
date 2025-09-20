const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function initParticles(count=150){
  particles=[];
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      z: Math.random()*1,
      size: Math.random()*2+1,
      speed: Math.random()*0.02+0.01
    });
  }
}
initParticles();

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let p of particles){
    const x = (p.x - canvas.width/2) * (1+p.z) + canvas.width/2;
    const y = (p.y - canvas.height/2) * (1+p.z) + canvas.height/2;
    const radius = p.size*(1+p.z*2);
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fillStyle="rgba(155,93,229,0.7)";
    ctx.fill();
    p.z += p.speed;
    if(p.z>1)p.z=0;
  }
  requestAnimationFrame(draw);
}
draw();
