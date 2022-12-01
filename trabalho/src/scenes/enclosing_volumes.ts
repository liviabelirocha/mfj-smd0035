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
  circle = constructCircle(points);
  obb = constructOBB(points);
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
  let smallestCircle: Circle;
  let testCircle: Circle;
  // todos os pares
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
      if (isValid)
        if (
          smallestCircle == null ||
          testCircle._radius <= smallestCircle._radius
        )
          smallestCircle = testCircle;
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
        if (isValid)
          if (
            smallestCircle == null ||
            testCircle._radius <= smallestCircle._radius
          )
            smallestCircle = testCircle;
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
  const origin = new Vector2(-g, -f);
  let radius = Math.sqrt(f * f + g * g - c);
  radius += 0.01; //corrigir erros de float

  return new Circle(origin, radius);
};

const constructOBB = (pointsCloud: Vector2[]) => {
  const u = new Vector2(Math.random(), Math.random()).normalize();
  const v = u.normal();

  const project = (v: Vector2, points: Vector2[]) => {
    let min = Infinity;
    let max = -Infinity;

    for (const point of points) {
      const dotProd = v.dot(point);
      min = Math.min(min, dotProd);
      max = Math.max(max, dotProd);
    }

    return { min, max };
  };

  const pu = project(u, pointsCloud);
  const pv = project(v, pointsCloud);

  // center
  const uc = (pu.min + pu.max) / 2;
  const vc = (pv.min + pv.max) / 2;
  const vec1 = u.multiply(uc);
  const vec2 = v.multiply(vc);
  const center = vec1.add(vec2);

  //  corners
  const width = (pu.max - pu.min) / 2;
  const height = (pv.max - pv.min) / 2;

  // coords
  const op0 = [u.multiply(-width), v.multiply(-height)];
  const op1 = [u.multiply(width), v.multiply(-height)];
  const op2 = [u.multiply(width), v.multiply(height)];
  const op3 = [u.multiply(-width), v.multiply(height)];

  const p0 = op0[0].add(op0[1]).add(center);
  const p1 = op1[0].add(op1[1]).add(center);
  const p2 = op2[0].add(op2[1]).add(center);
  const p3 = op3[0].add(op3[1]).add(center);

  const xAxis = new Vector2(1, 0);
  const adot = u.dot(xAxis);
  const angle = Math.acos(adot / (xAxis.mag() * u.mag()));

  return new OBB(center, width, height, angle, { p0, p1, p2, p3 });
};

const draw: Main = () => {
  p5.noFill();

  p5.stroke(220, 220, 220);
  p5.text(`Volumes envoltórios com ${pointsAmount} pontos`, 10, 20);
  p5.text("Clique para gerar novos pontos", 10, 40);

  for (const point of points) point.drawPoint();

  p5.stroke(255, 0, 0);
  p5.text("AABB", aabb._min._x, aabb._min._y - 5);
  aabb.draw();

  p5.stroke(0, 255, 0);
  circle.draw();

  p5.stroke(0, 0, 255);
  p5.text("OOBB", obb._coords.p0._x, obb._coords.p0._y - 5);
  obb.drawWithCoords();
};

const setup: Main = ({ helpers }) => {
  generateCloud(helpers);
};

const mousePressed: Main = ({ helpers }) => {
  generateCloud(helpers);
};

const reset = () => {
  points.splice(0, points.length);
  aabb = null;
  circle = null;
  obb = null;
};

const enclosingVolumes: Scene = { draw, setup, mousePressed, reset };

export default enclosingVolumes;
