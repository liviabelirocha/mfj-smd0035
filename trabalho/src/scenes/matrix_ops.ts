import { Main } from ".";
import { Square } from "../geometry";

let angle = 0;
let square: Square;

const transformations = [
  "rotation",
  "translation",
  "scale",
  "trs",
  "inverse_trs",
];
let currentTransformationIndex = 0;

const currentTransformation = () => transformations[currentTransformationIndex];

const variables = () => {};

const setup: Main = () => {};

const draw: Main = ({}, { helpers }) => {
  helpers.goCartesian();

  p5.fill(0);
  p5.stroke(240);
  helpers.cartesianText("Click to change", -190, 180);
  helpers.cartesianText(`Current: ${currentTransformation()}`, -190, 160);

  square = new Square();
  angle = p5.createVector(helpers._mouse._x, helpers._mouse._y).heading();

  switch (currentTransformation()) {
    case "rotation":
      square.rotate(angle);
      break;
    case "translation":
      square.translate(helpers._mouse);
      break;
    case "scale":
      square.scale(helpers._mouse);
      break;
    case "trs":
      square.trs(helpers._mouse, angle);
      break;
    case "inverse_trs":
      square.inverse_trs(helpers._mouse, angle);
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

const matrixOps = { setup, draw, variables, mousePressed };

export default matrixOps;
