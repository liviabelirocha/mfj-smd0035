import { Vector2, CollisionShape } from "../geometry";

export class Circle extends CollisionShape {
  public _radius: number;

  constructor(origin: Vector2, radius: number) {
    super(origin);
    this._radius = radius;
  }

  draw() {
    p5.circle(this._origin._x, this._origin._y, 2 * this._radius);
  }

  isPointInside(pt: Vector2) {
    /** um ponto está dentro de um círculo quando:
     *  a distância entre o ponto e o centro do círculo
     *  é menor ou igual a o raio do círculo
     */

    const distvec = this._origin.sub(pt);
    return !(distvec.magSquared() > this._radius * this._radius);
  }
}
