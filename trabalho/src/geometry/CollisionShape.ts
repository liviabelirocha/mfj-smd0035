/*
parente: CollisionShape
  - isPointInside(pnt:Vector2)

herdam de colshape:
    AABB
    OBB
    Circle
*/

import { Vector2 } from ".";

export class CollisionShape {
  //centro da forma no espaço 2d; vetor posição
  public _origin: Vector2;

  constructor(origin: Vector2) {
    origin.fixW();
    this._origin = origin;
  }

  //virtual;
  draw() {}

  //virtual; pra ser usado nas outras formas
  isPointInside(pt: Vector2) {
    return false;
  }
}

export class AABB extends CollisionShape {
  public _width: number;
  public _height: number;

  constructor(origin: Vector2, width: number, height: number) {
    super(origin);
    this._width = width;
    this._height = height;
  }

  draw() {
    //TODO: p5.rect
  }

  isPointInside(pt: Vector2) {
    //um ponto está dentro de uma AABB quando:
    //  seu x está entre origin.x-0.5*width e origin.x+0.5*width
    //  seu y está entre origin.y-0.5*height e origin.y+0.5*height

    const halfwidth = this._width / 2.0;
    const halfheight = this._height / 2.0;

    if (pt._x < this._origin._x - halfwidth) return false;
    if (pt._x > this._origin._x + halfwidth) return false;

    if (pt._y < this._origin._y - halfheight) return false;
    if (pt._y < this._origin._y + halfheight) return false;

    return true;
  }
}

export class Circle extends CollisionShape {
  public _radius: number;

  constructor(origin: Vector2, radius: number) {
    super(origin);
    this._radius = radius;
  }

  draw() {
    //TODO: desenhar collision shapes com cores?
    p5.circle(this._origin._x, this._origin._y, this._radius);
  }

  isPointInside(pt: Vector2) {
    //um ponto está dentro de um círculo quando:
    //  a distancia entre o ponto e o centro do circulo
    //  é menor ou igual a o raio do circulo

    const distvec = this._origin.sub(pt);

    //lento:
    // if (distvec.mag() > this._radius) return false;

    //rapido, poupa um sqrt:
    if (distvec.magSquared() > this._radius * this._radius) return false;
    return true;
  }
}

/*
NOTA SOBRE OOB
o melhor oob é aquele com menor área (menor largura*altura)
*/
