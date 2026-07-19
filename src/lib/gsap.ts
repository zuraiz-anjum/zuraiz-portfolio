"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

export function registerGsap() {
  if (registered) return gsap;
  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    ScrambleTextPlugin,
    Flip,
    Observer,
    CustomEase
  );
  CustomEase.create("swift", "0.5, 0.05, 0.05, 0.99");
  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin, Flip, Observer, CustomEase };
