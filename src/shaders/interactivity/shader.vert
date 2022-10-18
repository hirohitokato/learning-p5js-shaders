// vert file and comments from adam ferriss
// https://github.com/aferriss/p5jsShaderExamples

attribute vec3 aPosition;
attribute vec2 aTexCoord;

void main() {

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // 矩形を２倍して画面中央に移動。そうしないと下左のコーナーにスケッチの中央が移動してしまう。
  // なおここでの矩形とは `p.rect(0, 0, p.width, p.height);`で記述した矩形のこと
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // 頂点情報をフラグメントシェーダに送信
  gl_Position = positionVec4;
}
