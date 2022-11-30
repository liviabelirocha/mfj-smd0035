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
  //circle = new Circle(new Vector2(0, 0), 100); //constructCircle(points);
  circle = constructCircle(points);
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

const constructCircleTest = (pointsCloud: Vector2[]) => {
  //teste 1: usar apenas os 3 primeiros pontos
  const circle = circleFromThreePoints(
    pointsCloud[0],
    pointsCloud[1],
    pointsCloud[2]
  );
  //os pontos estao dentro do circulo?
  let isValid = true;
  for (let i = 0; i < 3; i++) {
    if (!circle.isPointInside(pointsCloud[i])) isValid = false;
  }
  console.log(
    "are the 3 gen points *actually* inside the circle?",
    isValid ? "yes" : "no"
  );
  return circle;
};

const constructCircle = (pointsCloud: Vector2[]) => {
  //algoritmo burro: para todas as combinações de 2 pontos e 3 pontos, escolher
  //o circulo de menor raio que contem todos os pontos
  let smallestCircle: Circle = null;
  let testCircle: Circle = null;
  //todos os pares
  for (let i = 0; i < pointsCloud.length; i++) {
    for (let j = i + 1; j < pointsCloud.length; j++) {
      testCircle = circleFromTwoPoints(pointsCloud[i], pointsCloud[j]);
      let isValid = true;
      for (const point of pointsCloud) {
        if (testCircle.isPointInside(point) == false) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        if (
          smallestCircle == null ||
          testCircle._radius <= smallestCircle._radius
        )
          smallestCircle = testCircle;
      }
    }
  }
  //e todos os trios
  for (let i = 0; i < pointsCloud.length; i++) {
    for (let j = i + 1; j < pointsCloud.length; j++) {
      for (let k = j + 1; k < pointsCloud.length; k++) {
        testCircle = circleFromThreePoints(
          pointsCloud[i],
          pointsCloud[j],
          pointsCloud[k]
        );
        let isValid = true;
        for (const point of pointsCloud) {
          if (testCircle.isPointInside(point) == false) {
            isValid = false;
            break;
          }
        }
        if (isValid) {
          if (
            smallestCircle == null ||
            testCircle._radius <= smallestCircle._radius
          )
            smallestCircle = testCircle;
        }
      }
    }
  }

  return smallestCircle;
};

const circleFromTwoPoints = (p1: Vector2, p2: Vector2) => {
  //o menor circulo tem diametro igual à distancia entre p1 e p2
  //com centro no meio dos dois
  const origin = p1.lerp(p2, 0.5);
  let radius = origin.sub(p1).mag();
  radius += 1; //corrigir erros de float
  return new Circle(origin, radius);
};

const circleFromThreePoints = (p1: Vector2, p2: Vector2, p3: Vector2) => {
  //https://www.geeksforgeeks.org/equation-of-circle-when-three-points-on-the-circle-are-given/
  const x1_2 = p1._x - p2._x;
  const x1_3 = p1._x - p3._x;
  const x3_1 = -x1_3;
  const x2_1 = -x1_2;
  const y1_2 = p1._y - p2._y;
  const y1_3 = p1._y - p3._y;
  const y3_1 = -y1_3;
  const y2_1 = -y1_2;

  const sqx1_3 = p1._x * p1._x - p3._x * p3._x;
  const sqy1_3 = p1._y * p1._y - p3._y * p3._y;
  const sqx2_1 = p2._x * p2._x - p1._x * p1._x;
  const sqy2_1 = p2._y * p2._y - p1._y * p1._y;

  const f =
    (sqx1_3 * x1_2 + sqy1_3 * x1_2 + sqx2_1 * x1_3 + sqy2_1 * x1_3) /
    (2 * (y3_1 * x1_2 - y2_1 * x1_3));
  const g =
    (sqx1_3 * y1_2 + sqy1_3 * y1_2 + sqx2_1 * y1_3 + sqy2_1 * y1_3) /
    (2 * (x3_1 * y1_2 - x2_1 * y1_3));

  const c = -p1._x * p1._x - p1._y * p1._y - 2 * g * p1._x - 2 * f * p1._y;
  // equação do circulo é x^2 + y^2 + 2*g*x + 2*f*y + c = 0
  // onde o centro (h,k) é (h = -g, k = -f) e raio r
  // com r^2 = h^2 + k^2 - c = g^2 + f^2 - c
  const origin = new Vector2(-g, -f);
  let radius = Math.sqrt(f * f + g * g - c);
  radius += 0.01; //corrigir erros de float

  return new Circle(origin, radius);
};

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
  circle.draw();
};

const setup: Main = ({ helpers }) => {
  generateCloud(helpers);
};

const mousePressed: Main = ({ helpers }) => {
  generateCloud(helpers);
};

const enclosingVolumes: Scene = { draw, setup, mousePressed };

export default enclosingVolumes;
