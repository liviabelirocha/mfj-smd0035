import vectorIntersection from "./vector_intersection";

export default (scene: string) => {
  switch (scene) {
    case "vectorIntersection":
      return vectorIntersection;
    default:
      return;
  }
};
