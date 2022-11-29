import { Vector2, Matrix3 } from "../geometry";

export class Square {
  private _points: Array<Vector2> = new Array(4);

  constructor(isPosition = true) {
    this._points[0] = new Vector2(50, 50, { isPosition });
    this._points[1] = new Vector2(-50, 50, { isPosition });
    this._points[2] = new Vector2(-50, -50, { isPosition });
    this._points[3] = new Vector2(50, -50, { isPosition });
  }

  draw() {
    let last: Vector2;
    for (let i = 0; i < 4; i++) {
      const current = this._points[i];
      if (last) p5.line(current._x, current._y, last._x, last._y);
      else
        p5.line(current._x, current._y, this._points[3]._x, this._points[3]._y);
      p5.circle(current._x, current._y, 8);
      last = current;
    }
  }

  rotate(angle: number) {
    const matrix = new Matrix3().rotation(angle);

    for (let i = 0; i < 4; i++)
      this._points[i] = matrix.vecMult(this._points[i]);
  }

  translate(mouse: Vector2) {
    const matrix = new Matrix3().translation(mouse._x, mouse._y);

    for (let i = 0; i < 4; i++)
      this._points[i] = matrix.vecMult(this._points[i]);
  }

  scale(mouse: Vector2) {
    const matrix = new Matrix3().scale(mouse._x / 50, mouse._y / 50);

    for (let i = 0; i < 4; i++)
      this._points[i] = matrix.vecMult(this._points[i]);
  }

  trs(mouse: Vector2) {
    const matrix = new Matrix3().trs({
      dx: mouse._x,
      dy: mouse._y,
      angle: mouse.radAngle(),
      sx: mouse._x / 50,
      sy: mouse._y / 50,
    });

    for (let i = 0; i < 4; i++)
      this._points[i] = matrix.vecMult(this._points[i]);
  }

  inverse_trs(mouse: Vector2) {
    const matrix = new Matrix3().inverse_trs({
      dx: mouse._x,
      dy: mouse._y,
      angle: mouse.radAngle(),
      sx: mouse._x / 50,
      sy: mouse._y / 50,
    });

    for (let i = 0; i < 4; i++)
      this._points[i] = matrix.vecMult(this._points[i]);
  }

  camera(mouse: Vector2) {
    const matrix = new Matrix3().inverse_tr({
      dx: mouse._x,
      dy: mouse._y,
      angle: mouse.radAngle(),
    });

    for (let i = 0; i < 4; i++)
      this._points[i] = matrix.vecMult(this._points[i]);
  }
}
