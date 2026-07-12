import { TegakiEngine } from "tegaki/core";
import unknown from "./tegaki_fonts/unknown/bundle.ts";

const hero = document.querySelector(".hero-text") as HTMLDivElement;
const heroCaption = document.querySelector(".hero-caption") as HTMLSpanElement;
const header = document.querySelector("header") as HTMLSpanElement;

const engine = new TegakiEngine(hero, {
  text: "THOMAS STANWAY",
  font: unknown,
  time: { mode: "uncontrolled", speed: 1 },
  timing: { stagger: { advance: 0, duration: 2 } },
  // quality: { clipText: false, smoothing: false },

  onComplete: () => {
    heroCaption.classList.add("show");
    header.classList.add("show");
  },
});

engine.play();
