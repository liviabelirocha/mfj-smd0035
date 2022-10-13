import P5 from "p5";

import P5Color from "./Color";
import Point from "./geometry/Point";

export default class Helpers {
  private _p5: P5;
  _mouse: Point;
  _color: P5Color;

  constructor(p5: P5, mouse: Point) {
    this._p5 = p5;
    this._mouse = mouse;
    this._color = new P5Color();
  }

  goCartesian() {
    const p5 = this._p5;

    const height = p5.height;
    const width = p5.width;

    p5.background(255);
    p5.strokeWeight(1);
    p5.drawingContext.setLineDash([0, 0]);

    this._mouse.setCoordinates(p5.mouseX - width / 2, height / 2 - p5.mouseY);

    this._color.colore(128, 0, 0);
    // this.arrow(0, height / 2, width, height / 2);
    this._color.colore(0, 128, 0);
    // this.arrow(width / 2, height, width / 2, 0);

    p5.translate(width / 2, height / 2);
    p5.scale(1, -1, 1);
  }
}
