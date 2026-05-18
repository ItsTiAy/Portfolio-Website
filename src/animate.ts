import { TegakiEngine } from "tegaki/core";
import oooh_baby from "./tegaki_fonts/oooh-baby/bundle.ts";

const hero = document.querySelector(".hero") as HTMLDivElement;
const contentWrapperOuter = document.querySelector(
  ".content-wrapper-outer",
) as HTMLDivElement;

const engine = new TegakiEngine(hero, {
  text: "Thomas Stanway",
  font: oooh_baby,
  time: { mode: "uncontrolled", speed: 4 },
  onComplete: () => {
    contentWrapperOuter.classList.add("expanded");
  },
});

engine.play();
