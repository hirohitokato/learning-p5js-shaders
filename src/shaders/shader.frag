// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision mediump float;
#endif

// .tsのp.setUniform()で渡すことのできる定数
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
    // A blue color
    // In shaders, the RGB color spectrum goes from 0 - 1 instead of 0 - 255
    vec3 color = vec3(1.0 * u_mouse.x / 800.0, 0.0, 1.0);
    vec3 colorCopy = color.rgb;
    // gl_FragColor is a built in shader variable, and you .frag file must contain it
    // We are setting the vec3 color into a new vec4, with an transparency of 1 (no opacity)
    gl_FragColor = vec4(colorCopy, 0.5);
}


