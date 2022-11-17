import Helpers from "../helpers";

import vectorIntersection from "./vector_intersection";

export type Draw = (payload: any, options: { helpers: Helpers }) => void;

export default (scene: string) => {
  switch (scene) {
    case "vectorIntersection":
      return vectorIntersection;
    default:
      return;
  }
};
