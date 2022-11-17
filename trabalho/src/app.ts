import P5 from "p5";
import "p5/lib/addons/p5.dom";

import { Vector2 } from "./geometry";

import Helpers from "./helpers";

import scenes from "./scenes";

import "./styles.scss";

const sketch = (p5: P5) => {
  const mouse = new Vector2(0, 0);

  const helpers = new Helpers({ mouse, drawCoordinates: true });

  const { variables, draw } = scenes("vectorIntersection");

  const { points } = variables();

  p5.setup = () => {
    const canvas = p5.createCanvas(400, 400);

    canvas.parent("app");
  };

  p5.draw = () => {
    draw({ points }, { helpers });
  };

  p5.mousePressed = () => {
    if (points.length === 4) return;
    const point = new Vector2(p5.mouseX, p5.mouseY, { weight: 5 });
    points.push(point);
  };
};

globalThis.p5 = new P5(sketch);
