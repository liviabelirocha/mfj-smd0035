let pontos = [];

function vdot(p1, p2) {
  return p1[0] * p2[0] + p1[1] * p2[1];
}

function vcross(p1, p2) {
  return p1[0] * p2[1] - p1[1] * p2[0];
}

function vsub(p1, p2) {
  return [p1[0] - p2[0], p1[1] - p2[1]];
}
function madd(p1, p2, s) {
  return [p1[0] + s * p2[0], p1[1] + s * p2[1]];
}

function vlerp(A, B, t) {
  return madd(A, vsub(B, A), t);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if (pontos.length == 0) return;

  for (let i = 0; i < pontos.length - (pontos.length % 2); i += 2) {
    let pi = pontos[i];
    let pj = pontos[i + 1];

    line(pi[0], pi[1], pj[0], pj[1]);
    circle(pi[0], pi[1], 5);
    circle(pj[0], pj[1], 5);
  }

  if (pontos.length / 2 < 2) return;

  let A = pontos[0];
  let B = pontos[1];
  let C = pontos[2];
  let D = pontos[3];

  text("A", A[0], A[1]);
  text("B", B[0], B[1]);

  let AB = vsub(B, A);
  let AC = vsub(C, A);
  let AD = vsub(D, A);

  if (vcross(AB, AC) * vcross(AB, AD) > 0) return;

  let CD = vsub(D, C);
  let CA = vsub(A, C);
  let CB = vsub(B, C);

  if (vcross(CD, CA) * vcross(CD, CB) > 0) return;

  //   stroke(255, 0, 0);

  // 2) calcular o t
  let N = [-CD[1], CD[0]];
  let NdotAB = vdot(N, AB);
  let NdotAC = vdot(N, AC);
  let t = NdotAC / NdotAB;
  let Pt = vlerp(A, B, t);
  circle(Pt[0], Pt[1], 6);

  text("t = " + t.toFixed(3), 0, 18);
}
function mousePressed() {
  //print('ieeei')
  pontos.push([mouseX, mouseY]);
}
