#ifdef GL_ES
precision mediump float;
#endif

// This is passed in as a uniform from the main.js file
uniform vec2 u_resolution;

 void main(){
  // position of the pixel divided by resolution, to get normalized 
  // positions on the canvas
  // jsから渡された解像度情報(createCanvasで設定したサイズ)を使い、現在の位置を
  // 0.0-1.0の正規化された情報に変換する
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  // Lets use the pixels position on the x-axis as our gradient for the red color
  // Where the position is closer to 0.0 we get black (st.x = 0.0)
  // Where the position is closer to width (defined as 1.0) we get red (st.x = 1.0)

  // ※ gl_FragColorへの代入はソースコード中で１回だけになるよう注意すること

  // 赤のみに設定する場合
  // gl_FragColor = vec4(st.x,0.0,0.0,1.0); // R,G,B,A

  // 緑のみに設定する場合
  // gl_FragColor = vec4(0.0,st.x,0.0,1.0); 

  // X位置を赤の強さに、Y位置を青の強さにする
  gl_FragColor = vec4(st.x,0.0,st.y,1.0); 
}
