/*
 * Made using p5.js
 * https://editor.p5js.org/
*/

let mouseXC, mouseYC = 0

function setup() {
  createCanvas(400,400)  
}

function draw() {
   goCartesian()
  
  point(0, 0);
  stroke('purple');
  
  const sizeR = 100
  const direction = 70
  const angle = atan2(direction, sizeR)
  noFill()
  arc(0, 0, sizeR, sizeR, 0, angle * 2)
  arrow(0, 0, sizeR / 5, direction / 5)
  
  push()
    setLineDash([5, 5]);
    line(0,0,sizeR,direction)
  pop()
  
  const pointX = 30
  const pointY = 100
  
  push()
    strokeWeight(5)
    point(pointX, pointY)
  pop()
  
  const phi = atan2(pointY, pointX)
  drawText((phi >= 0 && phi <= angle*2) ? 'Pertence' : 'Não pertence', -width / 2 + 10, height / 2 - 20)
}


function goCartesian() {
  background(255)
  
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
  
  colore(128,0,0)
  arrow(0,height/2,width, height/2)
  colore(0,128,0)
  arrow(width/2,height,width/2, 0)
  
  translate(width/2,height/2)
  scale(1,-1,1)  
}

function grabMouse() {
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
}

function drawText(str,x,y) {
  push()
    resetMatrix();
    translate(width/2,height/2)
    text(str,x,-y)
  pop()
}

function colore(c1,c2,c3,c4) {
  if(c4 != null)
  {
    fill(c1,c2,c3,c4)
    stroke(c1,c2,c3,c4)
    return
  }
  if(c3 != null)
  {
    fill(c1,c2,c3)
    stroke(c1,c2,c3)
    return
  }
  
  if(c2 == null )
  {
    fill(c1)
    stroke(c1)
  }
  else
  {
    fill(c1,c1,c1,c2)
    stroke(c1,c1,c1,c2)
  }    
}

function arrow(x1,y1,x2,y2, dash=false) {
  push()
  if (dash) setLineDash([5, 5]);
  line(x1,y1,x2,y2)
  const dx = x2-x1, dy = y2-y1
  const le = sqrt(dx*dx + dy*dy)
  const vx = dx/le, vy = dy/le
  const ux = -vy
  const uy = vx
  triangle(x2,y2,
           x2-5*vx+2*ux, y2-5*vy+2*uy,
           x2-5*vx-2*ux, y2-5*vy-2*uy)
  pop()
}
    
function setLineDash(list) {
  drawingContext.setLineDash(list);
}
