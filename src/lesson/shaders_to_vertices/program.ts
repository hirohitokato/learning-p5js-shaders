import type p5 from "p5";

let theShader: p5.Shader;
let shaderTexture: p5.Graphics;

let theta = 0;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;

export const preload = (p: p5): void => {
  // load the shader
  theShader = p.loadShader(
    "shaders/interactivity/shader.vert",
    "shaders/interactivity/shader.frag"
  );
};

export const setup = (p: p5): void => {
  // shaders require WEBGL mode to work
  p.createCanvas(710, 400, p.WEBGL);
  p.noStroke();

  // initialize the createGraphics layers
  shaderTexture = p.createGraphics(710, 400, p.WEBGL);

  // turn off the createGraphics layers stroke
  shaderTexture.noStroke();

  x = -50;
  y = 0;
};

export const draw = (p: p5): void => {
  // instead of just setting the active shader we are passing it to the createGraphics layer
  shaderTexture.shader(theShader);

  // here we're using setUniform() to send our uniform values to the shader
  theShader.setUniform("resolution", [p.width, p.height]);
  theShader.setUniform("time", p.millis() / 1000.0);
  theShader.setUniform("mouse", [p.mouseX, p.map(p.mouseY, 0, p.height, p.height, 0)]);

  // passing the shaderTexture layer geometry to render on
  shaderTexture.rect(0, 0, p.width, p.height);

  p.background(255);

  // pass the shader as a texture
  // anything drawn after this will have this texture.
  p.texture(shaderTexture);

  p.translate(-150, 0, 0);
  p.push();
  p.rotateZ(theta * p.mouseX * 0.0001);
  p.rotateX(theta * p.mouseX * 0.0001);
  p.rotateY(theta * p.mouseX * 0.0001);
  theta += 0.05;
  p.sphere(125);
  p.pop();

  /* when you put a texture or shader on an ellipse it is rendered in 3d,
     so a fifth parameter that controls the # vertices in it becomes necessary,
     or else you'll have sharp corners. setting it to 100 is smooth. */
  let ellipseFidelity = p.int(p.map(p.mouseX, 0, p.width, 8, 100));
  p.ellipse(260, 0, 200, 200, ellipseFidelity);
};
