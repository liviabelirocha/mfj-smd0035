import { Main, Scene } from ".";
import { Vector2 } from "../geometry";

const points: Vector2[] = [];

const setup: Main = () => {};

const draw: Main = ({}) => {
  p5.background(220);

  if (points.length === 0) return;

  for (let i = 0; i < points.length - (points.length % 2); i += 2) {
    const pi = points[i];
    const pj = points[i + 1];

    pi._colore();
    p5.line(pi._x, pi._y, pj._x, pj._y);
    p5.text("A", pi._x, pi._y);
    p5.text("B", pj._x, pj._y);
  }

  if (points.length / 2 < 2) return;

  const A = points[0];
  const B = points[1];
  const C = points[2];
  const D = points[3];

  const AB = B.sub(A);
  const AC = C.sub(A);
  const AD = D.sub(A);

  if (AB.cross(AC) * AB.cross(AD) > 0) return;

  const CD = D.sub(C);
  const CA = A.sub(C);
  const CB = B.sub(C);

  if (CD.cross(CA) * CD.cross(CB) > 0) return;

  p5.fill(0);
  p5.stroke(0);
  const N = new Vector2(-CD._y, CD._x);
  const NdotAB = N.dot(AB);
  const NdotAC = N.dot(AC);
  const t = NdotAC / NdotAB;
  const Pt = new Vector2(A._x, A._y).lerp(new Vector2(B._x, B._y), t);
  p5.circle(Pt._x, Pt._y, 6);

  p5.text(`t = ${t.toFixed(3)}`, 5, 18);
};

const mousePressed = () => {
  const length = points.length;
  if (length === 4) return;
  const point = new Vector2(p5.mouseX, p5.mouseY, {
    weight: 5,
    color: {
      c1: length === 0 || length === 1 ? 255 : 0,
      c2: length === 0 || length === 1 ? 0 : 164,
      c3: 0,
    },
  });
  points.push(point);
};

const vectorIntersection: Scene = {
  draw,
  mousePressed,
  setup,
  reset: () => {},
};

export default vectorIntersection;
