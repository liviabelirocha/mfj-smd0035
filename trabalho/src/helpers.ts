import P5 from "p5";

import Point from "./geometry/Point";
import Vector from "./geometry/Vector";

interface Options {
  mouse?: Point;
  drawCoordinates?: boolean;
}

export default class Helpers {
  private _p5: P5;
  _options: Options;

  constructor(p5: P5, options?: Options) {
    this._p5 = p5;
    this._options = options;
  }

  goCartesian() {
    const p5 = this._p5;

    const height = p5.height;
    const width = p5.width;

    p5.background(255);
    p5.strokeWeight(1);

    const { mouse, drawCoordinates } = this._options;

    mouse.setCoordinates(p5.mouseX - width / 2, height / 2 - p5.mouseY);

    if (drawCoordinates) {
      new Vector(
        p5,
        new Point(p5, 0, height / 2),
        new Point(p5, width, height / 2),
        {
          isArrow: true,
          color: { c1: 128, c2: 0, c3: 0 },
        }
      ).draw();
      new Vector(
        p5,
        new Point(p5, width / 2, height),
        new Point(p5, width / 2, 0),
        {
          isArrow: true,
          color: { c1: 0, c2: 128, c3: 0 },
        }
      ).draw();
    }

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
