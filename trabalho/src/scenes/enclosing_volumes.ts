import { Main, Scene } from ".";
import { Vector2 } from "../geometry";
import Helpers from "../helpers";
import { AABB, Circle, OBB } from "../objects";

let points: Vector2[] = [];
const pointsAmount = 15;
let aabb: AABB;
let circle: Circle;
let obb: OBB;

const generateCloud = (helpers: Helpers) => {
  points = helpers.randomPoints(pointsAmount, 60);
  aabb = constructAABB(points);
  // circle = constructCircle(points);
  // obb = constructOBB(points);
};

const constructAABB = (pointsCloud: Vector2[]) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const point of pointsCloud) {
    const { x, y } = point.getCoordinates();

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);

    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  const origin = new Vector2((minX + maxX) / 2, (minY + maxY) / 2);

  const aabb = new AABB(origin, maxX - minX, maxY - minY);
  aabb.setMin(new Vector2(minX, minY));

  return aabb;
};

const constructCircle = (pointsCloud: Vector2[]) => {};

const constructOBB = (pointsCloud: Vector2[]) => {};

const draw: Main = () => {
  p5.background(100);
  p5.noFill();

  p5.stroke(0, 0, 0);
  p5.text(`Volumes envoltórios com ${pointsAmount} pontos`, 10, 20);

  for (const point of points) point.drawPoint();

  p5.stroke(255, 0, 0);
  p5.text("AABB", aabb._min._x, aabb._min._y - 5);
  aabb.draw();
};

const setup: Main = ({ helpers }) => {
  generateCloud(helpers);
};

const mousePressed: Main = ({ helpers }) => {
  generateCloud(helpers);
};

const enclosingVolumes: Scene = { draw, setup, mousePressed };

export default enclosingVolumes;
