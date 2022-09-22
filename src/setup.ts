import type p5 from "p5";

export let shaders: p5.Shader;

export const preload = (p: p5): void => {
  shaders = p.loadShader("shaders/shader.vert", "shaders/shader.frag");
};

export const setup = (p: p5): void => {
  p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  // p.noStroke();
};

export const windowResized = (p: p5, event?: Event): void => {
  p.resizeCanvas(p.windowWidth, p.windowHeight);
};
