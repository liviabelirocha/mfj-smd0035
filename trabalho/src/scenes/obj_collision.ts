import { Main, Scene } from ".";
import { CollisionShape, Vector2 } from "../geometry";
import { CollisionTests } from "../geometry/CollisionTests";
import { AABB, Circle, OBB } from "../objects";

//let bg_color = p5.color(100);
let shape_mouse: CollisionShape;
let shape_target: CollisionShape;

const setup: Main = () => {
  shape_mouse = new AABB(new Vector2(p5.mouseX, p5.mouseY), 50, 90);
  shape_target = new AABB(new Vector2(p5.width / 2, p5.height / 2), 200, 130);
  //   shape_target = new Circle(
  //     new Vector2(p5.width / 2, p5.height / 2),
  //     100
  //   );
};

const draw: Main = ({ helpers }) => {
  //helpers.goCartesian();
  //desenhar a forma atual
  shape_mouse._origin.setCoordinates(p5.mouseX, p5.mouseY);
  p5.fill(p5.color("green"));
  shape_target.draw();
  test_col();
  shape_mouse.draw();
};

const mousePressed = () => {
  swap_shape();
};

const test_col = function () {
  let doesCollide = false;
  if (shape_mouse instanceof AABB) {
    if (shape_target instanceof AABB) {
      doesCollide = CollisionTests.AABB_AABB(shape_mouse, shape_target);
    } else if (shape_target instanceof OBB) {
      doesCollide = CollisionTests.AABB_OBB(shape_mouse, shape_target);
    } else if (shape_target instanceof Circle) {
      doesCollide = CollisionTests.AABB_Circle(shape_mouse, shape_target);
    }
  } else if (shape_mouse instanceof OBB) {
    if (shape_target instanceof AABB) {
      doesCollide = CollisionTests.AABB_OBB(shape_target, shape_mouse);
    } else if (shape_target instanceof OBB) {
      doesCollide = CollisionTests.OBB_OBB(shape_mouse, shape_target);
    } else if (shape_target instanceof Circle) {
      //doesCollide = CollisionTests.AABB_AABB(shape_mouse, shape_target);
      doesCollide = false;
    }
  } else if (shape_mouse instanceof Circle) {
    if (shape_target instanceof AABB) {
      doesCollide = CollisionTests.AABB_Circle(shape_target, shape_mouse);
    } else if (shape_target instanceof OBB) {
      //doesCollide = CollisionTests.AABB_AABB(shape_mouse, shape_target);
      doesCollide = false;
    } else if (shape_target instanceof Circle) {
      doesCollide = CollisionTests.Circle_Circle(shape_mouse, shape_target);
    }
  }
  if (doesCollide) {
    p5.fill(p5.color("red"));
  }
};

const swap_shape = function () {
  if (shape_mouse instanceof AABB) {
    shape_mouse = new OBB(
      new Vector2(p5.mouseX, p5.mouseY),
      50,
      90,
      Math.PI / 3
    );
  } else if (shape_mouse instanceof OBB) {
    shape_mouse = new Circle(new Vector2(p5.mouseX, p5.mouseY), 70);
  } else if (shape_mouse instanceof Circle) {
    shape_mouse = new AABB(new Vector2(p5.mouseX, p5.mouseY), 60, 110);
  }
};

const reset = () => {
  shape_mouse = null;
  shape_target = null;
};

const objectCollision: Scene = { draw, setup, mousePressed, reset };

export default objectCollision;
