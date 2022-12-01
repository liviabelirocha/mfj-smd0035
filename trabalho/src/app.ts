import P5 from "p5";
import "p5/lib/addons/p5.dom";

import { Vector2 } from "./geometry";

import Helpers from "./helpers";

import scenes, { SceneTitle } from "./scenes";

import "./styles.scss";

const possibleScenes: SceneTitle[] = [
  "objectCollision",
  "pointBelongs",
  "enclosingVolumes",
];

let currentSceneIndex = 0;

const currentScene = () => possibleScenes[currentSceneIndex];

const sketch = (p5: P5) => {
  const mouse = new Vector2(0, 0);

  const helpers = new Helpers({ mouse, drawCoordinates: true });

  const { draw, mousePressed, setup, reset, mouseDragged, mouseReleased } =
    scenes(currentScene());

  p5.setup = () => {
    const canvas = p5.createCanvas(450, 450);

    reset();
    setup({ helpers });

    canvas.parent("app");
  };

  p5.draw = () => {
    p5.background(0);

    helpers.colore(220, 220, 220);
    p5.text(`Cena atual: ${currentScene()}`, 10, p5.height - 10);
    p5.text("Espaço para mudar de cena", 10, p5.height - 30);

    draw({ helpers });
  };

  p5.mousePressed = () => {
    mousePressed({ helpers });
  };

  p5.mouseDragged = () => {
    if (mouseDragged) mouseDragged({ helpers });
  };

  p5.mouseReleased = () => {
    if (mouseReleased) mouseReleased({ helpers });
  };
};

document.addEventListener("keyup", (event: KeyboardEvent) => {
  const { code } = event;
  if (code === "Space") {
    document.getElementById("app").innerHTML = "";
    currentSceneIndex += 1;
    if (currentSceneIndex === possibleScenes.length) currentSceneIndex = 0;
    setP5();
  }
});

const setP5 = () => {
  globalThis.p5 = new P5(sketch);
};

setP5();
