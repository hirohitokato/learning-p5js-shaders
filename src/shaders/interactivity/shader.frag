// this is a modification of a shader by adam ferriss
// https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/5_shapes/5-3_polygon

precision mediump float;

// these are known as preprocessor directive
// essentially we are just declaring some variables that wont change
// you can think of them just like const variables

#define PI 3.14159265359
#define TWO_PI 6.28318530718

// we need the sketch resolution to perform some calculations
uniform vec2 resolution;
uniform float time;
uniform float mouse;

// 0-255で色指定すると0.0〜1.0からなるvec3を作って返す
vec3 rgb(float r, float g, float b){
  return vec3(r / 255.0, g / 255.0, b / 255.0);
}

/**
  x: 中心(x)
  y: 中心(y)
 */
vec4 poly(float x, float y, float size, float sides, float rotation, vec3 col){
  // 現在のピクセル座標を取得
  vec2 coord = gl_FragCoord.xy;

  // move the coordinates to where we want to draw the shape
  vec2 pos = vec2(x,y) - coord;

  // calculate the angle of a pixel relative to our position
  float angle = atan( pos.x, pos.y) + PI + rotation;

  // calculate the size of our shape
  float radius = TWO_PI / sides;

  // this is the function that controls our shapes appearance
  // i pulled it from the book of shaders shapes page https://thebookofshaders.com/07/
  // essentially what we are doing here is computing a circle with length(pos) and manipulating it's shape with the cos() function
  // this technique is really powerful and can be used to create all sorts of different shapes
  // for instance, try changing cos() to sin()
  float d = cos(floor(0.5 + angle / radius) * radius - angle) * length(pos);

  // restrict our shape to black and white and set it's size
  // we use the smoothstep function to get a nice soft edge 
  d = 1.0 - smoothstep(size*0.5, size*0.5+1.0, d);

  // return the color with the shape as the alpha channel
  return vec4(col, d);
}


void main() {

  // ※ここが2.0だと図形が右上に移動してしまっていた。Retinaディスプレイの問題？
  //  …でもなさそう。`p.pixelDensity(1);`を付けたら悪化した。
  vec2 center = resolution * 1.0; // draw the shape at the center of the screen
  // vec2 center = resolution * 2.0; // draw the shape at the center of the screen
  float size = resolution.y * 0.5; // make the shape a quarter of the screen height
  // 多角形の各数(3-10で緩やかに変化する)
  float sides = mod(floor(mouse), 7.0) + 3.0; // slowly increase the sides, when it reaches 10 sides, go back down to 3
  float rotation = time; // rotation is in radians, but for time it doesnt really matter
  /* 時間を渡すことで経時変化を実現している */

  // lets make our shape in the center of the screen. We have to subtract half of it's width and height just like in p5
  float x = center.x ;
  float y = center.y ;

  // a color for the shape 
  vec3 grn = rgb(200.0, 240.0, 200.0);

  // call our shape function with poly(x, y, sz, sides, rotation, color);
  vec4 poly = poly(center.x , center.y, size, sides, rotation, grn);

  // mix the polygon with the opposite of the green color according to the shapes alpha
  poly.rgb = mix(1.0 - grn, poly.rgb, poly.a);

  // render to screen
  gl_FragColor = vec4(poly.rgb, 1.0);
}
