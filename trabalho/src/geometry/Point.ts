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

  draw() {
    const { color, weight } = this._options;

    this._helper.colore(
      color?.c1 ?? 0,
      color?.c2 ?? null,
      color?.c3 ?? null,
      color?.c4 ?? null
    );
    this._p5.fill(0);
    this._p5.strokeWeight(weight ?? 1);
    this._p5.point(this._x, this._y);
  }
}
