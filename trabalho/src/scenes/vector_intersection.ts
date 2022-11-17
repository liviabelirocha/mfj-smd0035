import { Draw } from ".";
import { Vector2 } from "../geometry";

const variables = () => {
  const points: Vector2[] = [];

  return { points };
};

const draw: Draw = ({ points }: { points: Vector2[] }) => {
  p5.background(220);

  if (points.length === 0) return;

  for (let i = 0; i < points.length - (points.length % 2); i += 2) {
    const pi = points[i];
    const pj = points[i + 1];

    p5.line(pi._x, pi._y, pj._x, pj._y);
    pi.drawPoint();
    pj.drawPoint();
  }

  if (points.length / 2 < 2) return;

  const A = points[0];
  const B = points[1];
  const C = points[2];
  const D = points[3];

  p5.text("A", A._x, A._y);
  p5.text("B", B._x, B._y);

  const AB = B.sub(A);
  const AC = C.sub(A);
  const AD = D.sub(A);

  if (AB.cross(AC) * AB.cross(AD) > 0) return;

  const CD = D.sub(C);
  const CA = A.sub(C);
  const CB = B.sub(C);

  if (CD.cross(CA) * CD.cross(CB) > 0) return;

  const N = new Vector2(-CD._y, CD._x);
  const NdotAB = N.dot(AB);
  const NdotAC = N.dot(AC);
  const t = NdotAC / NdotAB;
  const Pt = new Vector2(A._x, A._y).lerp(new Vector2(B._x, B._y), t);
  p5.circle(Pt._x, Pt._y, 6);

  p5.text(`t = ${t.toFixed(3)}`, 5, 18);
};

const Vector2Intersection = {
  variables,
  draw,
};

export default Vector2Intersection;
