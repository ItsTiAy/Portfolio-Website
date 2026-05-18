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
    vec2((v.x * s.x / s.y) - (s.x * 0.5 - s.y * 0.5) / s.y, v.y),
    vec2(v.x, v.y * (s.y / s.x) - (s.y * 0.5 - s.x * 0.5) / s.x),
    step(s.x, s.y)
  );
}

highp vec2 hash22(vec2 p) {
  p = fract(p * vec2(443.897, 441.423));
  p += dot(p, p + 19.19);
  return fract(vec2(p.x * p.y, p.x + p.y));
}

void main() {
  vec2 st = ratio(gl_FragCoord.xy / u_resolution, u_resolution);
  vec2 mouse = ratio(u_mouse, u_resolution);

  vec3 color = vec3(.0);

  st *= 2.;

  vec2 i_st = floor(st);
  vec2 f_st = fract(st);

  float m_dist = 10.;
  vec2 m_point;

  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 neighbour = vec2(float(i), float(j));
      vec2 point = hash22(i_st + neighbour);
      point = 0.5 + 0.5 * sin(u_time / 3.0 + 6.2831 * point);
      vec2 diff = neighbour + point - f_st;
      float dist = length(diff);

      float closer = step(dist, m_dist);
      m_dist = mix(m_dist, dist, closer);
      m_point = mix(m_point, point, closer);
    }
  }

  vec2 mouse_st = mouse * 2.;
  vec2 mouse_cell = floor(mouse_st);
  vec2 mouse_local = fract(mouse_st);

  vec2 mouse_diff = (mouse_cell - i_st) + mouse_local - f_st;
  float mouse_dist = length(mouse_diff);

  float closer = step(mouse_dist, m_dist);
  m_dist = mix(m_dist, mouse_dist, closer);
  m_point = mix(m_point, mouse, closer);

  color += m_dist;
  color = mix(u_background, u_foreground, color);

  fragColour = vec4(color, 1.0);
}
