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
  
  colore(196, 128) 
  const R = 128
  for( ang=0; ang<2*PI; ang += PI/36)
    arrow(0,0, R*cos(ang), R*sin(ang))
    
  colore(128,32,32)
  arrow(0, 0, mouseXC, mouseYC)
  
  /* my code */
  const arrowX = -R*cos(0.6);
  const arrowY = R*sin(0.6);
      
  colore(255, 0, 0)
  arrow(0, 0, arrowX, arrowY)
  
  colore(0,0,0)
  drawText(`angle: ${angle(arrowX, arrowY, mouseXC, mouseYC)}`, -width / 2 + 10, height / 2 - 20)
  
  noFill();
  arc(0, 0, 50, 50, atan2(mouseYC, mouseXC), atan2(arrowY, arrowX))
}

/* my code */
const angle = (x1, y1, x2, y2) => {
  const vectorNorm = (x, y) => sqrt(x*x + y*y)

  const dotProduct = (x1*x2 + y1*y2);  
  const cosTheta = dotProduct / (vectorNorm(x1, y1) * vectorNorm(x2, y2));
  const theta = acos(cosTheta);
  return theta * 180/PI;
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

