// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision mediump float;
#endif

// This “vec3 aPosition” is a built in shader functionality. You must keep that naming.
// It automatically gets the position of every vertex on your canvas

attribute vec3 aPosition;

// We always must do at least one thing in the vertex shader:
// tell the pixel where on the screen it lives:
void main() {

  vec4 positionVec4 = vec4(aPosition, 1.0); // Copy the position data into a vec4, adding 1.0 as the w parameter

  positionVec4.xy = positionVec4.xy * 2.0 - 1.0; // Scale to make the output fit the canvas. 

  gl_Position = positionVec4;

}
