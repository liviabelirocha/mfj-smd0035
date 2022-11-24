import Helpers from "../helpers";

import vectorIntersection from "./vector_intersection";
import vectorSum from "./vector_sum";
import matrixOps from "./matrix_ops";

export type Main = (payload: any, options: { helpers: Helpers }) => void;

type SceneTitle = "vectorIntersection" | "vectorSum" | "matrixOps";

export type Scene = {
  draw: Main;
  setup: Main;
  mousePressed: () => void;
};

const chooseScene = (scene: SceneTitle): Scene => {
  switch (scene) {
    case "vectorIntersection":
      return vectorIntersection;
    case "vectorSum":
      return vectorSum;
    case "matrixOps":
      return matrixOps;
    default:
      return;
  }
};

export default chooseScene;
