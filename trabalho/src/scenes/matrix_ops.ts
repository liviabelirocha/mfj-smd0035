import { Main, Scene } from ".";
import { Square } from "../objects";

let square: Square;

const transformations = [
  "rotation",
  "translation",
  "scale",
  "trs",
  "inverse_trs",
  "camera",
];
let currentTransformationIndex = 0;

const currentTransformation = () => transformations[currentTransformationIndex];

const setup: Main = () => {};

const draw: Main = ({ helpers }) => {
  helpers.goCartesian();

  p5.fill(0);
  p5.stroke(240);
  helpers.cartesianText("Click to change", -190, 180);
  helpers.cartesianText(`Current: ${currentTransformation()}`, -190, 160);

  square = new Square();

  switch (currentTransformation()) {
    case "rotation":
      square.rotate(helpers._mouse.radAngle());
      break;
    case "translation":
      square.translate(helpers._mouse);
      break;
    case "scale":
      square.scale(helpers._mouse);
      break;
    case "trs":
      square.trs(helpers._mouse);
      break;
    case "inverse_trs":
      square.inverse_trs(helpers._mouse);
      break;
    case "camera":
      square.camera(helpers._mouse);
      break;
  }

  helpers.colore(0, 0, 0);
  square.draw();
};

const mousePressed = () => {
  currentTransformationIndex += 1;
  if (currentTransformationIndex === transformations.length)
    currentTransformationIndex = 0;
};

const reset = () => {
  square = null;
  currentTransformationIndex = 0;
};

const matrixOps: Scene = { setup, draw, mousePressed, reset };

export default matrixOps;
