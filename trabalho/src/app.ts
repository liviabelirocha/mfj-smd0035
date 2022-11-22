import P5 from "p5";
import "p5/lib/addons/p5.dom";

import Helpers from "./helpers";

import scenes from "./scenes";

import "./styles.scss";

const sketch = (p5: P5) => {
  const helpers = new Helpers();

  const { variables, draw, mousePressed } = scenes("vectorIntersection");

  const { points } = variables();

  p5.setup = () => {
    const canvas = p5.createCanvas(400, 400);

    canvas.parent("app");
  };

  p5.draw = () => {
    draw({ points }, { helpers });
  };

  p5.mousePressed = () => {
    mousePressed();
  };
};

globalThis.p5 = new P5(sketch);
