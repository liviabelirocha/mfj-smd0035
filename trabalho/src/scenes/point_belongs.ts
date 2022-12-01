import { Main } from ".";
import { Vector2 } from "../geometry";
import { AABB, Circle, OBB } from "../objects";

const aabb = new AABB(new Vector2(100, 120), 100, 100);
const obb = new OBB(new Vector2(300, 120), 100, 120, 0.8);
const circle = new Circle(new Vector2(200, 300), 70);

let point: Vector2;
let collided: boolean;
let collidedWith: "AABB" | "OBB" | "Círculo";

const setup: Main = () => {};

const setCollision = (col: boolean, obj?: "AABB" | "OBB" | "Círculo") => {
  collided = col;
  collidedWith = obj;
};

const draw: Main = ({ helpers }) => {
  p5.text("Clique para gerar um ponto", 10, 20);

  helpers.colore(255, 0, 0);
  aabb.draw();
  helpers.colore(0, 255, 0);
  obb.draw();
  helpers.colore(0, 0, 255);
  circle.draw();

  if (point) {
    aabb.isPointInside(point)
      ? setCollision(true, "AABB")
      : obb.isPointInside(point)
      ? setCollision(true, "OBB")
      : circle.isPointInside(point)
      ? setCollision(true, "Círculo")
      : setCollision(false);

    helpers.colore(220, 220, 220);
    p5.text(
      collided ? `Colisão com ${collidedWith}!` : "Não houve colisão",
      10,
      40
    );
    point.drawPoint();
  }
};

const mousePressed: Main = () => {
  point = new Vector2(p5.mouseX, p5.mouseY, { weight: 5, color: { c1: 220 } });
};

const reset = () => {
  point = null;
  collided = false;
  collidedWith = null;
};

const pointBelongs = {
  setup,
  draw,
  mousePressed,
  reset,
};

export default pointBelongs;
