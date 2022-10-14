// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision mediump float;
#endif

// This “vec3 aPosition” is a built in shader functionality. You must keep that naming.
// It automatically gets the position of every vertex on your canvas
// Attributeは頂点ごとのパラメータであり、バーテックスシェーダでのみ扱われる
attribute vec3 aPosition;

// .tsのp.setUniform()で渡すことのできる定数
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// We always must do at least one thing in the vertex shader:
// tell the pixel where on the screen it lives:
void main() {

  // Copy the position data into a vec4, adding 1.0 as the w parameter
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // Scale to make the output fit the canvas. 
  positionVec4.xy = positionVec4.xy * 1.0 - 1.0 + (u_mouse.x / 500.0);

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;

}
