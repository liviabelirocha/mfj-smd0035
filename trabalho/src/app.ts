import P5 from "p5";
import "p5/lib/addons/p5.dom";

import Helpers from "./helpers";
import Point from "./geometry/Point";

import "./styles.scss";

const sketch = (p5: P5) => {
  const mouse = new Point(p5, 0, 0);

  const helpers = new Helpers(p5, mouse);

  p5.setup = () => {
    const canvas = p5.createCanvas(400, 400);

    canvas.parent("app");
  };

  p5.draw = () => {
    helpers.goCartesian();

    new Point(p5, -50, 0, {
      weight: 20,
      color: {
        c1: 255,
        c2: 0,
        c3: 0,
      },
    }).draw();
    new Point(p5, 0, 0, {
      weight: 40,
      color: {
        c1: 0,
        c2: 255,
        c3: 0,
      },
    }).draw();
    new Point(p5, 50, 0, {
      weight: 20,
      color: {
        c1: 0,
        c2: 0,
        c3: 255,
      },
    }).draw();
  };
};

new P5(sketch);
