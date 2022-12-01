import Helpers from "../helpers";

import vectorIntersection from "./vector_intersection";
import vectorSum from "./vector_sum";
import matrixOps from "./matrix_ops";
import objectCollision from "./collision";
import enclosingVolumes from "./enclosing_volumes";
import pointBelongs from "./point_belongs";

export type Main = (options: { helpers: Helpers }) => void;

export type SceneTitle =
  | "vectorIntersection"
  | "vectorSum"
  | "matrixOps"
  | "objectCollision"
  | "enclosingVolumes"
  | "pointBelongs";

export type Scene = {
  draw: Main;
  setup: Main;
  mousePressed: Main;
  reset: () => void;
  mouseDragged?: Main;
  mouseReleased?: Main;
};

const chooseScene = (scene: SceneTitle): Scene => {
  switch (scene) {
    case "vectorIntersection":
      return vectorIntersection;
    case "vectorSum":
      return vectorSum;
    case "matrixOps":
      return matrixOps;
    case "objectCollision":
      return objectCollision;
    case "enclosingVolumes":
      return enclosingVolumes;
    case "pointBelongs":
      return pointBelongs;
    default:
      return;
  }
};

export default chooseScene;
