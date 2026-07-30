#version 300 es

precision highp float;
precision highp int;

uniform vec2 u_resolution;
uniform vec2 u_input;

uniform float u_time;
uniform float u_scroll;

uniform vec3 u_foreground;
uniform vec3 u_background;

float grainAmount = 0.05;

out vec4 outColor;

vec2 ratio(in vec2 v, in vec2 s) {
  return mix(
    vec2((v.x * s.x / s.y) - (s.x * 0.5 - s.y * 0.5) / s.y, v.y),
    vec2(v.x, v.y * (s.y / s.x) - (s.y * 0.5 - s.x * 0.5) / s.x),
    step(s.x, s.y)
  );
}

uint pcg_hash(uint seed) {
  uint state = seed * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}

float random(vec2 seed) {
  uint h = pcg_hash(floatBitsToUint(seed.x) + floatBitsToUint(seed.y) * 12345u);
  return float(h) / 4294967295.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 st = ratio(uv, u_resolution);

  st.y -= u_scroll;

  float d = st.y - st.x / (1.0 + u_input.x);
  float base = u_scroll + u_input.y * 0.5;

  float aa = fwidth(d) * 0.5;

  vec3 color = u_background + 0.6;
  float prevMask = 0.0;

  float bottomBand = 0.0;

  for (int i = 0; i < 5; i++) {
    float edge = -0.2 - 0.1 * float(i) + base / pow(2.0, float(i));
    float mask = smoothstep(edge - aa, edge + aa, d);
    float band = clamp(mask - prevMask, 0.0, 1.0);
    color = mix(color, u_background + 0.1 * float(i + 1), band);

    bottomBand += band * (1.0 - step(0.5, float(i)));

    prevMask = mask;
  }

  color += (random(gl_FragCoord.xy) - 0.5) * grainAmount * bottomBand;

  outColor = vec4(color, 1.0);
}
