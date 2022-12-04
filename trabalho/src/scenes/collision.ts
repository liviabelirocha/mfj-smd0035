import { Main } from ".";
import { Vector2 } from "../geometry";
import { CollisionTests } from "../geometry/CollisionTests";
import { AABB, Circle, OBB } from "../objects";

type Object = AABB | OBB | Circle;

const objects: { [key: string]: { colore: () => void; obj: Object } } = {
  aabb_1: {
    colore: () => p5.stroke(255, 0, 0),
    obj: new AABB(new Vector2(200, 280), 100, 100),
  },
  aabb_2: {
    colore: () => p5.stroke(255, 255, 0),
    obj: new AABB(new Vector2(100, 120), 100, 100),
  },
  obb_1: {
    colore: () => p5.stroke(0, 255, 0),
    obj: new OBB(new Vector2(380, 105), 100, 120, 0.8),
  },
  obb_2: {
    colore: () => p5.stroke(255, 0, 230),
    obj: new OBB(new Vector2(505, 285), 90, 130, 0.3),
  },
  circle_1: {
    colore: () => p5.stroke(0, 0, 255),
    obj: new Circle(new Vector2(510, 510), 70),
  },
  circle_2: {
    colore: () => p5.stroke(0, 255, 230),
    obj: new Circle(new Vector2(250, 460), 70),
  },
};

let selectedObj: Object;
let isColliding = false;

const setup: Main = () => {};

const draw: Main = ({ helpers }) => {
  p5.text("Clique e arraste para mover os objetos", 10, 20);

  p5.noFill();
  for (const o in objects) {
    const obj = objects[o];
    obj.colore();
    obj.obj.draw();
  }

  const aabb_circle =
    CollisionTests.AABB_Circle(
      objects.aabb_1.obj as AABB,
      objects.circle_1.obj as Circle
    ) ||
    CollisionTests.AABB_Circle(
      objects.aabb_1.obj as AABB,
      objects.circle_2.obj as Circle
    ) ||
    CollisionTests.AABB_Circle(
      objects.aabb_2.obj as AABB,
      objects.circle_1.obj as Circle
    ) ||
    CollisionTests.AABB_Circle(
      objects.aabb_2.obj as AABB,
      objects.circle_2.obj as Circle
    );

  const obb_circle =
    CollisionTests.OBB_Circle(
      objects.obb_1.obj as OBB,
      objects.circle_1.obj as Circle
    ) ||
    CollisionTests.OBB_Circle(
      objects.obb_1.obj as OBB,
      objects.circle_2.obj as Circle
    ) ||
    CollisionTests.OBB_Circle(
      objects.obb_2.obj as OBB,
      objects.circle_1.obj as Circle
    ) ||
    CollisionTests.OBB_Circle(
      objects.obb_2.obj as OBB,
      objects.circle_2.obj as Circle
    );

  const aabb_obb =
    CollisionTests.AABB_OBB(
      objects.aabb_1.obj as AABB,
      objects.obb_1.obj as OBB
    ) ||
    CollisionTests.AABB_OBB(
      objects.aabb_1.obj as AABB,
      objects.obb_2.obj as OBB
    ) ||
    CollisionTests.AABB_OBB(
      objects.aabb_2.obj as AABB,
      objects.obb_1.obj as OBB
    ) ||
    CollisionTests.AABB_OBB(
      objects.aabb_2.obj as AABB,
      objects.obb_2.obj as OBB
    );

  const aabb_aabb = CollisionTests.AABB_AABB(
    objects.aabb_1.obj as AABB,
    objects.aabb_2.obj as AABB
  );

  const obb_obb = CollisionTests.OBB_OBB(
    objects.obb_1.obj as OBB,
    objects.obb_2.obj as OBB
  );

  const circle_circle = CollisionTests.Circle_Circle(
    objects.circle_1.obj as Circle,
    objects.circle_2.obj as Circle
  );

  isColliding =
    aabb_circle ||
    obb_circle ||
    aabb_obb ||
    aabb_aabb ||
    obb_obb ||
    circle_circle;

  if (isColliding) {
    helpers.colore(220, 220, 220);
    p5.text(
      `Colisão entre:${aabb_aabb ? "AABB_AABB" : ""} ${
        aabb_circle ? "AABB_Círculo" : ""
      } ${aabb_obb ? "AABB_OBB" : ""} ${obb_circle ? "OBB_Círculo" : ""} ${
        obb_obb ? "OBB_OBB" : ""
      } ${circle_circle ? "Círculo_Círculo" : ""}`,
      10,
      40
    );
  }
};

const mousePressed: Main = () => {};

const mouseDragged: Main = () => {
  for (const o in objects) {
    const obj = objects[o];
    if (obj.obj.isPointInside(new Vector2(p5.mouseX, p5.mouseY))) {
      if (selectedObj === obj.obj || !selectedObj) {
        selectedObj = obj.obj;
        obj.obj._origin.setCoordinates(p5.mouseX, p5.mouseY);
      }
    }
  }
};

const mouseReleased: Main = () => {
  selectedObj = null;
};

const reset = () => {};

const collision = {
  setup,
  draw,
  mousePressed,
  reset,
  mouseDragged,
  mouseReleased,
};

export default collision;
