const canvas = document.createElement('canvas');
canvas.id='bg-canvas';
document.body.appendChild(canvas);
const ctx=canvas.getContext('2d');
let w=canvas.width=window.innerWidth;
let h=canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;});

const stars=[];
for(let i=0;i<200;i++){
  stars.push({
    x:Math.random()*w,
    y:Math.random()*h,
    z:Math.random()*w,
    size:Math.random()*2,
    color:`hsl(${Math.random()*360},70%,70%)`
  });
}

function draw(){
  ctx.fillStyle='#0f0c29';
  ctx.fillRect(0,0,w,h);
  for(let s of stars){
    s.z-=2;
    if(s.z<=0) s.z=w;
    const sx=(s.x-w/2)*(w/s.z)+w/2;
    const sy=(s.y-h/2)*(w/s.z)+h/2;
    const radius=s.size*(w/s.z);
    ctx.beginPath();
    ctx.arc(sx,sy,radius,0,Math.PI*2);
    ctx.fillStyle=s.color;
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();
