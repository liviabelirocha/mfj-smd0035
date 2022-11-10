import p5 from "p5";
import Point from "../geometry/Point";
import Vector from "../geometry/Vector";
import Helpers from "../helpers";

const variables = () => {
  const points: Point[] = [];

  return { points };
};

const draw = (
  p5: p5,
  { points }: { points: Point[] },
  { helpers }: { helpers: Helpers }
) => {
  p5.background(220);

  if (points.length === 0) return;

  for (let i = 0; i < points.length - (points.length % 2); i += 2) {
    const pi = points[i];
    const pj = points[i + 1];

    p5.line(pi.getX(), pi.getY(), pj.getX(), pj.getY());
    pi.draw();
    pj.draw();
  }

  if (points.length / 2 < 2) return;

  const A = points[0];
  const B = points[1];
  const C = points[2];
  const D = points[3];

  p5.text("A", A.getX(), A.getY());
  p5.text("B", B.getX(), B.getY());

  const AB = B.sub(A);
  const AC = C.sub(A);
  const AD = D.sub(A);

  if (AB.cross(AC) * AB.cross(AD) > 0) return;

  const CD = D.sub(C);
  const CA = A.sub(C);
  const CB = B.sub(C);

  if (CD.cross(CA) * CD.cross(CB) > 0) return;

  const N = new Vector(p5, -CD.getY(), CD.getX());
  const NdotAB = N.dot(AB);
  const NdotAC = N.dot(AC);
  const t = NdotAC / NdotAB;
  const Pt = new Vector(p5, A.getX(), A.getY()).lerp(
    new Vector(p5, B.getX(), B.getY()),
    t
  );
  p5.circle(Pt.getX(), Pt.getY(), 6);

  p5.text(`t = ${t.toFixed(3)}`, 5, 18);
};

const vectorIntersection = {
  variables,
  draw,
};

export default vectorIntersection;
