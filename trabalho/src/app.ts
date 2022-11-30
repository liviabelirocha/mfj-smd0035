import P5 from "p5";
import "p5/lib/addons/p5.dom";

import { Vector2 } from "./geometry";

import Helpers from "./helpers";

import scenes from "./scenes";

import "./styles.scss";

const sketch = (p5: P5) => {
  const mouse = new Vector2(0, 0);

  const helpers = new Helpers({ mouse, drawCoordinates: true });

  const { draw, mousePressed, setup } = scenes("enclosingVolumes");

  p5.setup = () => {
    const canvas = p5.createCanvas(400, 400);

    setup({ helpers });

    canvas.parent("app");
  };

  p5.draw = () => {
    draw({ helpers });
  };

  p5.mousePressed = () => {
    mousePressed({ helpers });
  };
};

globalThis.p5 = new P5(sketch);
