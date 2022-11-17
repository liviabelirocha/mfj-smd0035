import Helpers from "../helpers";
import Line from "./Line";

interface Options {
  weight?: number;
  color?: { c1: number; c2?: number; c3?: number; c4?: number };
  w?: number;
  isPosition?: boolean;
}

export default class Vector2 {
  public _x: number;
  public _y: number;

  public _w: number;

  private _helper: Helpers;
  private _options: Options;

  constructor(x: number, y: number, options?: Options) {
    this._x = x;
    this._y = y;

    this._w = options?.w || (options?.isPosition ? 1 : 0);

    this._helper = new Helpers();
    this._options = options;
  }

  getCoordinates() {
    return { x: this._x, y: this._y, w: this._w };
  }

  setX(x: number) {
    this._x = x;
  }

  setY(y: number) {
    this._y = y;
  }

  setW(w: number) {
    this._w = w;
  }

  setCoordinates(x: number, y: number, w?: number) {
    this.setX(x);
    this.setY(y);
    w && this.setW(w);
  }

  sub(v: Vector2) {
    return new Vector2(this._x - v._x, this._y - v._y);
  }

  cross(v: Vector2) {
    return this._x * v._y - this._y * v._x;
  }

  dot(v: Vector2) {
    return this._x * v._x + this._y * v._y;
  }

  lerp(B: Vector2, t: number) {
    return this.madd(B.sub(this), t);
  }

  madd(v: Vector2, s: number) {
    return new Vector2(this._x + s * v._x, this._y + s * v._y);
  }

  draw(o?: Vector2) {
    if (!o) o = new Vector2(0, 0);
    const { x: ox, y: oy } = o.getCoordinates();

    p5.circle(ox, oy, 6);
    new Line(o, new Vector2(this._x, this._y, this._options)).draw();
  }

  drawPoint() {
    const { color, weight } = this._options;

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
