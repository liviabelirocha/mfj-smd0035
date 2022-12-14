import Helpers from "../helpers";
import { Line } from ".";

interface Options {
  weight?: number;
  color?: { c1: number; c2?: number; c3?: number; c4?: number };
  w?: number;
  isPosition?: boolean;
  isArrow?: boolean;
}

export class Vector2 {
  public _x: number;
  public _y: number;

  public _w: number;

  private _helper: Helpers;
  public _options: Options;

  public _colore: () => void;

  constructor(x: number, y: number, options?: Options) {
    this._x = x;
    this._y = y;

    this._w = options?.w || (options?.isPosition ? 1 : 0);

    this._helper = new Helpers();
    this._options = options ?? {};

    const color = options?.color;
    this._colore = () =>
      this._helper.colore(
        color?.c1 ?? 0,
        color?.c2 ?? null,
        color?.c3 ?? null,
        color?.c4 ?? null
      );
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

  //normalizar o w para 1, caso seja maior ou menor que 1
  fixW() {
    //sair cedo se não for necessário mudar o w
    if (this._w == 0 || this._w == 1) return;
    //senão, aplicar o w
    this.setX(this._x / this._w);
    this.setY(this._y / this._w);
    this.setW(1);
    return;
  }

  setCoordinates(x: number, y: number, w?: number) {
    this.setX(x);
    this.setY(y);
    w && this.setW(w);
  }

  mag() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  //mais rapido em performance
  magSquared() {
    return this._x * this._x + this._y * this._y;
  }

  sub(v: Vector2) {
    return new Vector2(this._x - v._x, this._y - v._y);
  }

  add(v: Vector2) {
    return new Vector2(this._x + v._x, this._y + v._y, this._options);
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

  rotateByRad(a: number) {
    return new Vector2(
      Math.cos(a) * this._x - Math.sin(a) * this._y,
      Math.sin(a) * this._x + Math.cos(a) * this._y
    );
  }

  copy(options?: Options) {
    return new Vector2(this._x, this._y, options);
  }

  radAngle() {
    return Math.atan2(this._y, this._x);
  }

  normalize() {
    const mag = this.mag();
    this.setCoordinates(this._x / mag, this._y / mag);
    return this;
  }

  normal() {
    return new Vector2(-this._y, this._x);
  }

  multiply(value: number) {
    return new Vector2(this._x * value, this._y * value);
  }

  drawPoint() {
    const { weight } = this._options;

    p5.push();
    this._colore();
    p5.fill(0);
    p5.strokeWeight(weight ?? 1);
    p5.point(this._x, this._y);
    p5.pop();
  }

  draw(o?: Vector2) {
    if (!o) o = new Vector2(0, 0);
    const { x: ox, y: oy } = o.getCoordinates();

    p5.circle(ox, oy, 5);
    p5.strokeWeight(this._options?.weight ?? 1);
    new Line(o, this, {
      isArrow: !!this._options?.isArrow,
      color: this._options?.color,
    }).draw();
  }
}
