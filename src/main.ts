import p5 from "p5";
import { createSketch } from "./p5-util/sketch";
import { preload, setup, windowResized, draw } from "./lesson/basic_gradient_texcoord/program";

const sketch = createSketch({
  preload,
  setup,
  draw,
  windowResized,
});

new p5(sketch);
