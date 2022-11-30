import { Vector2, CollisionShape } from "../geometry";

type Coords = {
  p0: Vector2;
  p1: Vector2;
  p2: Vector2;
  p3: Vector2;
};

export class OBB extends CollisionShape {
  public _width: number;
  public _height: number;
  public _angle: number;

  public _coords: Coords;

  constructor(
    origin: Vector2,
    width: number,
    height: number,
    angle: number,
    coords?: Coords
  ) {
    super(origin);
    this._width = width;
    this._height = height;
    this._angle = angle; // rad
    this._coords = coords ?? null;
  }

  draw() {
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

  drawWithCoords() {
    const { p0, p1, p2, p3 } = this._coords;

    p5.beginShape();
    p5.vertex(p0._x, p0._y);
    p5.vertex(p1._x, p1._y);
    p5.vertex(p2._x, p2._y);
    p5.vertex(p3._x, p3._y);
    p5.endShape("close");
  }

  isPointInside(pt: Vector2) {
    const halfwidth = this._width / 2.0;
    const halfheight = this._height / 2.0;
    const a = this._angle;

    const rpt = new Vector2(
      pt._x * Math.cos(a) - pt._y * Math.sin(a),
      pt._x * Math.sin(a) + pt._y * Math.cos(a)
    );

    return !(
      rpt._x < this._origin._x - halfwidth ||
      rpt._x > this._origin._x + halfwidth ||
      rpt._y < this._origin._y - halfheight ||
      rpt._y < this._origin._y + halfheight
    );
  }
}
