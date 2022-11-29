/*
parente: CollisionShape
  - isPointInside(pnt:Vector2)

herdam de colshape:
    AABB
    OBB
    Circle
*/

import { Vector2 } from ".";

export class CollisionShape {
  //centro da forma no espaço 2d; vetor posição
  public _origin: Vector2;

  constructor(origin: Vector2) {
    origin.fixW();
    this._origin = origin;
  }

  //virtual;
  draw() {}

  //virtual; pra ser usado nas outras formas
  isPointInside(pt: Vector2) {
    return false;
  }
}

/*
NOTA SOBRE OOB
o melhor oob é aquele com menor área (menor largura*altura)
*/
