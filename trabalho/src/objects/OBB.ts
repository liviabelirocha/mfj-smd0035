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
    p5.push();
    p5.beginShape();
    const corners = this.getCorners();
    for (const pt of corners) {
      p5.vertex(pt._x, pt._y);
    }
    p5.endShape("close");
    p5.pop();

    p5.push();
    p5.translate(corners[1]._x, corners[1]._y - 5);
    p5.rotate(this._angle);
    p5.text("OOBB", 0, 0);
    p5.pop();
  }

  drawWithCoords() {
    const { p0, p1, p2, p3 } = this._coords;

    p5.beginShape();
    p5.vertex(p0._x, p0._y);
    p5.vertex(p1._x, p1._y);
    p5.vertex(p2._x, p2._y);
    p5.vertex(p3._x, p3._y);
    p5.endShape("close");

    p5.push();
    p5.translate(p0._x, p0._y - 5);
    p5.rotate(this._angle);
    p5.text("OOBB", 0, 0);
    p5.pop();
  }

  getCorners() {
    const o = this._origin;
    const hw = this._width / 2.0;
    const hh = this._height / 2.0;
    const sina = Math.sin(this._angle);
    const cosa = Math.cos(this._angle);

    let corners = [
      //os comentarios são com angulo < pi/2
      new Vector2(o._x + hw * cosa + hh * sina, o._y + hh * cosa - hw * sina), //superior direito
      new Vector2(o._x + hw * cosa - hh * sina, o._y - hh * cosa - hw * sina), //inferior direito
      new Vector2(o._x - hw * cosa - hh * sina, o._y - hh * cosa + hw * sina), //inferior esquerdo
      new Vector2(o._x - hw * cosa + hh * sina, o._y + hh * cosa + hw * sina), //superior esquerdo
    ];
    return corners;
  }

  isPointInside(pt: Vector2) {
    const halfwidth = this._width / 2.0;
    const halfheight = this._height / 2.0;
    const a = this._angle;
    const dist = pt.sub(this._origin);
    //rotacionar o plano de referencia do ponto atual
    const rpt = new Vector2(
      dist._x * Math.cos(a) - dist._y * Math.sin(a),
      dist._x * Math.sin(a) + dist._y * Math.cos(a)
    );
    //console.log(Math.round(rpt._x / 10), Math.round(rpt._y / 10));

    return !(
      rpt._x < -halfwidth ||
      rpt._x > halfwidth ||
      rpt._y < -halfheight ||
      rpt._y > halfheight
    );
  }
}
