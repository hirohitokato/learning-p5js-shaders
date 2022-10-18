precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

void main(){
  // テクスチャ座標をコピー
  // we can use it to access every pixel on the screen
  vec2 coord = vTexCoord;
  
  // x values for red, y values for green, both for blue
  gl_FragColor = vec4(coord.x, coord.y, (coord.x+coord.y), 1.0 );
}
