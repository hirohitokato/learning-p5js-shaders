import p5 from "p5";

export let shaders: p5.Shader;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;


export const preload = (p:p5) => void {
  // load the shader
  shaders = p.loadShader('texture.vert','texture.frag');
}

export const setup = (p:p5) => void {
  // shaders require WEBGL mode to work
  p.createCanvas(710, 400, p.WEBGL);
  p.noStroke();

  // initialize the createGraphics layers
  shaderTexture = createGraphics(710, 400, WEBGL);

  // turn off the createGraphics layers stroke
  shaderTexture.noStroke();

   x = -50;
   y = 0;
}

export const draw = (p:p5) => {

  // instead of just setting the active shader we are passing it to the createGraphics layer
  p.shaderTexture.shader(p.shader);

  // here we're using setUniform() to send our uniform values to the shader
  shader.setUniform("resolution", [width, height]);
  shader.setUniform("time", millis() / 1000.0);
  shader.setUniform("mouse", [p.mouseX, p.map(p.mouseY, 0, p.height, p.height, 0)]);

  // passing the shaderTexture layer geometry to render on
  shaderTexture.rect(0,0,p.width,p.height);

  p.background(255);
  
  // pass the shader as a texture
  // anything drawn after this will have this texture.
  texture(shaderTexture);
  
  translate(-150, 0, 0);
  push();
  rotateZ(theta * mouseX * 0.0001);
  rotateX(theta * mouseX * 0.0001);
  rotateY(theta * mouseX * 0.0001);  
  theta += 0.05;
  sphere(125);
  pop();
  
  /* when you put a texture or shader on an ellipse it is rendered in 3d,
     so a fifth parameter that controls the # vertices in it becomes necessary,
     or else you'll have sharp corners. setting it to 100 is smooth. */
  let ellipseFidelity = int(map(mouseX, 0, width, 8, 100));
  ellipse(260, 0, 200, 200, ellipseFidelity);
}
