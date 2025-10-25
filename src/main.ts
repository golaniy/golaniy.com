import "./style.css";
import { initScreensaver } from "./screensaver.ts";

const container = document.getElementById("screensaver-container");
if (container) {
  initScreensaver(container);
}
