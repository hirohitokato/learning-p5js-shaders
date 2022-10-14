import type p5 from "p5";
import { shaders } from "./setup";

/** This is a draw function. */
export const draw = (p: p5): void => {
  p.background(220);
  p.shader(shaders);
  p.rect(0, 0, p.width / 2, p.height / 2);
};
