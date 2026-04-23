#version 300 es

precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform float u_time;
uniform float u_seed;

uniform vec3 u_foreground;
uniform vec3 u_background;

out vec4 fragColour;

vec2 ratio(in vec2 v, in vec2 s) {
  return mix(
    vec2((v.x * s.x / s.y) - (s.x * .5 - s.y * .5) / s.y, v.y),
    vec2(v.x, v.y * (s.y / s.x) - (s.y * .5 - s.x * .5) / s.x),
    step(s.x, s.y)
  );
}

void main() {
  vec2 relativeInput = ratio(u_mouse, u_resolution);
  vec2 st = ratio(gl_FragCoord.xy / u_resolution, u_resolution) - relativeInput;

  vec3 finalColour = vec3(st, 0.0);

  fragColour = vec4(finalColour, 1.0);
}
