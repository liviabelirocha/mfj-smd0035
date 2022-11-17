import Helpers from "../helpers";
import Vector2 from "./Vector2";

interface Options {
  isArrow?: boolean;
  color?: { c1: number; c2?: number; c3?: number; c4?: number };
}

export default class Line {
  public _a: Vector2;
  public _b: Vector2;

  private _options: Options;
  private _helper: Helpers;

  constructor(a: Vector2, b: Vector2, options?: Options) {
    this._a = a;
    this._b = b;

    this._options = options;
    this._helper = new Helpers();
  }

  getA() {
    return this._a.getCoordinates();
  }

  getB() {
    return this._b.getCoordinates();
  }

  getCoordinates() {
    return { a: this.getA(), b: this.getB() };
  }

  setA(x: number, y: number) {
    this._a.setCoordinates(x, y);
  }

  setB(x: number, y: number) {
    this._b.setCoordinates(x, y);
  }

  draw() {
    const { color, isArrow } = this._options;

    this._helper.colore(
      color?.c1 ?? 0,
      color?.c2 ?? null,
      color?.c3 ?? null,
      color?.c4 ?? null
    );

    const { a, b } = this.getCoordinates();
    const { x: ax, y: ay } = a;
    const { x: bx, y: by } = b;

    p5.line(ax, ay, bx, by);

    if (isArrow) {
      const dx = bx - ax,
        dy = by - ay;
      const le = p5.sqrt(dx * dx + dy * dy);
      const vx = dx / le,
        vy = dy / le;
      const ux = -vy;
      const uy = vx;
      p5.triangle(
        bx,
        by,
        bx - 5 * vx + 2 * ux,
        by - 5 * vy + 2 * uy,
        bx - 5 * vx - 2 * ux,
        by - 5 * vy - 2 * uy
      );
    }
  }
}
