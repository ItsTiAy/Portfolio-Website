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
  vec2 st = ratio(gl_FragCoord.xy / u_resolution, u_resolution) - 0.5;
  vec2 relativeMouse = ratio(u_mouse, u_resolution);

  float mask = step(length(st), 0.5);

  float angle = atan(st.y, st.x);

  vec3 uvColor = 0.5 + 0.5 * cos(angle + vec3(0, 2, 4) + relativeMouse.x);

  vec3 finalColour = uvColor * mask;

  fragColour = vec4(finalColour, 1.0);
}
