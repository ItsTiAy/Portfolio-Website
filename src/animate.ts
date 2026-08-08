import { TegakiEngine } from "tegaki/core";
import quicksand from "./tegaki_fonts/quicksand/bundle.ts";

const hero = document.querySelector(".hero-text") as HTMLDivElement;
const heroCaption = document.querySelector(".hero-caption") as HTMLSpanElement;
const header = document.querySelector("header") as HTMLSpanElement;

const engine = new TegakiEngine(hero, {
  text: "THOMAS STANWAY",
  font: quicksand,
  time: { mode: "uncontrolled", speed: 1 },
  timing: { stagger: { advance: 0, duration: 2 } },
  // quality: { clipText: 1.5 },

  onComplete: () => {
    heroCaption.classList.add("show");
    header.classList.add("show");
  },
});

engine.play();
