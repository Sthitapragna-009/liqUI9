// liqUI9 Screens: a switcher across the seven screens of the Liquid Glass motion piece. MIT, (c) 2026 KSP.
import { glass, segmented, segHTML, director, $ } from "./lib.js";
import money from "./money.js";
import buttons from "./buttons.js";
import commerce from "./commerce.js";
import health from "./health.js";
import home from "./home.js";
import glance from "./glance.js";
import workspace from "./workspace.js";

const SCREENS = [money, buttons, commerce, health, home, glance, workspace];
const root = $("#screens");
const stage = root.querySelector(".scr-stage");
const watchBtn = root.querySelector(".scr-watch");
const d = director();
const mounted = new Map();
let cur = 0, playing = false;

root.querySelector(".scr-tabs").innerHTML = segHTML(SCREENS.map((s) => s.name), 0);
const tabs = root.querySelector(".scr-tabs .seg");
tabs.setAttribute("aria-label", "Screen");
glass(watchBtn, { variant: "regular", interactive: true });

function show(i, initial = false) {
  stop();
  cur = i;
  const s = SCREENS[i];
  stage.style.setProperty("--scr-c", s.color);
  const strip = root.querySelector(".scr-tabs"), tab = tabs.querySelectorAll("button")[i];
  strip.scrollTo({ left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2, behavior: initial ? "auto" : "smooth" });
  for (const [k, m] of mounted) m.pane.classList.toggle("is-on", k === i);
  if (!mounted.has(i)) {
    const pane = document.createElement("div");
    pane.className = "scr-pane is-on";
    pane.innerHTML = `<div class="scr-head"><h3>${s.name}</h3><p>${s.sub}</p></div><div class="scr-grid"></div>`;
    stage.appendChild(pane);
    const api = s.mount(pane.querySelector(".scr-grid")) || {};
    mounted.set(i, { pane, api });
  }
  if (!initial) history.replaceState(null, "", `#screen-${s.id}`);
}

function stop() {
  d.stop();
  playing = false;
  watchBtn.setAttribute("aria-pressed", "false");
  watchBtn.querySelector(".wt").textContent = "Watch";
}

async function watch() {
  if (playing) { stop(); return; }
  const m = mounted.get(cur);
  if (!m?.api.play) return;
  const tok = d.start();
  playing = true;
  watchBtn.setAttribute("aria-pressed", "true");
  watchBtn.querySelector(".wt").textContent = "Stop";
  try { await m.api.play(tok, d); } catch { /* cancelled */ }
  if (!tok.off) stop();
}

watchBtn.addEventListener("click", watch);
// Any real interaction inside the stage hands control back to the person.
stage.addEventListener("pointerdown", (e) => { if (playing && e.isTrusted) stop(); }, true);

const start = Math.max(0, SCREENS.findIndex((s) => location.hash === `#screen-${s.id}`));
const seg = segmented(tabs, (i) => show(i));
if (start) seg.select(start); else show(0, true);
if (start) root.scrollIntoView();
