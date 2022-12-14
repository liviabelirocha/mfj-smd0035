import { Line, Vector2 } from "./geometry";

interface Options {
  mouse?: Vector2;
  drawCoordinates?: boolean;
}

export default class Helpers {
  _options: Options;
  _mouse?: Vector2;

  constructor(options?: Options) {
    this._options = options;
    this._mouse = options?.mouse;
  }

  goCartesian() {
    const height = p5.height;
    const width = p5.width;

    p5.background(255);
    p5.strokeWeight(1);

    const { drawCoordinates } = this._options;

    this._mouse.setCoordinates(p5.mouseX - width / 2, height / 2 - p5.mouseY);

    if (drawCoordinates) {
      new Line(new Vector2(0, height / 2), new Vector2(width, height / 2), {
        isArrow: true,
        color: { c1: 128, c2: 0, c3: 0 },
      }).draw();
      new Line(new Vector2(width / 2, height), new Vector2(width / 2, 0), {
        isArrow: true,
        color: { c1: 0, c2: 128, c3: 0 },
      }).draw();
    }

    p5.translate(width / 2, height / 2);
    p5.scale(1, -1, 1);
  }

  cartesianText(text: string, x: number, y: number) {
    p5.push();
    p5.resetMatrix();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.text(text, x, -y);
    p5.pop();
  }

  colore(c1: number, c2?: number, c3?: number, c4?: number) {
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

  random(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
  }

  randomPoints(amount: number, range: number) {
    const points: Vector2[] = [];

    for (let i = 0; i < amount; i++)
      points.push(
        new Vector2(
          this.random(range, p5.width - range),
          this.random(range, p5.height - range),
          {
            weight: 5,
            color: {
              c1: 220,
            },
          }
        )
      );

    return points;
  }
}
