import { Vector2, CollisionShape } from "../geometry";

export class CollisionOBB extends CollisionShape {
  public _width: number;
  public _height: number;
  public _angle: number;

  constructor(origin: Vector2, width: number, height: number, angle: number) {
    super(origin);
    this._width = width;
    this._height = height;
    this._angle = angle; //em radianos
  }

  draw() {
    //TODO: p5.rect
  }

  isPointInside(pt: Vector2) {
    const halfwidth = this._width / 2.0;
    const halfheight = this._height / 2.0;
    const a = this._angle;

    //posição do ponto em relação à rotação da OOB
    const rpt = new Vector2(
      pt._x * Math.cos(a) - pt._y * Math.sin(a),
      pt._x * Math.sin(a) + pt._y * Math.cos(a)
    );

    //mesmos testes da AABB
    if (rpt._x < this._origin._x - halfwidth) return false;
    if (rpt._x > this._origin._x + halfwidth) return false;

    if (rpt._y < this._origin._y - halfheight) return false;
    if (rpt._y < this._origin._y + halfheight) return false;

    return true;
  }
}
