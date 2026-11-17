/*!
 * LiqUI glass engine — MIT License, (c) 2026 KSP.
 * Web approximation of Apple's Liquid Glass. The lens technique (convex-bevel displacement
 * map + per-channel displacement for dispersion + specular rim / caustic / sheen layers)
 * was first built by KSP for a Remotion motion piece and is generalised here.
 *
 * Usage:
 *   import { glass, autoGlass, supportsRefraction } from "./liqui-glass.js";
 *   glass(element, { variant: "regular" | "clear" | "tinted", interactive: true });
 *   autoGlass(); // applies to every [data-glass] element
 *
 * Real refraction (SVG filter inside backdrop-filter) renders in Chromium-based browsers.
 * Other browsers get a frosted fallback with the same rim, sheen and shadow layers.
 */

const SVG_NS = "http://www.w3.org/2000/svg";
const mapCache = new Map();
let uid = 0;

const VARIANTS = {
  // refr: displacement strength (px at the rim). frost: blur before displacement (px).
  // zoom: whole-body magnification (0..0.3). light: rim/sheen intensity.
  regular: { refr: null, frost: 2.2, zoom: 0.12, light: 1, dim: 0 },
  clear: { refr: null, frost: 0, zoom: 0.16, light: 1.1, dim: 0 },
  tinted: { refr: null, frost: 2.2, zoom: 0.1, light: 0.9, dim: 0 },
};

/** True when the browser can apply an SVG filter inside backdrop-filter (Chromium). */
export function supportsRefraction() {
  if (typeof window === "undefined" || !window.CSS || !CSS.supports) return false;
  if (!CSS.supports("backdrop-filter", "url(#a)")) return false;
  const ua = navigator.userAgent;
  const isChromium = /Chrome\/|Chromium\/|Edg\//.test(ua) && !/Firefox\//.test(ua);
  return isChromium;
}

const prefers = (q) => typeof matchMedia === "function" && matchMedia(q).matches;

/**
 * Displacement map for a rounded rectangle lens.
 * R channel = x offset, G channel = y offset, 128 = no offset.
 * Profile: convex bevel — offset grows toward the rim along 1 - sqrt(1 - (1-k)^2),
 * where k is the normalised distance inside the edge band. A whole-body zoom term pulls
 * samples toward the centre so content under the glass is slightly magnified.
 */
export function lensMap(w, h, r, edge, zoom) {
  const W = Math.max(2, Math.round(w));
  const H = Math.max(2, Math.round(h));
  const key = `${W}x${H}r${Math.round(r)}e${Math.round(edge)}z${zoom}`;
  const hit = mapCache.get(key);
  if (hit) return hit;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d");
  const img = ctx.createImageData(W, H);
  const hw = W / 2, hh = H / 2, rr = Math.min(r, hw, hh);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const px = x + 0.5 - hw, py = y + 0.5 - hh;
      const qx = Math.abs(px) - (hw - rr), qy = Math.abs(py) - (hh - rr);
      const ox = Math.max(qx, 0), oy = Math.max(qy, 0), ol = Math.hypot(ox, oy);
      const d = ol + Math.min(Math.max(qx, qy), 0) - rr; // signed distance, < 0 inside
      let nx = 0, ny = 0;
      if (qx > 0 && qy > 0) { nx = ox / (ol || 1); ny = oy / (ol || 1); }
      else if (qx > qy) nx = 1;
      else ny = 1;
      nx *= Math.sign(px) || 1;
      ny *= Math.sign(py) || 1;
      const k = Math.max(0, Math.min(1, -d / edge));
      const m = 1 - Math.sqrt(Math.max(0, 1 - (1 - k) * (1 - k)));
      const zx = -(px / hw) * zoom, zy = -(py / hh) * zoom;
      const dx = Math.max(-1, Math.min(1, -nx * m + zx));
      const dy = Math.max(-1, Math.min(1, -ny * m + zy));
      const i = (y * W + x) * 4;
      img.data[i] = 128 + dx * 127;
      img.data[i + 1] = 128 + dy * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const url = cv.toDataURL();
  if (mapCache.size > 64) mapCache.delete(mapCache.keys().next().value);
  mapCache.set(key, url);
  return url;
}

const isolate = (c) => {
  const v = [0, 0, 0];
  v[c] = 1;
  return `${v[0]} 0 0 0 0  0 ${v[1]} 0 0 0  0 0 ${v[2]} 0 0  0 0 0 1 0`;
};

function el(tag, attrs = {}, ns) {
  const n = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
  return n;
}

function buildFilter(id, W, H, r, opts) {
  const mn = Math.min(W, H);
  const edge = opts.edge ?? mn * 0.5;
  const S = opts.refr ?? Math.min(38, mn * 0.36);
  const svg = el("svg", { width: 0, height: 0, "aria-hidden": "true", class: "lg-defs" }, SVG_NS);
  const f = el("filter", {
    id, x: 0, y: 0, width: W, height: H,
    filterUnits: "userSpaceOnUse", primitiveUnits: "userSpaceOnUse",
    "color-interpolation-filters": "sRGB",
  }, SVG_NS);
  const add = (tag, attrs) => f.appendChild(el(tag, attrs, SVG_NS));
  add("feImage", { href: lensMap(W, H, r, edge, opts.zoom), x: 0, y: 0, width: W, height: H, preserveAspectRatio: "none", result: "m0" });
  add("feGaussianBlur", { in: "m0", stdDeviation: 1.4, result: "m" });
  // Chromium renders feGaussianBlur with stdDeviation 0 as transparent black, which would
  // blank the whole chain, so only add the frost step when it does something.
  const src = opts.frost > 0 ? "s" : "SourceGraphic";
  if (opts.frost > 0) add("feGaussianBlur", { in: "SourceGraphic", stdDeviation: opts.frost, result: "s" });
  // Slightly different strengths per channel = chromatic dispersion at the rim.
  [1, 1.05, 1.1].forEach((mul, c) => {
    add("feDisplacementMap", { in: src, in2: "m", scale: S * mul, xChannelSelector: "R", yChannelSelector: "G", result: `d${c}` });
    add("feColorMatrix", { in: `d${c}`, type: "matrix", values: isolate(c), result: `c${c}` });
  });
  add("feComposite", { in: "c0", in2: "c1", operator: "arithmetic", k2: 1, k3: 1, result: "rg" });
  add("feComposite", { in: "rg", in2: "c2", operator: "arithmetic", k2: 1, k3: 1, result: "rgb" });
  add("feColorMatrix", { in: "rgb", type: "saturate", values: opts.saturate ?? 1.6 });
  svg.appendChild(f);
  return svg;
}

const LAYERS = ["shadow", "backdrop", "dim", "tint", "edge", "caustic", "sheen", "rim", "rim-glow"];

/**
 * Turn an element into Liquid Glass. Its existing children stay on top as the label layer.
 * Options: variant, radius (px, default from computed border-radius), refr, frost, zoom,
 *          light (rim intensity), angle (light direction, deg), interactive (press squish),
 *          dim (0..1 dark layer for clear glass over bright media).
 * Returns { update(newOptions), destroy() }.
 */
export function glass(node, options = {}) {
  if (!node || node.__lg) return node?.__lg;
  const variant = options.variant || node.dataset.glass || "regular";
  let opts = { ...VARIANTS[variant] || VARIANTS.regular, angle: 135, ...options, variant };
  const refract = supportsRefraction() && !opts.noRefraction;
  const id = `lg${uid++}`;

  node.classList.add("lg", `lg--${variant}`);
  if (!refract) node.classList.add("lg--frosted");
  if (opts.interactive || node.hasAttribute("data-interactive")) node.classList.add("lg--interactive");

  // Loose text would paint beneath the absolutely positioned glass layers: wrap it.
  for (const n of [...node.childNodes]) {
    if (n.nodeType === 3 && n.textContent.trim()) {
      const s = document.createElement("span");
      s.className = "lg-label";
      n.replaceWith(s);
      s.appendChild(n);
    }
  }

  const layers = {};
  const frag = document.createDocumentFragment();
  for (const name of LAYERS) {
    const d = el("span", { class: `lg-layer lg-${name}`, "aria-hidden": "true" });
    layers[name] = d;
    frag.appendChild(d);
  }
  node.prepend(frag);
  let defs = null;

  const paint = () => {
    const rect = node.getBoundingClientRect();
    const W = Math.max(4, Math.round(rect.width / 2) * 2);   // 2px buckets limit map count
    const H = Math.max(4, Math.round(rect.height / 2) * 2);
    const cs = getComputedStyle(node);
    const r = opts.radius ?? (parseFloat(cs.borderTopLeftRadius) || Math.min(W, H) / 2);
    node.style.setProperty("--lg-angle", `${opts.angle}deg`);
    node.style.setProperty("--lg-light", String(opts.light));
    node.style.setProperty("--lg-dim", String(opts.dim || 0));
    if (refract) {
      const next = buildFilter(id, W, H, Math.min(r, W / 2, H / 2), opts);
      if (defs) defs.replaceWith(next); else node.prepend(next);
      defs = next;
      layers.backdrop.style.backdropFilter = `url(#${id}) brightness(1.08)`;
      layers.backdrop.style.webkitBackdropFilter = `url(#${id}) brightness(1.08)`;
    }
  };

  let raf = 0;
  const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); });
  ro.observe(node);
  paint();

  // Press: squish + light flare, released with a slightly bouncy spring (CSS handles easing).
  const down = () => node.classList.add("is-pressed");
  const up = () => node.classList.remove("is-pressed");
  if (node.classList.contains("lg--interactive")) {
    node.addEventListener("pointerdown", down);
    for (const ev of ["pointerup", "pointercancel", "pointerleave"]) node.addEventListener(ev, up);
  }

  const api = {
    update(next = {}) { opts = { ...opts, ...next }; paint(); },
    destroy() {
      ro.disconnect();
      node.removeEventListener("pointerdown", down);
      for (const ev of ["pointerup", "pointercancel", "pointerleave"]) node.removeEventListener(ev, up);
      Object.values(layers).forEach((l) => l.remove());
      defs?.remove();
      node.classList.remove("lg", `lg--${variant}`, "lg--frosted", "lg--interactive");
      delete node.__lg;
    },
  };
  node.__lg = api;
  return api;
}

/** Apply glass to every [data-glass] element under root. */
export function autoGlass(root = document) {
  return [...root.querySelectorAll("[data-glass]")].map((n) => glass(n));
}

/**
 * Critically damped spring (Apple's default: damping 1, response ~0.35 s).
 * Calls onFrame(value, velocity) until settled. Returns a cancel function.
 * Lower damping (e.g. 0.8) only after a momentum gesture.
 */
export function spring(from, to, onFrame, { response = 0.35, damping = 1, velocity = 0 } = {}) {
  if (prefers("(prefers-reduced-motion: reduce)")) { onFrame(to, 0); return () => {}; }
  const w = (2 * Math.PI) / response;
  const k = w * w, c = 2 * damping * w;
  let x = from, v = velocity, last = performance.now(), id = 0;
  const step = (now) => {
    let dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    while (dt > 0) {
      const h = Math.min(dt, 1 / 240);
      v += (-k * (x - to) - c * v) * h;
      x += v * h;
      dt -= h;
    }
    onFrame(x, v);
    if (Math.abs(x - to) < 0.05 && Math.abs(v) < 0.5) { onFrame(to, 0); return; }
    id = requestAnimationFrame(step);
  };
  id = requestAnimationFrame(step);
  return () => cancelAnimationFrame(id);
}

/** Liquid stretch for a moving glass element: grows along travel, thins across it. */
export function liquidStretch(velocityPxPerSec, { k = 0.0009, max = 0.35 } = {}) {
  const s = Math.min(max, Math.abs(velocityPxPerSec) * k);
  return { sx: 1 + s, sy: 1 - s * 0.35 };
}
