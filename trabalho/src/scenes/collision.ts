import { Main } from ".";
import { Vector2 } from "../geometry";
import { AABB, Circle, OBB } from "../objects";

type Object = AABB | OBB | Circle;

const objects: {
  colore: () => void;
  obj: Object;
}[] = [
  {
    colore: () => p5.stroke(255, 0, 0),
    obj: new AABB(new Vector2(100, 120), 100, 100),
  },
  {
    colore: () => p5.stroke(0, 255, 0),
    obj: new OBB(new Vector2(300, 120), 100, 120, 0.8),
  },
  {
    colore: () => p5.stroke(0, 0, 255),
    obj: new Circle(new Vector2(200, 300), 70),
  },
];

let selectedObj: Object;

const setup: Main = () => {};

const draw: Main = () => {
  p5.text("Clique e arraste para mover os objetos", 10, 20);

  p5.noFill();
  for (const obj of objects) {
    obj.colore();
    obj.obj.draw();
  }
};

const mousePressed: Main = () => {};

const mouseDragged: Main = () => {
  for (const o of objects) {
    if (o.obj.isPointInside(new Vector2(p5.mouseX, p5.mouseY))) {
      if (selectedObj === o.obj || !selectedObj) {
        selectedObj = o.obj;
        o.obj._origin.setCoordinates(p5.mouseX, p5.mouseY);
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
