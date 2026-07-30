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
import "./animate.ts";

let theme: {
  background: [number, number, number];
  foreground: [number, number, number];
};

// --- Set copyright date

const dateElement = document.getElementById("copyright-year");

if (dateElement) dateElement.textContent = new Date().getFullYear().toString();

// ---

const backgroundColour = document.querySelector(
  ".background-colour",
) as HTMLParagraphElement;

const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

function updateColours(isDark: boolean) {
  backgroundColour.textContent = isDark
    ? "No. 88 - Sapphire - #293f76"
    : "No. 1 - White - #e8dcba";

  theme = updateTheme();
}

darkModeQuery.addEventListener("change", (e) => updateColours(e.matches));

const backgroundColourContainer = document.querySelector(
  ".header-left",
) as HTMLDivElement;

const backgroundColourTooltip = document.querySelector(
  ".header-left .tooltiptext",
) as HTMLDivElement;

backgroundColourContainer.addEventListener("click", function () {
  let current = darkModeQuery.matches ? "#293f76" : "#e8dcba";

  navigator.clipboard.writeText(current);
  backgroundColourTooltip.style.opacity = "1";

  setTimeout(function () {
    backgroundColourTooltip.style.opacity = "0";
  }, 1000);
});

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

updateColours(darkModeQuery.matches);

function getVerticalScrollRatio() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const maxScrollTop = scrollHeight - clientHeight;

  if (maxScrollTop <= 0) return 0;

  return scrollTop / maxScrollTop;
}

function updateTheme() {
  return {
    background: getComputedColourStyle(
      getComputedStyle(background).getPropertyValue("background-color"),
    ),
    foreground: getComputedColourStyle(
      getComputedStyle(canvas).getPropertyValue("background-color"),
    ),
  };
}

let lastTime: number | null = null;

function render(time: number) {
  if (lastTime !== null) {
    const dt = (time - lastTime) / 1000;
    inputManager.update(dt);
  }

  lastTime = time;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resized = twgl.resizeCanvasToDisplaySize(canvas, dpr);

  if (resized) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

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
