import P5 from "p5";
import Helpers from "../helpers";
import Line from "./Line";
import Point from "./Point";

interface Options {
  weight?: number;
  color?: { c1: number; c2?: number; c3?: number; c4?: number };
  w?: number;
}

export default class Vector {
  private _p5: P5;

  private _x: number;
  private _y: number;

  private _helper: Helpers;
  private _options: Options;

  constructor(p5: P5, x: number, y: number, options?: Options) {
    this._p5 = p5;
    this._x = x;
    this._y = y;

    this._helper = new Helpers(p5);
    this._options = options;
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

  sub(v: Vector) {
    return new Vector(this._p5, this._x - v.getX(), this._y - v.getY());
  }

  cross(v: Vector) {
    return this._x * v.getY() - this._y * v.getX();
  }

  dot(v: Vector) {
    return this._x * v.getX() + this._y * v.getY();
  }

  lerp(B: Vector, t: number) {
    return this.madd(B.sub(this), t);
  }

  madd(v: Vector, s: number) {
    return new Point(this._p5, this._x + s * v.getX(), this._y + s * v.getY());
  }

  draw(o?: Point) {
    const p5 = this._p5;
    if (!o) o = new Point(p5, 0, 0);
    const { x: ox, y: oy } = o.getCoordinates();

    p5.circle(ox, oy, 6);
    new Line(p5, o, new Point(p5, this._x, this._y, this._options));
  }
}
