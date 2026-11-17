// Home: a draggable climate dial with modes, room accessories with a brightness slider,
// energy bars with a "now" marker, and one-tap scenes that drive the room. MIT, (c) 2026 KSP.
import { C, tile, segHTML, segmented, sliderHTML, slider, glass, clamp, lerp, tween, ico, press, $, $$ } from "./lib.js";

const MODES = { Cool: C.blue, Heat: C.orange, Auto: C.green };
const ACC = [
  { k: "lights", n: "Ceiling Lights", i: "bulb" }, { k: "lamp", n: "Floor Lamp", i: "bulb" }, { k: "fan", n: "Fan", i: "fan" },
  { k: "shades", n: "Shades", i: "shades" }, { k: "lock", n: "Front Door", i: "lock" }, { k: "tv", n: "TV", i: "film" },
];
const SCENES = [
  { n: "Morning", i: "sun", c: C.orange, s: { lights: 1, lamp: 0, fan: 1, shades: 1, lock: 1, tv: 0 }, b: 0.9, t: 24 },
  { n: "Movie Time", i: "film", c: C.purple, s: { lights: 1, lamp: 1, fan: 0, shades: 0, lock: 1, tv: 1 }, b: 0.15, t: 23 },
  { n: "Away", i: "lock", c: C.blue, s: { lights: 0, lamp: 0, fan: 0, shades: 0, lock: 1, tv: 0 }, b: 0.6, t: 28 },
  { n: "Good Night", i: "moon", c: C.indigo, s: { lights: 0, lamp: 1, fan: 1, shades: 0, lock: 1, tv: 0 }, b: 0.08, t: 22 },
];
const SOLAR = [0, 0, 0, 0, 0, 0, 0.1, 0.4, 0.9, 1.5, 2, 2.4, 2.6, 2.5, 2.2, 1.7, 1.1, 0.5, 0.1, 0, 0, 0, 0, 0];
const GRID = [0.5, 0.4, 0.4, 0.3, 0.3, 0.4, 0.8, 1.2, 0.9, 0.5, 0.3, 0.2, 0.2, 0.2, 0.3, 0.5, 0.9, 1.6, 2.1, 2.3, 2, 1.5, 1, 0.7];
const NOW = 15;

export default {
  id: "home", name: "Home", color: C.yellow,
  sub: "Drag the dial, switch modes, toggle the room, scrub energy, then run Movie Time.",
  mount(grid) {
    grid.innerHTML = [
      tile({ span: 5, label: "Climate", icon: "therm", color: C.orange, ux: "dial; target", body: `
        <div class="hm-dial" tabindex="0" role="slider" aria-label="Target temperature" aria-valuemin="16" aria-valuemax="30">
          <svg viewBox="0 0 220 220" width="220" height="220">
            <defs><linearGradient id="hm-g" x1="0" x2="1"><stop offset="0" stop-color="var(--hm-c)" stop-opacity=".45"/><stop offset="1" stop-color="var(--hm-c)"/></linearGradient></defs>
            <path class="hm-track" fill="none" stroke="var(--fill)" stroke-width="18" stroke-linecap="round"/>
            <path class="hm-fill" fill="none" stroke="url(#hm-g)" stroke-width="18" stroke-linecap="round"/>
            <g class="hm-ticks"></g>
          </svg>
          <div class="hm-knob"></div>
          <div class="hm-mid"><div class="mut2" data-mode>COOLING TO</div><div class="hm-t"><span data-t>24</span><sup>°</sup></div><div class="mut2">Currently 27°</div></div>
        </div>
        <div style="display:grid;justify-items:center;margin-top:4px">${segHTML(Object.keys(MODES), 0, "hm-mode")}</div>` }),
      tile({ span: 7, label: "Living Room", icon: "home", color: C.yellow, ux: "controls; state", body: `
        <div class="hm-acc">${ACC.map((a) => `<button class="hm-a" data-k="${a.k}" aria-pressed="false"><span class="hm-ai">${ico(a.i, 22)}</span><span><b>${a.n}</b><span class="hm-as"></span></span></button>`).join("")}</div>
        <div class="hm-bri"><span class="mut2" style="display:flex;justify-content:space-between"><span>Ceiling Lights brightness</span><span data-bri>70%</span></span>${sliderHTML("hm-bsl")}</div>` }),
      tile({ span: 7, label: "Energy", icon: "bolt", color: C.green, ux: "stacked bars; now", body: `
        <div class="hstack" style="gap:18px"><div><div class="mut2">TODAY</div><div class="num-s">31.6 kWh</div></div><div><div class="mut2" style="color:${C.yellow}">SOLAR</div><div class="num-s">17.0</div></div><div><div class="mut2" style="color:${C.cyan}">GRID</div><div class="num-s">14.6</div></div></div>
        <div class="hm-en" style="position:relative;margin-top:10px"><svg class="plot" viewBox="0 0 600 170" preserveAspectRatio="none" style="height:170px" role="img" aria-label="Energy use by hour, solar and grid"></svg><div class="glabel"><span class="gl-t"></span></div></div>
        <div class="hstack between mut2"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>` }),
      tile({ span: 5, label: "Scenes", icon: "sparkle", color: C.purple, ux: "scene; one tap", body: `
        <div class="hm-scenes">${SCENES.map((s, i) => `<button class="hm-sc" data-i="${i}" style="--c:${s.c}" aria-pressed="false"><span class="hm-si">${ico(s.i, 20)}</span><b>${s.n}</b></button>`).join("")}</div>
        <div class="mut2" data-scn style="margin-top:10px">One tap sets lights, shades, TV and temperature together.</div>` }),
    ].join("");

    /* ---------- Climate dial ---------- */
    const cl = grid.children[0], dial = $(".hm-dial", cl), knob = $(".hm-knob", cl);
    glass(knob, { variant: "clear", interactive: true });
    const A0 = (135 * Math.PI) / 180, SPAN = (270 * Math.PI) / 180, R = 92, CX = 110;
    const pt = (q) => [CX + R * Math.cos(A0 + SPAN * q), CX + R * Math.sin(A0 + SPAN * q)];
    const arc = (q0, q1) => { const [x0, y0] = pt(q0), [x1, y1] = pt(Math.max(q0 + 0.001, q1)); return `M${x0} ${y0} A${R} ${R} 0 ${SPAN * (q1 - q0) > Math.PI ? 1 : 0} 1 ${x1} ${y1}`; };
    $(".hm-track", cl).setAttribute("d", arc(0, 1));
    $(".hm-ticks", cl).innerHTML = Array.from({ length: 15 }, (_, i) => { const q = i / 14, a = A0 + SPAN * q; return `<line x1="${CX + 72 * Math.cos(a)}" y1="${CX + 72 * Math.sin(a)}" x2="${CX + 66 * Math.cos(a)}" y2="${CX + 66 * Math.sin(a)}" stroke="var(--label-3)" stroke-width="${i % 2 ? 1 : 2}"/>`; }).join("");
    let temp = 24, mode = "Cool";
    const setTemp = (t) => {
      temp = clamp(Math.round(t * 2) / 2, 16, 30); const q = (temp - 16) / 14;
      $(".hm-fill", cl).setAttribute("d", arc(0, q));
      const [x, y] = pt(q); knob.style.transform = `translate(${x - 17}px, ${y - 17}px)`;
      $("[data-t]", cl).textContent = temp % 1 ? temp.toFixed(1) : temp; dial.setAttribute("aria-valuenow", temp);
    };
    const setMode = (m) => { mode = m; dial.style.setProperty("--hm-c", MODES[m]); $("[data-mode]", cl).textContent = { Cool: "COOLING TO", Heat: "HEATING TO", Auto: "KEEPING AT" }[m]; };
    const fromPointer = (e) => {
      const r = dial.querySelector("svg").getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      let a = Math.atan2(y, x) - A0; while (a < 0) a += Math.PI * 2; let q = a / SPAN; if (q > 1) q = q > 1 + (2 * Math.PI - SPAN) / SPAN / 2 ? 0 : 1;
      setTemp(16 + q * 14);
    };
    dial.addEventListener("pointerdown", (e) => { dial.setPointerCapture(e.pointerId); dial.classList.add("is-drag"); fromPointer(e); });
    dial.addEventListener("pointermove", (e) => { if (dial.classList.contains("is-drag")) fromPointer(e); });
    dial.addEventListener("pointerup", () => dial.classList.remove("is-drag"));
    dial.addEventListener("keydown", (e) => { const d = { ArrowUp: 0.5, ArrowRight: 0.5, ArrowDown: -0.5, ArrowLeft: -0.5 }[e.key]; if (d) { e.preventDefault(); setTemp(temp + d); } });
    const animTemp = (t) => { const a = temp; return tween(700, (k) => setTemp(lerp(a, t, k))); };
    const mseg = segmented($(".hm-mode", cl), (i, v) => setMode(v));
    setMode("Cool"); requestAnimationFrame(() => setTemp(24));

    /* ---------- Living room ---------- */
    const lr = grid.children[1], st = { lights: 1, lamp: 0, fan: 0, shades: 1, lock: 1, tv: 0 };
    const bsl = slider($(".hm-bsl", lr), (p) => { $("[data-bri]", lr).textContent = `${Math.round(p * 100)}%`; paint(); }, 0.7);
    $(".hm-bsl", lr).setAttribute("aria-label", "Ceiling lights brightness");
    const paint = () => {
      $$(".hm-a", lr).forEach((b) => {
        const k = b.dataset.k, on = !!st[k];
        b.setAttribute("aria-pressed", String(on));
        $(".hm-as", b).textContent = k === "lock" ? (on ? "Locked" : "Unlocked") : k === "shades" ? (on ? "Open" : "Closed") : k === "lights" && on ? `${Math.round(bsl.value * 100)}%` : on ? "On" : "Off";
        if (k === "lock") $(".hm-ai", b).innerHTML = ico(on ? "lock" : "unlock", 22);
      });
      $(".hm-bri", lr).classList.toggle("is-off", !st.lights);
      const glow = st.lights ? bsl.value : 0;
      lr.style.setProperty("--hm-glow", String(glow));
    };
    lr.addEventListener("click", (e) => { const b = e.target.closest(".hm-a"); if (!b) return; st[b.dataset.k] = st[b.dataset.k] ? 0 : 1; clearScene(); paint(); });
    paint();

    /* ---------- Energy ---------- */
    const en = grid.children[2], esvg = $(".hm-en svg", en), ewrap = $(".hm-en", en), elab = $(".glabel", ewrap);
    glass(elab, { variant: "regular" });
    const ey = (v) => 150 - (v / 4) * 145;
    let ehi = -1;
    const drawE = () => {
      const w = 600 / 24;
      esvg.innerHTML = SOLAR.map((s, i) => { const g = GRID[i], fut = i > NOW, op = ehi >= 0 && ehi !== i ? 0.35 : fut ? 0.35 : 1;
        return `<g opacity="${op}"><rect x="${i * w + 3}" y="${ey(s + g)}" width="${w - 6}" height="${150 - ey(g)}" rx="3" fill="${C.cyan}"/>${s ? `<rect x="${i * w + 3}" y="${ey(s)}" width="${w - 6}" height="${150 - ey(s)}" rx="3" fill="${C.yellow}"/>` : ""}</g>`; }).join("") +
        `<line x1="${(NOW + 1) * w}" x2="${(NOW + 1) * w}" y1="0" y2="152" stroke="var(--label)" stroke-width="1.5" vector-effect="non-scaling-stroke"/><text x="${(NOW + 1) * w + 5}" y="12" font-size="11" font-weight="700" fill="var(--label)" font-family="system-ui">Now</text>`;
    };
    const scrubE = (f) => {
      const i = clamp(Math.floor(f * 24), 0, 23), r = esvg.getBoundingClientRect(); ehi = i; drawE();
      $(".gl-t", elab).innerHTML = `${String(i).padStart(2, "0")}:00${i > NOW ? " · forecast" : ""}<br><span style="color:${C.yellow}">●</span> ${SOLAR[i].toFixed(1)}  <span style="color:${C.cyan}">●</span> ${GRID[i].toFixed(1)} kWh`;
      elab.style.transform = `translate(${clamp(((i + 0.5) / 24) * r.width - 60, 0, r.width - 140)}px, ${Math.max(-40, (ey(SOLAR[i] + GRID[i]) / 170) * r.height - 58)}px)`;
      ewrap.classList.add("is-scrub");
    };
    const endE = () => { ehi = -1; drawE(); ewrap.classList.remove("is-scrub"); };
    const fx = (e) => { const r = esvg.getBoundingClientRect(); return (e.clientX - r.left) / r.width; };
    esvg.addEventListener("pointerdown", (e) => { esvg.setPointerCapture(e.pointerId); scrubE(fx(e)); });
    esvg.addEventListener("pointermove", (e) => scrubE(fx(e)));
    esvg.addEventListener("pointerleave", endE); esvg.addEventListener("pointerup", (e) => { if (e.pointerType !== "mouse") endE(); });
    drawE();

    /* ---------- Scenes ---------- */
    const sc = grid.children[3];
    const clearScene = () => { $$(".hm-sc", sc).forEach((b) => b.setAttribute("aria-pressed", "false")); grid.closest(".scr-stage")?.classList.remove("hm-movie"); };
    const runScene = (i) => {
      const s = SCENES[i];
      $$(".hm-sc", sc).forEach((b, j) => b.setAttribute("aria-pressed", String(i === j)));
      Object.keys(st).forEach((k, n) => setTimeout(() => { st[k] = s.s[k]; paint(); }, n * 90));
      bsl.animateTo(s.b, 700); animTemp(s.t);
      $("[data-scn]", sc).textContent = `${s.n}: lights ${Math.round(s.b * 100)}%, shades ${s.s.shades ? "open" : "closed"}, TV ${s.s.tv ? "on" : "off"}, ${s.t}°.`;
      grid.closest(".scr-stage")?.classList.toggle("hm-movie", s.n === "Movie Time");
    };
    $$(".hm-sc", sc).forEach((b, i) => b.addEventListener("click", () => runScene(i)));

    return {
      async play(tok, d) {
        await animTemp(19); await d.wait(tok, 300); mseg.select(1); await d.wait(tok, 500); await animTemp(27); await d.wait(tok, 300); mseg.select(2); await d.wait(tok, 600); mseg.select(0);
        for (const k of ["lamp", "fan", "tv"]) { const b = $(`.hm-a[data-k="${k}"]`, lr); await press(b, 120); b.click(); await d.wait(tok, 350); }
        await bsl.animateTo(0.35, 800); await d.wait(tok, 400);
        for (let k = 0; k <= 1; k += 0.03) { scrubE(k); await d.wait(tok, 45); } endE();
        await press($$(".hm-sc", sc)[1]); runScene(1); await d.wait(tok, 2200);
        await press($$(".hm-sc", sc)[0]); runScene(0); await d.wait(tok, 1200);
      },
    };
  },
};
