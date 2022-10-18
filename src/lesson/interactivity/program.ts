import type p5 from "p5";

let shapeShader;
export let shaders: p5.Shader;

export const preload = (p: p5): void => {
  shaders = p.loadShader("shaders/interactivity/shader.vert", "shaders/interactivity/shader.frag");
};

export const setup = (p: p5): void => {
  // shaders require WEBGL mode to work
  p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  p.noStroke();
};

export const windowResized = (p: p5, event?: Event): void => {
  p.resizeCanvas(p.windowWidth, p.windowHeight);
};

export const draw = (p: p5): void => {
  p.background(220);

  // shader() sets the active shader with our shader
  p.shader(shaders);

  // lets send the resolution, mouse, and time to our shader
  // before sending mouse + time we modify the data so it's more easily usable by the shader
  shaders.setUniform("resolution", [p.width, p.height]);
  shaders.setUniform("mouse", p.map(p.mouseX, 0, p.width, 0, 7));
  shaders.setUniform("time", p.frameCount * 0.01);

  // rect gives us some geometry on the screen
  p.rect(0, 0, p.width, p.height);
};
