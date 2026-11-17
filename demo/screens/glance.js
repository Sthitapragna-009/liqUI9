// Glanceable: a Dynamic Island that morphs compact / expanded / minimal, a lock-screen Live
// Activity with delivery steps, a weather widget with UV / AQI / next-hour gauges, and a watch
// whose crown scrolls a stack of complications. MIT, (c) 2026 KSP.
import { C, tile, segHTML, segmented, glass, ring, ico, clamp, press, spring, $, $$ } from "./lib.js";

const STEPS = ["Ordered", "Preparing", "On the way", "Delivered"];
const ETA = [24, 18, 9, 0];
const GAUGES = [
  { k: "UV", v: 0.64, val: "7", lab: "High", c: C.orange, note: "UV 7, high until 4 pm. Shade and sunscreen." },
  { k: "AQI", v: 0.42, val: "84", lab: "Fair", c: C.yellow, note: "Air quality 84, fair. Fine for most outdoor activity." },
  { k: "NEXT", v: 0.2, val: "20%", lab: "Rain", c: C.cyan, note: "20% chance of rain in the next hour." },
];

export default {
  id: "glance", name: "Glanceable", color: C.purple,
  sub: "Morph the Dynamic Island, advance the delivery, tap the weather gauges, turn the watch crown.",
  mount(grid) {
    grid.innerHTML = [
      tile({ span: 7, label: "Live Activity", icon: "truck", color: C.green, ux: "island; compact → expanded", body: `
        <div class="gl-phone"><div class="gl-wall"></div>
          <button class="gl-island is-compact" aria-label="Delivery live activity. Click to expand.">
            <span class="gl-c"><span class="gl-ci" style="color:${C.green}">${ico("bag", 16)}</span><b class="gl-eta" data-eta>18 min</b></span>
            <span class="gl-x"><span class="hstack between" style="width:100%"><span class="hstack" style="gap:8px"><span class="gl-ci gl-big" style="color:${C.green}">${ico("bag", 20)}</span><span style="text-align:left"><b>Kirana Mart</b><span class="gl-xs" data-st>Preparing your order</span></span></span><b class="gl-eta2" data-eta2>18 min</b></span>
              <span class="gl-prog"><i data-prog></i></span><span class="gl-xs" style="align-self:flex-start">Arjun · KA 05 MX 2231</span></span>
          </button>
          <span class="gl-min" aria-hidden="true"><span style="color:${C.green}">${ico("bag", 14)}</span></span>
          <div class="gl-ptime">9:41</div>
        </div>
        <div style="display:grid;justify-items:center;margin-top:12px">${segHTML(["Compact", "Expanded", "Minimal"], 0, "gl-iseg")}</div>` }),
      tile({ span: 5, label: "Lock Screen", icon: "lock", color: C.blue, ux: "progress; steps", body: `
        <div class="gl-lock"><div class="gl-ltime"><span class="mut2" style="color:rgb(255 255 255 / .8)">Monday 17 November</span><b>9:41</b></div>
          <div class="gl-la"><div class="hstack between"><span class="hstack" style="gap:8px"><span style="color:${C.green}">${ico("bag", 18)}</span><b>Kirana Mart</b></span><b data-eta3>18 min</b></div>
            <div class="gl-steps">${STEPS.map((s, i) => `<span class="gl-step" data-i="${i}"><i></i><span>${s}</span></span>`).join("")}<span class="gl-line"><i data-line></i></span></div></div>
        </div>
        <div class="hstack" style="justify-content:center;margin-top:12px"><button class="btn btn--gray gl-adv">Advance delivery</button></div>` }),
      tile({ span: 4, label: "Weather", icon: "sun", color: C.cyan, ux: "glanceable; gauges", body: `
        <div class="gl-wx"><div class="hstack between"><div><b style="font-size:var(--t-footnote)">Bengaluru</b><div style="font:300 46px/1 var(--font-display)">31°</div></div><span style="color:${C.yellow}">${ico("sun", 34)}</span></div>
          <div class="mut2" style="color:rgb(255 255 255 / .85)">Mostly sunny · H 32° L 21°</div>
          <div class="gl-gs">${GAUGES.map((g, i) => `<button class="gl-g" data-i="${i}" aria-pressed="false" aria-label="${g.k} ${g.val} ${g.lab}">${ring({ v: g.v, c: g.c, value: g.val, label: g.k, size: 64, sw: 6 })}</button>`).join("")}</div>
          <div class="gl-note" data-note>Tap a gauge.</div></div>` }),
      tile({ span: 8, label: "Watch", icon: "timer", color: C.orange, ux: "complications; watch", body: `
        <div class="gl-wwrap">
          <div class="gl-watch"><div class="gl-wscreen">
            <div class="gl-wtop"><span class="gl-wt">10:09</span></div>
            <div class="gl-stack"></div>
          </div><div class="gl-crown" role="slider" tabindex="0" aria-label="Digital crown. Drag up or down, or use the arrow keys." aria-valuemin="0" aria-valuemax="2"><i></i></div><div class="gl-side"></div></div>
          <div class="vstack" style="max-width:260px"><b>Turn the crown</b><span class="mut">Drag the crown up or down, scroll over the watch, or use the arrow keys. The stack moves one card at a time and rubber-bands at the ends.</span></div>
        </div>` }),
    ].join("");

    /* ---------- Dynamic Island + lock screen share one delivery ---------- */
    const la = grid.children[0], island = $(".gl-island", la), mini = $(".gl-min", la), lk = grid.children[1];
    let step = 1, imode = 0;
    const setIsland = (m) => {
      imode = m; island.classList.toggle("is-compact", m === 0); island.classList.toggle("is-exp", m === 1); island.classList.toggle("is-minimal", m === 2);
      mini.classList.toggle("is-on", m === 2); island.setAttribute("aria-expanded", String(m === 1));
    };
    const iseg = segmented($(".gl-iseg", la), (i) => setIsland(i));
    island.addEventListener("click", () => iseg.select(imode === 1 ? 0 : 1));
    const setStep = (s) => {
      step = s; const eta = ETA[s] ? `${ETA[s]} min` : "Arrived";
      ["[data-eta]", "[data-eta2]"].forEach((q) => { $(q, la).textContent = eta; }); $("[data-eta3]", lk).textContent = eta;
      $("[data-st]", la).textContent = ["Order placed", "Preparing your order", "Arjun is on the way", "Delivered. Enjoy!"][s];
      $("[data-prog]", la).style.width = `${(s / 3) * 100}%`; $("[data-line]", lk).style.width = `${(s / 3) * 100}%`;
      $$(".gl-step", lk).forEach((n, i) => { n.classList.toggle("is-done", i <= s); n.classList.toggle("is-cur", i === s); });
      $(".gl-adv", lk).textContent = s === 3 ? "Start over" : "Advance delivery";
      island.animate([{ transform: "translateX(-50%) scale(1.06)" }, { transform: "translateX(-50%)" }], { duration: 380, easing: "cubic-bezier(.2,.9,.3,1.4)" });
    };
    const la2 = $(".gl-la", lk); glass(la2, { variant: "regular", radius: 22 });
    $(".gl-adv", lk).addEventListener("click", () => setStep(step === 3 ? 0 : step + 1));
    setStep(1);

    /* ---------- Weather ---------- */
    const wx = grid.children[2];
    glass($(".gl-wx", wx), { variant: "clear", dim: 0.1, radius: 22 });
    let gsel = -1;
    const pickG = (i) => {
      gsel = gsel === i ? -1 : i;
      $$(".gl-g", wx).forEach((b, j) => b.setAttribute("aria-pressed", String(j === gsel)));
      const n = $("[data-note]", wx); n.textContent = gsel < 0 ? "Tap a gauge." : GAUGES[gsel].note;
      n.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 260 });
    };
    $$(".gl-g", wx).forEach((b, i) => b.addEventListener("click", () => pickG(i)));

    /* ---------- Watch: crown scrolls a stack ---------- */
    const wt = grid.children[3], stack = $(".gl-stack", wt), crown = $(".gl-crown", wt), watch = $(".gl-watch", wt);
    const CARDS = [
      () => `<div class="gl-card"><div class="hstack" style="gap:5px">${ring({ v: 0.64, c: C.orange, value: "7", label: "UV", size: 42, sw: 5 })}${ring({ v: 0.42, c: C.yellow, value: "84", label: "AQI", size: 42, sw: 5 })}${ring({ v: 0.78, c: C.green, value: "78", label: "%", size: 42, sw: 5 })}</div><span class="gl-ws">Weather · Battery</span></div>`,
      () => `<div class="gl-card"><div class="hstack" style="gap:8px"><span style="color:${C.green}">${ico("bag", 20)}</span><b data-wd>${ETA[step] ? `${ETA[step]} min` : "Arrived"}</b></div><span class="gl-wbar"><i style="width:${(step / 3) * 100}%"></i></span><span class="gl-ws">Kirana Mart · ${STEPS[step]}</span></div>`,
      () => `<div class="gl-card"><div class="hstack" style="gap:8px"><span style="color:${C.orange}">${ico("timer", 20)}</span><b>04:59</b></div><span class="gl-ws">Tea timer</span></div>`,
    ];
    let pos = 0, cancel = () => {}, idx = 0;
    stack.innerHTML = CARDS.map((c) => c()).join("");
    const layout = (p) => {
      pos = p;
      [...stack.children].forEach((c, i) => { const d = i - p; c.style.transform = `translateY(${d * 92}px) scale(${1 - Math.min(0.18, Math.abs(d) * 0.12)})`; c.style.opacity = String(clamp(1 - Math.abs(d) * 0.55, 0, 1)); });
      crown.querySelector("i").style.transform = `translateY(${(-p * 14) % 14}px)`;
    };
    const snap = (i, v = 0) => { idx = clamp(i, 0, 2); crown.setAttribute("aria-valuenow", idx); cancel(); stack.innerHTML = CARDS.map((c) => c()).join(""); layout(pos); cancel = spring(pos, idx, layout, { response: 0.42, damping: 0.82, velocity: v }); };
    const rubber = (p) => (p < 0 ? -0.35 * (1 - Math.exp(p)) : p > 2 ? 2 + 0.35 * (1 - Math.exp(2 - p)) : p);
    let dragY = null, p0 = 0, lastY = 0, lastT = 0, vel = 0;
    crown.addEventListener("pointerdown", (e) => { crown.setPointerCapture(e.pointerId); cancel(); dragY = e.clientY; p0 = pos; lastY = e.clientY; lastT = e.timeStamp; crown.classList.add("is-on"); });
    crown.addEventListener("pointermove", (e) => { if (dragY === null) return; const dt = Math.max(1, e.timeStamp - lastT); vel = ((lastY - e.clientY) / 70) / (dt / 1000); lastY = e.clientY; lastT = e.timeStamp; layout(rubber(p0 + (dragY - e.clientY) / 70)); });
    const up = () => { if (dragY === null) return; dragY = null; crown.classList.remove("is-on"); snap(Math.round(pos + clamp(vel * 0.12, -1, 1)), vel); };
    crown.addEventListener("pointerup", up); crown.addEventListener("pointercancel", up);
    crown.addEventListener("keydown", (e) => { const d = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -1, ArrowRight: 1 }[e.key]; if (d) { e.preventDefault(); snap(idx + d); } });
    let wheelT = 0;
    watch.addEventListener("wheel", (e) => { e.preventDefault(); const now = performance.now(); if (now - wheelT < 350) return; wheelT = now; snap(idx + Math.sign(e.deltaY)); }, { passive: false });
    layout(0);
    $(".gl-adv", lk).addEventListener("click", () => snap(idx));

    return {
      async play(tok, d) {
        await d.wait(tok, 300); iseg.select(1); await d.wait(tok, 1500); iseg.select(2); await d.wait(tok, 1200); iseg.select(0); await d.wait(tok, 700);
        for (let s = 2; s <= 3; s++) { await press($(".gl-adv", lk)); setStep(s); snap(idx); await d.wait(tok, 1100); }
        setStep(1); iseg.select(1); await d.wait(tok, 1200); iseg.select(0);
        for (const i of [0, 1, 2]) { pickG(i); await d.wait(tok, 900); } pickG(2);
        crown.classList.add("is-on"); for (const i of [1, 2, 1, 0]) { snap(i); await d.wait(tok, 900); } crown.classList.remove("is-on");
      },
    };
  },
};
