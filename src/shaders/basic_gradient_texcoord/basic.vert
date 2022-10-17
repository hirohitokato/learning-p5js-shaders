// vert file and comments from adam ferriss
// https://github.com/aferriss/p5jsShaderExamples

// our vertex data
attribute vec3 aPosition;

// our texture coordinates
attribute vec2 aTexCoord;

// フラグメントシェーダと共有される変数
// フラグメントシェーダからバーテックスシェーダに渡すため、attribute texcoordsにvaryingをつけている
// 任意の名前を付けられるが、varyingであることを示すため`v`をプレフィックスと付けることが多い
varying vec2 vTexCoord;

void main(){
  // copy the texture coordinates
  vTexCoord = aTexCoord;

  // ポジション情報をvec4にコピー。w要素は1.0を用いる。
  // positionVec4は-1.0〜1.0の値域に収まる。
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
