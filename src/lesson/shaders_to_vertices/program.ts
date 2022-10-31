// in this example we will send a value from our p5 sketch to the shader
// these values are called "uniform" variables
// we will use p5's setUniform function to make this happen
// https://p5js.org/reference/#/p5.Shader/setUniform

import p5 from "p5";

// a shader variable
export let theShader: p5.Shader;
let shaderBg: p5.Graphics;

let x: number;
let y: number;
let outsideRadius = 160;
let insideRadius = 80;

export const preload = (p: p5): void => {
  // load the shader
  theShader = p.loadShader(
    "shaders/shaders_to_vertices/shader.vert",
    "shaders/shaders_to_vertices/shader.frag"
  );
};

export const setup = (p: p5): void => {
  // shaders require WEBGL mode to work
  p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  p.noStroke();

  // initialize the createGraphics layers
  shaderBg = p.createGraphics(p.windowWidth, p.windowHeight, p.WEBGL);

  // turn off the cg layers stroke
  shaderBg.noStroke();

  x = 0;
  y = 0;
};

export const draw = (p: p5): void => {
  // shader() sets the active shader with our shader
  // instead of just setting the active shader we are passing it to the shaderBg graphic
  shaderBg.shader(theShader);

  // here we're using setUniform() to send our uniform values to the shader
  // set uniform is smart enough to figure out what kind of variable we are sending it,
  // so there's no need to cast (unlike processing)
  theShader.setUniform("u_resolution", [p.width, p.height]);
  theShader.setUniform("u_time", p.millis() / 1000.0);
  theShader.setUniform("u_mouse", [p.mouseX, p.map(p.mouseY, 0, p.height, p.height, 0)]);

  // rect gives us some geometry on the screen
  // passing the shaderBg graphic geometry to render on
  shaderBg.rect(0, 0, p.width, p.height);

  p.background(255);
  p.texture(shaderBg);

  p.push();

  let numPoints = p.int(p.map(p.mouseX, 0, p.width, 3, 30));
  let angle = 0;
  let angleStep = 180.0 / numPoints;

  console.log(numPoints);

  p.beginShape(p.TRIANGLE_STRIP);
  for (let i = 0; i <= numPoints; i++) {
    let px = x + p.cos(p.radians(angle)) * outsideRadius;
    let py = y + p.sin(p.radians(angle)) * outsideRadius;

    let u1, v1, u2, v2;
    // console.log(px, -250, 250, 0, 1);

    u1 = p.map(px, -250, 250, 0, 1);
    v1 = p.map(py, -250, 250, 0, 1);

    angle += angleStep;
    p.vertex(px, py, u1, v1);
    px = x + p.cos(p.radians(angle)) * insideRadius;
    py = y + p.sin(p.radians(angle)) * insideRadius;

    u2 = p.map(px, -250, 250, 0, 1);
    v2 = p.map(py, -250, 250, 0, 1);

    p.vertex(px, py, u2, v2);
    angle += angleStep;
  }
  p.endShape();
  p.pop();
};

export const windowResized = (p: p5): void => {
  p.resizeCanvas(p.windowWidth, p.windowHeight);
};
