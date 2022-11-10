import P5 from "p5";
import Helpers from "../helpers";

interface Options {
  weight?: number;
  color?: { c1: number; c2?: number; c3?: number; c4?: number };
}

export default class Point {
  private _p5: P5;

  private _x: number;
  private _y: number;

  private _options: Options;
  private _helper: Helpers;

  constructor(p5: P5, x: number, y: number, options?: Options) {
    this._p5 = p5;
    this._x = x;
    this._y = y;

    this._options = options;
    this._helper = new Helpers(p5);
  }

  getCoordinates() {
    return { x: this._x, y: this._y };
  }

  getX() {
    return this._x;
  }

  getY() {
    return this._y;
  }

  setX(x: number) {
    this._x = x;
  }

  setY(y: number) {
    this._y = y;
  }

  setCoordinates(x: number, y: number) {
    this.setX(x);
    this.setY(y);
  }

  sub(p: Point) {
    return new Point(this._p5, this._x - p.getX(), this._y - p.getY());
  }

  cross(p: Point) {
    return this._x * p.getY() - this._y * p.getX();
  }

  dot(p: Point) {
    return this._x * p.getX() + this._y * p.getY();
  }

  madd(p: Point, s: number) {
    return new Point(this._p5, this._x + s * p.getX(), this._y + s * p.getY());
  }

  lerp(B: Point, t: number) {
    return this.madd(B.sub(this), t);
  }

  draw() {
    const { color, weight } = this._options;
    const p5 = this._p5;

    p5.push();
    this._helper.colore(
      color?.c1 ?? 0,
      color?.c2 ?? null,
      color?.c3 ?? null,
      color?.c4 ?? null
    );
    p5.fill(0);
    p5.strokeWeight(weight ?? 1);
    p5.point(this._x, this._y);
    p5.pop();
  }
}
