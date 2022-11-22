import Helpers from "../helpers";

import vectorIntersection from "./vector_intersection";
import vectorSum from "./vector_sum";

export type Main = (payload: any, options: { helpers: Helpers }) => void;

type Scene = {
  variables: () => any;
  draw: Main;
  setup?: Main;
  mousePressed: () => void;
};

const chooseScene = (scene: string): Scene => {
  switch (scene) {
    case "vectorIntersection":
      return vectorIntersection;
    case "vectorSum":
      return vectorSum;
    default:
      return;
  }
};

export default chooseScene;
