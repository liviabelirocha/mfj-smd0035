import { Main, Scene } from ".";
import { Vector2 } from "../geometry";

const numOfVectors = Math.floor(Math.random() * 10) + 2;
const vectors: Vector2[] = [];
const mainVector = new Vector2(200, 200, {
  weight: 3,
});

const doChore = () => {
  p5.background(220);
  p5.stroke(220);
  p5.fill(0);
  p5.text("Click to shuffle", 10, 20);

  p5.shuffle(vectors, true);

  let current: Vector2, next: Vector2;

  current = next = mainVector.copy({
    isArrow: true,
    weight: 1,
  });

  for (let i = 0; i < numOfVectors; i++) {
    next = next.add(vectors[i]);
    next.draw(current);
    current = next.copy();
  }

  const resulting = next.copy({
    color: {
      c1: 0,
      c2: 0,
      c3: 255,
    },
    isArrow: true,
    weight: 2,
  });

  resulting.draw(mainVector);
};

const setup: Main = ({ helpers }) => {
  for (let i = 0; i < numOfVectors; i++) {
    const x = helpers.random(-50, 50);
    const y = helpers.random(-50, 50);
    vectors.push(new Vector2(x, y));
  }

  doChore();
};

const draw: Main = () => {};

const mousePressed = () => {
  doChore();
};

const vectorSum: Scene = {
  mousePressed,
  setup,
  draw,
};

export default vectorSum;
