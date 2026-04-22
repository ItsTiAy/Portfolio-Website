import vertexSource from "./shaders/vertex.vert?raw";
import fragmentSource from "./shaders/fragment.frag?raw";

import { convertToLinear, parseRGB } from "./utils.ts";

// --- DOM ---

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const background = document.getElementById("background") as HTMLBodyElement;

const gl = canvas.getContext("webgl2");
if (!gl) throw new Error("WebGL2 not supported");

const seed = Math.random();

// --- Canvas Resize ---

function resizeCanvas(gl: WebGL2RenderingContext) {
  const dpr = window.devicePixelRatio || 1;

  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  canvas.width = Math.floor(displayWidth * dpr);
  canvas.height = Math.floor(displayHeight * dpr);

  gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", () => resizeCanvas(gl));
resizeCanvas(gl);

// --- Mouse tracking ---

const mouse = { x: 0, y: 0 };
const mouseCurrent = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = (e.clientX - rect.left) / rect.width;
  mouse.y = 1 - (e.clientY - rect.top) / rect.height;
});

// --- WebGl helpers ---

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Shader create failed");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compile error");
  }
  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vs: string,
  fs: string,
): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error("Program creation failed");

  const vertShader = compileShader(gl, gl.VERTEX_SHADER, vs);
  const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, fs);

  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "Link error");
  }

  gl.detachShader(program, vertShader);
  gl.detachShader(program, fragShader);
  gl.deleteShader(vertShader);
  gl.deleteShader(fragShader);

  return program;
}

const program = createProgram(gl, vertexSource, fragmentSource);
gl.useProgram(program);

// --- VAO ---

const vao = gl.createVertexArray();
if (!vao) throw new Error("VAO creation failed");
gl.bindVertexArray(vao);

// --- Fullscreen triangle ---

const buffer = gl.createBuffer();
if (!buffer) throw new Error("Buffer creation failed");

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([-1, -1, 3, -1, -1, 3]),
  gl.STATIC_DRAW,
);

const posLoc = gl.getAttribLocation(program, "aPosition");
gl.enableVertexAttribArray(posLoc);
gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

// --- Uniforms ---

const uResolution = gl.getUniformLocation(program, "u_resolution");
const uTime = gl.getUniformLocation(program, "u_time");
const uMouse = gl.getUniformLocation(program, "u_mouse");
const uBackground = gl.getUniformLocation(program, "u_background");
const uForeground = gl.getUniformLocation(program, "u_foreground");
const uSeed = gl.getUniformLocation(program, "u_seed");

const start = performance.now();

// --- Precompute linear colors ---

const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

function getCurrentTheme() {
  return {
    background: parseRGB(
      getComputedStyle(background).getPropertyValue("background-color"),
    ),
    foreground: parseRGB(
      getComputedStyle(canvas).getPropertyValue("background-color"),
    ),
  };
}

let currentTheme = getCurrentTheme();

let linearBackground = convertToLinear(...currentTheme.background);
let linearForeground = convertToLinear(...currentTheme.foreground);

colorSchemeQuery.addEventListener("change", () => {
  currentTheme = getCurrentTheme();
  linearBackground = convertToLinear(...currentTheme.background);
  linearForeground = convertToLinear(...currentTheme.foreground);
});

// --- Render loop ---

let lastTime = performance.now();

function render(gl: WebGL2RenderingContext) {
  const now = performance.now();
  const delta = (now - lastTime) * 0.001;
  lastTime = now;

  const elapsed = (now - start) * 0.001;

  const speed = 1 - Math.pow(0.02, delta);
  mouseCurrent.x += (mouse.x - mouseCurrent.x) * speed;
  mouseCurrent.y += (mouse.y - mouseCurrent.y) * speed;

  gl.bindVertexArray(vao);

  gl.uniform2f(uResolution, canvas.width, canvas.height);
  gl.uniform1f(uTime, elapsed);
  gl.uniform2f(uMouse, mouseCurrent.x, mouseCurrent.y);
  gl.uniform3f(
    uBackground,
    linearBackground.red,
    linearBackground.green,
    linearBackground.blue,
  );
  gl.uniform3f(
    uForeground,
    linearForeground.red,
    linearForeground.green,
    linearForeground.blue,
  );
  gl.uniform1f(uSeed, seed);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  gl.bindVertexArray(vao);

  requestAnimationFrame(() => render(gl));
}

render(gl);
