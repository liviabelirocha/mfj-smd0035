import { Vector2, CollisionShape } from "../geometry";
import Helpers from "../helpers";
import { AABB, OBB, Circle } from "../objects";

export class CollisionTests {
  //
  static AABB_AABB(a: AABB, b: AABB) {
    const distance = a._origin.sub(b._origin);
    //a distancia em cada eixo precisa ser menor que as metades dos tamanhos
    if (Math.abs(distance._x) > (a._width + b._width) / 2) return false;
    if (Math.abs(distance._y) > (a._height + b._height) / 2) return false;

    return true;
  }

  static Circle_Circle(a: Circle, b: Circle) {
    const distance = a._origin.sub(b._origin);
    if (distance.mag() > a._radius + b._radius) return false;
    return true;
  }

  static AABB_OBB(a: AABB, b: OBB) {
    //testar se um dos pontos da obb ta dentro da aabb, ou vice-versa
    const a_hw = a._width / 2;
    const a_hh = a._height / 2;
    const aabb_corners = [
      a._origin.add(new Vector2(a_hw, a_hh)),
      a._origin.add(new Vector2(a_hw, -a_hh)),
      a._origin.add(new Vector2(-a_hw, -a_hh)),
      a._origin.add(new Vector2(-a_hw, a_hh)),
    ];
    //se um dos pontos da aabb estão dentro da obb, verdadeiro
    for (let i = 0; i < aabb_corners.length; i++) {
      if (b.isPointInside(aabb_corners[i])) return true;
    }
    //testar os pontos da obb
    const b_hw = b._width / 2;
    const b_hh = b._height / 2;
    const obb_corners = b.getCorners();
    //se um dos pontos da aabb estão dentro da obb, verdadeiro
    for (let i = 0; i < obb_corners.length; i++) {
      if (a.isPointInside(obb_corners[i])) return true;
    }

    // //test test
    // if (b.isPointInside(a._origin)) return true;
    return false;
  }

  static OBB_OBB(a: OBB, b: OBB) {
    //mesma ideia do aabb x obb, testar se um dos cantos de um está dentro do outro
    const a_hw = a._width / 2;
    const a_hh = a._height / 2;
    const a_corners = a.getCorners();
    for (let i = 0; i < a_corners.length; i++) {
      if (b.isPointInside(a_corners[i])) return true;
    }

    const b_hw = b._width / 2;
    const b_hh = b._height / 2;
    const b_corners = b.getCorners();
    for (let i = 0; i < b_corners.length; i++) {
      if (a.isPointInside(b_corners[i])) return true;
    }
    return false;
  }

  static AABB_Circle(a: AABB, b: Circle) {
    //primeiro, metodo idiota, checar se um dos pontos do aabb estao no circulo
    const a_hw = a._width / 2;
    const a_hh = a._height / 2;
    const aabb_corners = [
      a._origin.add(new Vector2(a_hw, a_hh)),
      a._origin.add(new Vector2(a_hw, a_hh)),
      a._origin.add(new Vector2(a_hw, a_hh)),
      a._origin.add(new Vector2(a_hw, a_hh)),
    ];
    for (let i = 0; i < aabb_corners.length; i++) {
      if (b.isPointInside(aabb_corners[i])) return true;
    }
    //senão, testar se um segmento colide com o circulo
    //primeiro passo, achar a posição na borda do aabb mais proxima ao circulo
    const px = Helpers.clamp(
      b._origin._x,
      a._origin._x - a_hw, //parede da esquerda
      a._origin._x + a_hw //parede da direita
    );
    const py = Helpers.clamp(
      b._origin._y,
      a._origin._y - a_hh, //parede de baixo
      a._origin._y + a_hh //parede de cima
    );
    const pt = new Vector2(px, py);
    //testar se a distancia desse ponto ao centro do circulo é menor que o raio
    const distance = pt.sub(b._origin);
    if (distance.mag() <= b._radius) return true;
    return false;
  }
}
