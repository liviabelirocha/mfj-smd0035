import { Vector2, CollisionShape } from "../geometry";

export class CollisionAABB extends CollisionShape {
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
