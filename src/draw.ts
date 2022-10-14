import type p5 from "p5";
import { shaders } from "./setup";

/** This is a draw function. */
export const draw = (p: p5): void => {
  p.background(220);
  // シェーダーに値を送れる
  shaders.setUniform("u_resolution", [p.width, p.height]);
  // we divide millis by 1000 to convert it to seconds
  shaders.setUniform("u_time", p.millis() / 1000.0);
  // we flip Y so it's oriented properly in our shader
  shaders.setUniform("u_mouse", [p.mouseX, p.map(p.mouseY, 0, p.height, p.height, 0)]);

  p.shader(shaders);
  p.rect(0, 0, p.width / 2, p.height / 2);
};
