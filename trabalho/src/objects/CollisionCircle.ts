import { Vector2, CollisionShape } from "../geometry";

export class CollisionCircle extends CollisionShape {
  public _radius: number;

  constructor(origin: Vector2, radius: number) {
    super(origin);
    this._radius = radius;
  }

  draw() {
    //TODO: desenhar collision shapes com cores?
    p5.circle(this._origin._x, this._origin._y, this._radius);
  }

  isPointInside(pt: Vector2) {
    //um ponto está dentro de um círculo quando:
    //  a distancia entre o ponto e o centro do circulo
    //  é menor ou igual a o raio do circulo

    const distvec = this._origin.sub(pt);

    //lento:
    // if (distvec.mag() > this._radius) return false;

    //rapido, poupa um sqrt:
    if (distvec.magSquared() > this._radius * this._radius) return false;
    return true;
  }
}
