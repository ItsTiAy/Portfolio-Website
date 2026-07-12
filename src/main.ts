import * as twgl from "twgl.js";
import feather from "feather-icons";

feather.replace();

import { inputManager } from "./inputManager.ts";
import { getComputedColourStyle } from "./utils.ts";

import "./styles/reset.css";
import "./styles/style.css";
import "./custom_icons.css";
import "./loadData.ts";
import "devicon/devicon.min.css";
// import "./shader.ts";
import "./animate.ts";
// import "./debug.ts";

// --- Set copyright date

const dateElement = document.getElementById("copyright-year");

if (dateElement) dateElement.textContent = new Date().getFullYear().toString();

// ---

const backgroundColour = document.querySelector(
  ".background-colour",
) as HTMLParagraphElement;
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

function updateText(isDark: boolean) {
  backgroundColour.textContent = isDark
    ? "No. 88 - Sapphire - #293f76"
    : "No. 1 - White";
}

updateText(darkModeQuery.matches);
darkModeQuery.addEventListener("change", (e) => updateText(e.matches));

// --- Setup background shader

import vs from "./shaders/vertex.vert?raw";
import fs from "./shaders/fragment.frag?raw";

const canvas = document.querySelector("#shader") as HTMLCanvasElement;
const background = document.querySelector("#background") as HTMLBodyElement;
const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

if (!gl) throw new Error("WebGL2 not supported");

const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

const arrays = {
  a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};

const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

let theme = {
  background: getComputedColourStyle(
    getComputedStyle(background).getPropertyValue("background-color"),
  ),
  foreground: getComputedColourStyle(
    getComputedStyle(canvas).getPropertyValue("background-color"),
  ),
};

function getVerticalScrollRatio() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const maxScrollTop = scrollHeight - clientHeight;

  if (maxScrollTop <= 0) return 0;

  return scrollTop / maxScrollTop;
}

let lastTime: number | null = null;

function render(time: number) {
  if (lastTime !== null) {
    const dt = (time - lastTime) / 1000;
    inputManager.update(dt);
  }

  lastTime = time;

  twgl.resizeCanvasToDisplaySize(canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const uniforms = {
    u_time: time * 0.001,
    u_resolution: [canvas.width, canvas.height],
    u_input: [inputManager.state.x, inputManager.state.y],
    u_background: [...theme.background],
    u_foreground: [...theme.foreground],
    u_scroll: getVerticalScrollRatio(),
  };

  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);

window.addEventListener("load", () => {
  background.classList.remove("preload");
});

/*
window.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".card");
  elements.forEach((element: HTMLDivElement) => {
    const originalWidth = element.offsetWidth;
    const newWidth = originalWidth + 190;
    const scaleFactor = newWidth / originalWidth;

    element.style.setProperty("--scale-factor", scaleFactor.toString());
  });
});
*/
