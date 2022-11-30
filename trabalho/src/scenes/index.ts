import Helpers from "../helpers";

import vectorIntersection from "./vector_intersection";
import vectorSum from "./vector_sum";
import matrixOps from "./matrix_ops";
import objectCollision from "./obj_collision";
import enclosingVolumes from "./enclosing_volumes";

export type Main = (options: { helpers: Helpers }) => void;

type SceneTitle =
  | "vectorIntersection"
  | "vectorSum"
  | "matrixOps"
  | "objectCollision"
  | "enclosingVolumes";

export type Scene = {
  draw: Main;
  setup: Main;
  mousePressed: Main;
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
    default:
      return;
  }
};

export default chooseScene;
