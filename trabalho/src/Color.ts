import P5 from "p5";

export default class P5Color {
  _p5: P5;

  _c1: number;
  _c2: number;
  _c3: number;
  _c4: number;

  constructor(c1?: number, c2?: number, c3?: number, c4?: number) {
    this._c1 = this.check(c1);
    this._c2 = this.check(c2);
    this._c3 = this.check(c3);
    this._c4 = this.check(c4);
  }

  getColor() {}

  colore(c1?: number, c2?: number, c3?: number, c4?: number) {
    const p5 = this._p5;

    c1 = this.check(c1) ?? this._c1;
    c2 = this.check(c2) ?? this._c2;
    c3 = this.check(c3) ?? this._c3;
    c4 = this.check(c4) ?? this._c4;

    if (!c1) throw new Error("Color does not exists");

    if (c4) {
      p5.fill(c1, c2, c3, c4);
      p5.stroke(c1, c2, c3, c4);
      return;
    } else if (c3) {
      p5.fill(c1, c2, c3);
      p5.stroke(c1, c2, c3);
      return;
    } else if (!c2) {
      p5.fill(c1);
      p5.stroke(c1);
    } else {
      p5.fill(c1, c1, c1, c2);
      p5.stroke(c1, c1, c1, c2);
    }
  }

  private check(c: number) {
    if (!c) return;
    if (c < 0 || c > 255) throw new Error("Color not valid!");
    return c;
  }
}
