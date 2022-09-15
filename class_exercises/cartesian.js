/*
 * Made using p5.js
 * https://editor.p5js.org/
*/

const arrowSize = 8;
const nOfVectors = 6;

let originX;
let originY;

let vectors = [];
let origins = [];

function setup() {
  createCanvas(400, 400);
  
  originX = width / 2;
  originY = height / 2;  
  
  const randPos = (size) => random(-size/2, size/2)
  
  for (let i = 0; i < nOfVectors; i++) origins.push(new Point(randPos(width), randPos(height)))
  for (let i = 0; i < nOfVectors; i++) vectors.push(new Vector(origins[i], randPos(width), randPos(height)))
}

function draw() {
  background(255);
  
  /* Cartesian lines */
  const arrowW = 9
  const arrowH = 3
  
  // x axis
  fill(128,0,0) 
  stroke(128,0,0)   
  line(0,height/2, width, height/2)
  line(width-arrowW, height/2 -arrowH, width, height/2)
  line(width-arrowW, height/2 +arrowH, width, height/2)
  
  // y axis
  fill(0,128,0)
  stroke(0,128,0)
  line(width/2,0, width/2, height)
  line(width/2,0, width/2-arrowH, arrowW)
  line(width/2,0, width/2+arrowH, arrowW)
  
  /* ---------- */

  vectors.map(vector => vector.draw())
}


class Point {
  constructor(x, y) {
    this.x = x + originX;
    this.y = -y + originY;
  }
}

class Vector {
  constructor(origin, x, y) {
    this.origin = origin;
    this.x = x + originX;
    this.y = -y + originY;
    this.color = color(random(0, 256), random(0, 256), random(0, 256));
  }

  draw() {    
    push()
    stroke(this.color)
    line(this.origin.x, this.origin.y, this.x, this.y)
    pop()
    
    push()
    stroke(this.color)
    fill(this.color)
    const angle = atan2(this.origin.y - this.y, this.origin.x - this.x);
    translate(this.x, this.y);
    rotate(angle-HALF_PI);
    triangle(-arrowSize*0.5, arrowSize, arrowSize*0.5, arrowSize, 0, -arrowSize/2)
    pop()
  }
}

