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
  
  strokeWeight(5)

  colore(0, 0, 255)
  const p1x = 50, p1y = 50, p2x = 100, p2y = 100
  const p1 = point(p1x, p1y)
  const p2 = point(p2x, p2y)
  
  colore(255, 0, 0)
  const ax = 60, ay = 90, bx = 85, by = 40
  point(ax, ay)
  point(bx, by)
  
  strokeWeight(1)
  line(ax, ay, bx, by)
  
  colore(0, 0, 255)
  drawingContext.setLineDash([5, 5]);
  line(p1x, p1y, p2x, p2y)
  
  const x1 = p2x - p1x, 
        y1 = p1y - p2y,
        x2 = bx - ax,
        y2 = ay - by,
        c1 = y1*p1x + x1*p1y,
        c2 = y2*ax + x2*ay
  
  const det = y1*x2 - y2*x1
  
  if (det == 0)
    point(10**9, 10**9)
  
  else {
    const resx = (x2*c1 - x1*c2) / det
    const resy = (y1*c2 - y2*c1) / det
    strokeWeight(5)
    colore(0, 0, 0)
    point(resx, resy)
  }
}

function goCartesian() {
  background(255)
  strokeWeight(1)
  drawingContext.setLineDash([0, 0]);

  
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

function arrow(x1,y1,x2,y2) {
  line(x1,y1,x2,y2)
  const dx = x2-x1, dy = y2-y1
  const le = sqrt(dx*dx + dy*dy)
  const vx = dx/le, vy = dy/le
  const ux = -vy
  const uy = vx
  triangle(x2,y2,
           x2-5*vx+2*ux, y2-5*vy+2*uy,
           x2-5*vx-2*ux, y2-5*vy-2*uy)
}
