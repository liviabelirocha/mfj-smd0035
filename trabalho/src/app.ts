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
  };
};

new P5(sketch);
