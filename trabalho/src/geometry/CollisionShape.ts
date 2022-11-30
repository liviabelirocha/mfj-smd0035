import { Vector2 } from ".";

export class CollisionShape {
  public _origin: Vector2;

  constructor(origin: Vector2) {
    origin.fixW();
    this._origin = origin;
  }

  draw() {}

  isPointInside(pt: Vector2) {
    return false;
  }
}
