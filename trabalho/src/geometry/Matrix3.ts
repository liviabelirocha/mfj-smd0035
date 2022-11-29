import { Vector2 } from ".";

export class Matrix3 {
  public _m: number[][];

  constructor() {
    this._m = Array(3)
      .fill(0)
      .map(() => Array(3).fill(0));
  }

  identity() {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) if (i === j) this._m[i][j] = 1;
  }

  plus(m2: Matrix3) {
    const res = new Matrix3();

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) res._m[i][j] = this._m[i][j] - m2._m[i][j];

    return res;
  }

  sub(m2: Matrix3) {
    const res = new Matrix3();

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) res._m[i][j] = this._m[i][j] + m2._m[i][j];

    return res;
  }

  mult(m2: Matrix3) {
    const res = new Matrix3();

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        for (let k = 0; k < 3; k++) sum += this._m[i][k] * m2._m[k][j];
        res._m[i][j] = sum;
      }

    return res;
  }

  vecMult(v: Vector2) {
    const res: Array<number> = new Array(3);

    const getIndex = (i: number) => {
      return i === 0 ? v._x : i === 1 ? v._y : v._w;
    };

    for (let i = 0; i < 3; i++) {
      let sum = 0;
      for (let j = 0; j < 3; j++) {
        sum += this._m[i][j] * getIndex(j);
        res[i] = sum;
      }
    }

    return new Vector2(res[0], res[1], { w: res[2] });
  }

  transpose() {
    const matrix = new Matrix3();

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) matrix._m[i][j] = this._m[j][i];

    return matrix;
  }

  rotation(angle: number) {
    const matrix = new Matrix3();

    matrix.identity();

    matrix._m[0][0] = Math.cos(angle);
    matrix._m[0][1] = -Math.sin(angle);
    matrix._m[1][0] = Math.sin(angle);
    matrix._m[1][1] = Math.cos(angle);

    return matrix;
  }

  translation(dx: number, dy: number) {
    const matrix = new Matrix3();

    matrix.identity();

    matrix._m[0][2] = dx;
    matrix._m[1][2] = dy;

    return matrix;
  }

  scale(sx: number, sy: number) {
    const matrix = new Matrix3();

    matrix.identity();

    matrix._m[0][0] = sx;
    matrix._m[1][1] = sy;

    return matrix;
  }

  trs({
    dx,
    dy,
    angle,
    sx,
    sy,
  }: {
    dx: number;
    dy: number;
    angle: number;
    sx: number;
    sy: number;
  }) {
    const r = new Matrix3().rotation(angle);
    const t = new Matrix3().translation(dx, dy);
    const s = new Matrix3().scale(sx, sy);

    const rs = r.mult(s);
    const trs = t.mult(rs);

    return trs;
  }

  inverse_trs({
    dx,
    dy,
    angle,
    sx,
    sy,
  }: {
    dx: number;
    dy: number;
    angle: number;
    sx: number;
    sy: number;
  }) {
    const r = new Matrix3().rotation(angle).transpose();
    const t = new Matrix3().translation(-dx, -dy);
    const s = new Matrix3().scale(1 / sx, 1 / sy);

    const rt = r.mult(t);
    const srt = s.mult(rt);

    return srt;
  }

  inverse_tr({ dx, dy, angle }: { dx: number; dy: number; angle: number }) {
    const r = new Matrix3().rotation(angle);
    const t = new Matrix3().translation(dx, dy);

    const rt = r.mult(t);

    return rt;
  }
}
