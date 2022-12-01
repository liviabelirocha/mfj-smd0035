import { Vector2, CollisionShape } from "../geometry";

export class AABB extends CollisionShape {
  public _width: number;
  public _height: number;

  public _min: Vector2;

  constructor(origin: Vector2, width: number, height: number) {
    super(origin);
    this._width = width;
    this._height = height;
  }

  setMin(min: Vector2) {
    this._min = min;
  }

  draw() {
    p5.rect(
      this._origin._x - this._width / 2,
      this._origin._y - this._height / 2,
      this._width,
      this._height
    );
  }

  isPointInside(pt: Vector2) {
    const halfwidth = this._width / 2.0;
    const halfheight = this._height / 2.0;

    return !(
      pt._x < this._origin._x - halfwidth ||
      pt._x > this._origin._x + halfwidth ||
      pt._y < this._origin._y - halfheight ||
      pt._y > this._origin._y + halfheight
    );
  }
}
