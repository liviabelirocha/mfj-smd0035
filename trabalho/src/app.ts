import P5 from "p5";
import "p5/lib/addons/p5.dom";

import Helpers from "./helpers";
import Point from "./geometry/Point";

import "./styles.scss";

const sketch = (p5: P5) => {
  const mouse = new Point(p5, 0, 0);

  const helpers = new Helpers(p5, { mouse, drawCoordinates: true });

  const points: Point[] = [];

  p5.setup = () => {
    const canvas = p5.createCanvas(400, 400);

    canvas.parent("app");
  };

  p5.draw = () => {
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

    const N = new Point(p5, -CD.getY(), CD.getX());
    const NdotAB = N.dot(AB);
    const NdotAC = N.dot(AC);
    const t = NdotAC / NdotAB;
    const Pt = A.lerp(B, t);
    p5.circle(Pt.getX(), Pt.getY(), 6);

    p5.text(`t = ${t.toFixed(3)}`, 5, 18);
  };

  p5.mousePressed = () => {
    if (points.length === 4) return;
    const point = new Point(p5, p5.mouseX, p5.mouseY, { weight: 5 });
    points.push(point);
  };
};

new P5(sketch);
