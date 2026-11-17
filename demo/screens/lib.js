// Shared helpers for the liqUI9 Screens page. MIT, (c) 2026 KSP.
import { glass, spring, liquidStretch } from "../../kit/liqui-glass.js";
export { glass, spring, liquidStretch };

export const C = {
  blue: "#0A84FF", green: "#30D158", red: "#FF453A", orange: "#FF9F0A", yellow: "#FFD60A", pink: "#FF375F",
  purple: "#BF5AF2", indigo: "#5E5CE6", teal: "#40C8E0", mint: "#63E6E2", cyan: "#64D2FF",
};
export const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
export const fmt = (n, d = 0) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, k) => a + (b - a) * k;
export const easeOut = (x) => 1 - Math.pow(1 - x, 3);
export const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** Animate 0→1 over ms, calling fn(k). Resolves when done; instant with reduced motion. */
export function tween(ms, fn, ease = easeInOut) {
  return new Promise((res) => {
    if (reduced() || ms <= 0) { fn(1); res(); return; }
    const t0 = performance.now();
    const step = (t) => { const k = clamp((t - t0) / ms, 0, 1); fn(ease(k)); k < 1 ? requestAnimationFrame(step) : res(); };
    requestAnimationFrame(step);
  });
}

/** A cancellable script runner for "Watch" mode. */
export function director() {
  let token = { off: true };
  return {
    start() { token.off = true; token = { off: false }; return token; },
    stop() { token.off = true; },
    async wait(tok, ms) { await new Promise((r) => setTimeout(r, reduced() ? Math.min(ms, 120) : ms)); if (tok.off) throw new Error("cancelled"); },
  };
}

/** Briefly show the press squish on a glass element (used by Watch mode). */
export async function press(el, ms = 170) {
  el.classList.add("is-pressed");
  await new Promise((r) => setTimeout(r, ms));
  el.classList.remove("is-pressed");
}

/** Smooth path through points (Catmull-Rom → cubic Bézier). */
export function smooth(pts) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}
/** Catmull-Rom samples (for paths an object travels along). */
export function samples(pts, n = 20) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    for (let j = 0; j < n; j++) {
      const u = j / n, u2 = u * u, u3 = u2 * u;
      out.push([0, 1].map((k) => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * u + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * u2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * u3)));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}
export const polyline = (s) => s.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("");

/* ---------- icons (simple original outline glyphs; SF Symbols are Apple-platform only) ---------- */
const P = {
  up: '<path d="M4 16l6-6 4 4 6-7"/><path d="M15 7h5v5"/>', down: '<path d="M4 8l6 6 4-4 6 7"/><path d="M15 17h5v-5"/>',
  card: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/>', bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 016 0"/>',
  doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/>', sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  thumb: '<path d="M7 11v9H4v-9z"/><path d="M7 11l4-7a2 2 0 013 2l-1 4h5a2 2 0 012 2l-2 7H7"/>', bolt: '<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>', check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  timer: '<circle cx="12" cy="13" r="7.5"/><path d="M12 13V9M10 3h4"/>', star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z"/>',
  truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  box: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>', heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>',
  shoe: '<path d="M3 15c3 0 5-2 6-5l3 2c2 1 5 1 7 2a2 2 0 011 2v1H3z"/>', bed: '<path d="M3 18V7M3 13h18v5M7 13v-3h6v3"/>',
  walk: '<circle cx="13" cy="4.5" r="1.8"/><path d="M11 21l2-6-3-2 1-5 3 2 3 1M8 12l2-4"/>', wave: '<path d="M3 12h3l2-5 4 10 3-7 2 2h4"/>',
  therm: '<path d="M10 14V5a2 2 0 014 0v9a4 4 0 11-4 0z"/>', home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>',
  chev: '<path d="M9 6l6 6-6 6"/>', car: '<path d="M5 15l1.5-5h11L19 15"/><rect x="3.5" y="14" width="17" height="4.5" rx="1.5"/><circle cx="7.5" cy="18.5" r="1.2"/><circle cx="16.5" cy="18.5" r="1.2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
  moon: '<path d="M20 14A8 8 0 1110 4a6.5 6.5 0 0010 10z"/>', film: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>', unlock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 017.5-2"/>',
  fan: '<circle cx="12" cy="12" r="1.6"/><path d="M12 10.4C11 6 13 3 15.5 4.5S14 10 12 10.4zM13.6 12c4.4-1 7.4 1 5.9 3.5S14 14 13.6 12zM10.4 12.8c-3 3.3-6.6 3.4-6.9.5s4.6-2.6 6.9-.5z"/>',
  bulb: '<path d="M9 18h6M10 21h4M8 14a6 6 0 118 0c-1 1-1.5 2-1.5 3h-5c0-1-.5-2-1.5-3z"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-4 3-6 6.5-6s6 2 6.5 6M16 4.5a3.5 3.5 0 010 7M18 14c2 .8 3.2 2.8 3.5 6"/>',
  share: '<path d="M12 15V3M8 7l4-4 4 4"/><path d="M5 12v8h14v-8"/>', shades: '<path d="M4 4h16M5 4v12h14V4M12 16v4"/>',
};
export const ico = (n, s = 22, fill = false) => `<svg class="ico" width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;

/* ---------- tile ---------- */
export function tile({ span = 6, label, icon, color = C.blue, ux = "", body = "", cls = "" }) {
  return `<section class="st ${cls}" style="--span:${span};--c:${color}">
    ${label ? `<header class="st__h">${icon ? ico(icon, 20, ["heart", "bolt", "star"].includes(icon)) : ""}<span>${label}</span>${ux ? `<code>${ux}</code>` : ""}</header>` : ""}
    <div class="st__b">${body}</div></section>`;
}

/* ---------- open ring (gap at the bottom), value in the middle. Not Activity rings. ---------- */
export function ring({ v, c, value, label, size = 96, sw = 9, deep = "#B3261E" }) {
  const r = (size - sw) / 2, cx = size / 2, gap = (64 * Math.PI) / 180, a0 = Math.PI / 2 + gap / 2, sweep = 2 * Math.PI - gap;
  const pt = (q) => [cx + r * Math.cos(a0 + sweep * q), cx + r * Math.sin(a0 + sweep * q)];
  const arc = (q0, q1) => { const [x0, y0] = pt(q0), [x1, y1] = pt(Math.max(q0 + 0.0001, q1)); return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${sweep * (q1 - q0) > Math.PI ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`; };
  const main = Math.min(1, v), lap = Math.max(0, v - 1);
  return `<div class="ring" style="width:${size}px;height:${size}px">
    <svg width="${size}" height="${size}"><path d="${arc(0, 1)}" stroke="${c}" stroke-opacity=".22" stroke-width="${sw}" fill="none" stroke-linecap="round"/>
    ${v > 0.002 ? `<path d="${arc(0, main)}" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>` : ""}
    ${lap > 0.002 ? `<path d="${arc(0, Math.min(1, lap))}" stroke="${deep}" stroke-width="${sw}" fill="none" stroke-linecap="round" style="filter:drop-shadow(0 0 3px rgba(0,0,0,.6))"/>` : ""}</svg>
    <div class="ring__t"><b style="font-size:${(size * 0.3).toFixed(0)}px">${value}</b><i style="font-size:${(size * 0.13).toFixed(0)}px;color:${c}">${label}</i></div></div>`;
}

/* ---------- segmented control with a liquid glass thumb ---------- */
export function segmented(root, onChange) {
  const thumb = root.querySelector(".seg__thumb");
  const btns = [...root.querySelectorAll("button")];
  let x = 0, cancel = () => {}, idx = Math.max(0, btns.findIndex((b) => b.getAttribute("aria-pressed") === "true"));
  if (!thumb.__lg) glass(thumb, { variant: "clear" });
  const place = (i, animate) => {
    idx = i;
    const b = btns[i];
    btns.forEach((o, j) => o.setAttribute("aria-pressed", String(j === i)));
    thumb.style.width = `${b.offsetWidth}px`;
    if (!animate) { cancel(); x = b.offsetLeft; thumb.style.transform = `translateX(${x}px)`; return; }
    cancel();
    cancel = spring(x, b.offsetLeft, (v, vel) => { x = v; const { sx, sy } = liquidStretch(vel); thumb.style.transform = `translateX(${v}px) scale(${sx}, ${sy})`; }, { response: 0.42, damping: 0.86 });
  };
  btns.forEach((b, i) => b.addEventListener("click", () => { if (i !== idx) { place(i, true); onChange?.(i, b.dataset.v ?? b.textContent); } }));
  const init = () => place(idx, false);
  requestAnimationFrame(init);
  new ResizeObserver(init).observe(root);
  return { select: (i) => { if (i !== idx) { place(i, true); onChange?.(i, btns[i].dataset.v ?? btns[i].textContent); } }, get index() { return idx; } };
}
export const segHTML = (items, sel = 0, cls = "") =>
  `<div class="seg ${cls}" role="group">${items.map((t, i) => `<button aria-pressed="${i === sel}">${t}</button>`).join("")}<span class="seg__thumb"></span></div>`;

/* ---------- content-layer slider whose thumb turns to glass while dragged ---------- */
export function slider(root, onInput, value = 0.5) {
  const thumb = root.querySelector(".slider__thumb");
  if (!thumb.__lg) glass(thumb, { variant: "clear" });
  let v = value;
  const set = (p, emit = true) => { v = clamp(p, 0, 1); root.style.setProperty("--p", `${v * 100}%`); root.setAttribute("aria-valuenow", String(Math.round(v * 100))); if (emit) onInput?.(v); };
  const fromX = (cx) => { const r = root.getBoundingClientRect(); return (cx - r.left) / r.width; };
  root.setAttribute("role", "slider"); root.tabIndex = 0; root.setAttribute("aria-valuemin", "0"); root.setAttribute("aria-valuemax", "100");
  root.addEventListener("pointerdown", (e) => { root.setPointerCapture(e.pointerId); root.classList.add("is-dragging"); set(fromX(e.clientX)); });
  root.addEventListener("pointermove", (e) => { if (root.classList.contains("is-dragging")) set(fromX(e.clientX)); });
  root.addEventListener("pointerup", () => root.classList.remove("is-dragging"));
  root.addEventListener("pointercancel", () => root.classList.remove("is-dragging"));
  root.addEventListener("keydown", (e) => { const d = e.key === "ArrowRight" ? 0.05 : e.key === "ArrowLeft" ? -0.05 : 0; if (d) { e.preventDefault(); set(v + d); } });
  set(value, false);
  return {
    set, get value() { return v; },
    async animateTo(p, ms = 900) { root.classList.add("is-dragging"); const a = v; await tween(ms, (k) => set(lerp(a, p, k))); root.classList.remove("is-dragging"); },
  };
}
export const sliderHTML = (cls = "") => `<div class="slider ${cls}"><div class="slider__track"><div class="slider__fill"></div></div><div class="slider__thumb"><span class="slider__cap"></span></div></div>`;

/** Count a number up into an element. */
export function countUp(el, to, { ms = 1200, d = 0, pre = "", suf = "", from = 0 } = {}) {
  return tween(ms, (k) => { el.textContent = `${pre}${fmt(lerp(from, to, k), d)}${suf}`; }, easeOut);
}

export const spinner = (s = 20) => `<svg class="spin" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none"/><path d="M12 3a9 9 0 019 9" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
