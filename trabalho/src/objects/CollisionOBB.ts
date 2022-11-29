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
    const halfwidth = this._width / 2;
    const halfheight = this._height / 2;
    //p5.translate(-halfwidth, -halfheight);
    p5.push();

    p5.translate(this._origin._x, this._origin._y);
    p5.rotate(this._angle);
    p5.rect(-this._width / 2, -this._height / 2, this._width, this._height);
    //p5.rotate(-p5.radians(p5.frameCount));
    p5.pop();
    //p5.translate(halfwidth, halfheight);
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
