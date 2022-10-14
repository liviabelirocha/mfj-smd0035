import P5 from "p5";

import Point from "./geometry/Point";

export default class Helpers {
  private _p5: P5;
  _mouse: Point;

  constructor(p5: P5, mouse?: Point) {
    this._p5 = p5;
    this._mouse = mouse;
  }

  goCartesian() {
    const p5 = this._p5;

    const height = p5.height;
    const width = p5.width;

    p5.background(255);
    p5.strokeWeight(1);

    this._mouse.setCoordinates(p5.mouseX - width / 2, height / 2 - p5.mouseY);

    // this._color.colore(128, 0, 0);
    // this.arrow(0, height / 2, width, height / 2);
    // this._color.colore(0, 128, 0);
    // this.arrow(width / 2, height, width / 2, 0);

    p5.translate(width / 2, height / 2);
    p5.scale(1, -1, 1);
  }

  colore(c1: number, c2?: number, c3?: number, c4?: number) {
    const p5 = this._p5;

    if (c4 !== null) {
      p5.fill(c1, c2, c3, c4);
      p5.stroke(c1, c2, c3, c4);
    } else if (c3 !== null) {
      p5.fill(c1, c2, c3);
      p5.stroke(c1, c2, c3);
    } else if (c2 === null) {
      p5.fill(c1);
      p5.stroke(c1);
    } else {
      p5.fill(c1, c1, c1, c2);
      p5.stroke(c1, c1, c1, c2);
    }
  }
}
