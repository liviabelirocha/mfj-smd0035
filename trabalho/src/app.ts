import P5 from "p5";
import "p5/lib/addons/p5.dom";

import Helpers from "./helpers";
import Point from "./geometry/Point";

import "./styles.scss";
import scenes from "./scenes";

const sketch = (p5: P5) => {
  const mouse = new Point(p5, 0, 0);

  const helpers = new Helpers(p5, { mouse, drawCoordinates: true });

  const { variables, draw } = scenes("vectorIntersection");

  const { points } = variables();

  p5.setup = () => {
    const canvas = p5.createCanvas(400, 400);

    canvas.parent("app");
  };

  p5.draw = () => {
    draw(p5, { points }, { helpers });
  };

  p5.mousePressed = () => {
    if (points.length === 4) return;
    const point = new Point(p5, p5.mouseX, p5.mouseY, { weight: 5 });
    points.push(point);
  };
};

new P5(sketch);
