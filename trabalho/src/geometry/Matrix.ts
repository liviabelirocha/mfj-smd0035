import { Vector2 } from ".";

export class Matrix {
  public _m: number[][];

  public _l: number;
  public _c: number;

  constructor(l?: number, c?: number) {
    this._l = l;
    this._c = c;

    if (l && c)
      this._m = Array(l)
        .fill(0)
        .map(() => Array(c).fill(0));
    else if (l && !c)
      this._m = Array(l)
        .fill(0)
        .map(() => Array(l).fill(0));
    else if (!l && !c) this._m.push([0]);
  }

  private isSquare() {
    return this._l === this._c;
  }

  private sameSize(v: Vector2) {
    return this.isSquare() && this._l === 3;
  }

  mult(m2: Matrix) {
    if (this._c !== m2._l) throw new Error("Invalid operation");

    const res = new Matrix(this._l, m2._c);

    for (let line = 0; line < this._l; line++) {
      for (let column = 0; column < m2._c; column++) {
        let sum = 0;

        for (let k = 0; k < this._c; k++)
          sum += this._m[line][k] * m2._m[k][column];

        res._m[line][column] = sum;
      }
    }

    return res;
  }
}
