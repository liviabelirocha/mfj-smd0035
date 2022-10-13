import P5 from "p5";
import P5Color from "../Color";

interface Options {
  color?: P5Color;
  weight?: number;
}

export default class Point {
  private _p5: P5;

  private _x: number;
  private _y: number;

  private _options: Options;

  constructor(p5: P5, x: number, y: number, options?: Options) {
    this._p5 = p5;
    this._x = x;
    this._y = y;

    this._options = options;
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

    color ? color.colore() : new P5Color(0).colore();
    this._p5.strokeWeight(weight ?? 1);
    this._p5.point(this._x, this._y);
  }
}
