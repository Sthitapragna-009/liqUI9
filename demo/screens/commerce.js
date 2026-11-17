// Commerce: product swatches and Add to Bag morphing into a stepper, ratings histogram that
// filters reviews, a live order-tracking map with a glass ETA, and delivery options. MIT, (c) 2026 KSP.
import { C, tile, glass, spring, ico, fmt, press, samples, smooth, polyline, clamp, tween, $, $$ } from "./lib.js";

const SW = [
  { n: "Sunset", a: "#ff7a45", b: "#c2185b" }, { n: "Ocean", a: "#29b6f6", b: "#283593" },
  { n: "Forest", a: "#66bb6a", b: "#1b5e20" }, { n: "Graphite", a: "#9e9ea6", b: "#26262b" },
];
const HIST = [[5, 412], [4, 168], [3, 51], [2, 17], [1, 12]];
const REVIEWS = [
  { s: 5, t: "Light, and the grip is great on wet roads." }, { s: 5, t: "Third pair. Still the most comfortable I own." },
  { s: 4, t: "Runs half a size small; size up." }, { s: 4, t: "Good cushioning, laces are short." },
  { s: 3, t: "Fine for walking, not for long runs." }, { s: 2, t: "Sole wore out in four months." }, { s: 1, t: "Arrived with a scuffed toe box." },
];
const DELIVERY = [
  { k: "Standard", d: "Thu, 20 Nov", p: 0 }, { k: "Express", d: "Tomorrow by 9 pm", p: 49 }, { k: "Scheduled", d: "Pick a 2-hour slot", p: 29 },
];
const ROUTE = [[40, 250], [90, 214], [150, 220], [205, 176], [262, 160], [300, 118], [356, 100], [420, 78], [476, 60]];
const PRICE = 6499;

export default {
  id: "commerce", name: "Commerce", color: C.orange,
  sub: "Pick a colour, add to bag, filter reviews by stars, follow the courier, drop a pin, choose delivery.",
  mount(grid) {
    const stars = (n, s = 13) => Array.from({ length: 5 }, (_, i) => `<span style="color:${i < n ? C.orange : "var(--label-4)"}">${ico("star", s, true)}</span>`).join("");
    grid.innerHTML = [
      tile({ span: 6, label: "Product", icon: "bag", color: C.orange, ux: "swatches; add", body: `
        <div class="cm-prod">
          <div class="cm-img" style="--a:${SW[0].a};--b:${SW[0].b}"><span class="cm-shoe">${ico("shoe", 120)}</span><span class="cm-bag" aria-live="polite">${ico("bag", 18)}<b data-bagn>0</b></span></div>
          <div class="vstack" style="gap:6px;align-content:start">
            <div class="mut">Running</div><div style="font:700 var(--t-title3)/1.2 var(--font-display)">Pace Runner 3</div>
            <div class="hstack" style="gap:6px">${stars(5)}<span class="mut2">4.6 · 660</span></div>
            <div class="num-s">₹${fmt(PRICE)}</div>
            <div class="mut2" data-swn>Colour: ${SW[0].n}</div>
            <div class="hstack cm-sw" role="radiogroup" aria-label="Colour">${SW.map((s, i) => `<button role="radio" aria-checked="${i === 0}" aria-label="${s.n}" style="--a:${s.a};--b:${s.b}"></button>`).join("")}</div>
            <div class="cm-add-wrap"><div class="cm-add"><button class="cm-addl">Add to Bag</button><span class="cm-step" role="group" aria-label="Quantity"><button data-d="-1" aria-label="Remove one">${ico("minus", 18)}</button><b data-q aria-live="polite">1</b><button data-d="1" aria-label="Add one">${ico("plus", 18)}</button></span></div></div>
          </div>
        </div>` }),
      tile({ span: 6, label: "Ratings & Reviews", icon: "star", color: C.yellow, ux: "histogram; summary", body: `
        <div class="hstack" style="gap:18px;align-items:flex-start">
          <div style="text-align:center"><div style="font:800 48px/1 var(--font-rounded)">4.6</div><div class="mut2">out of 5</div><div class="mut2" style="margin-top:6px">660 ratings</div></div>
          <div class="cm-hist" style="flex:1">${HIST.map(([s, n]) => `<button class="cm-hb" data-s="${s}" aria-pressed="false" aria-label="${s} stars, ${n} ratings"><span class="mut2" style="width:10px">${s}</span><span class="cm-bar"><i style="--w:${(n / 412) * 100}%"></i></span><span class="mut2" style="width:28px;text-align:right">${n}</span></button>`).join("")}</div>
        </div>
        <div class="cm-sum"><span style="color:${C.purple}">${ico("sparkle", 14)}</span><span>Most people mention comfort and grip. Some say it runs small.</span></div>
        <div class="cm-revs"></div>` }),
      tile({ span: 8, label: "Order Tracking", icon: "truck", color: C.green, ux: "route; follow", body: `
        <div class="cm-map" aria-label="Map. Click to drop a pin.">
          <svg viewBox="0 0 520 300" preserveAspectRatio="xMidYMid slice">
            <rect width="520" height="300" fill="var(--map-land)"/>
            <path d="M0 40 C80 20 140 60 210 30 S330 0 380 30 L380 0 L0 0Z" fill="var(--map-water)"/>
            <path d="M330 300 C340 240 400 230 450 250 S520 230 520 230 L520 300Z" fill="var(--map-park)"/>
            <ellipse cx="120" cy="120" rx="62" ry="40" fill="var(--map-park)"/>
            <g stroke="var(--map-road)" stroke-linecap="round" fill="none">
              <path d="M0 200 C120 190 220 150 520 170" stroke-width="10"/><path d="M200 300 C210 200 260 120 300 0" stroke-width="8"/>
              <path d="M0 90 C140 110 300 70 520 110" stroke-width="6"/><path d="M420 300 C430 200 460 120 520 60" stroke-width="5"/><path d="M60 300 C80 240 60 180 90 120" stroke-width="4"/>
            </g>
            <path d="${smooth(ROUTE)}" stroke="${C.blue}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".35"/>
            <path class="cm-done" stroke="${C.blue}" stroke-width="6" fill="none" stroke-linecap="round"/>
            <g class="cm-pins"></g>
            <g transform="translate(476 60)"><circle r="13" fill="${C.green}"/><path d="M-6 0 L-1 5 L7 -5" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>
            <g class="cm-cluster" transform="translate(150 255)"><circle r="15" fill="${C.orange}"/><text y="5" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="system-ui">3</text></g>
            <g class="cm-courier"><circle r="18" fill="${C.blue}" opacity=".22"/><circle r="10" fill="${C.blue}" stroke="#fff" stroke-width="3"/></g>
          </svg>
          <div class="cm-eta"><span class="cm-etat"><b data-eta>12 min</b><span class="mut2" data-etas>Arjun is on the way</span></span></div>
          <div class="cm-mapbtns"><button class="btn btn--glass btn--icon cm-zin" aria-label="Zoom in">${ico("plus", 18)}</button><button class="btn btn--glass btn--icon cm-zout" aria-label="Zoom out">${ico("minus", 18)}</button></div>
          <button class="btn btn--glass cm-follow" aria-pressed="true"><span>Following</span></button>
        </div>
        <div class="hint">Click the map to drop a pin. Zoom in to split the cluster.</div>` }),
      tile({ span: 4, label: "Delivery", icon: "box", color: C.cyan, ux: "choice; default", body: `
        <div class="cm-del" role="radiogroup" aria-label="Delivery speed">${DELIVERY.map((o, i) => `<button role="radio" aria-checked="${i === 0}" data-i="${i}"><span class="cm-radio"></span><span style="flex:1;text-align:left"><b>${o.k}</b><span class="mut2" style="display:block">${o.d}</span></span><span>${o.p ? `₹${o.p}` : "Free"}</span></button>`).join("")}</div>
        <div class="hstack between" style="margin-top:12px;font-weight:700;border-top:.5px solid var(--separator);padding-top:10px"><span>Total</span><span data-total>₹${fmt(PRICE)}</span></div>` }),
    ].join("");

    /* ---------- Product ---------- */
    const prod = grid.children[0], img = $(".cm-img", prod), add = $(".cm-add", prod), bagN = $("[data-bagn]", prod);
    glass(add, { variant: "tinted", interactive: true }); glass($(".cm-bag", prod), { variant: "regular" });
    let qty = 0;
    const setSw = (i) => {
      $$(".cm-sw button", prod).forEach((b, j) => b.setAttribute("aria-checked", String(i === j)));
      img.style.setProperty("--a", SW[i].a); img.style.setProperty("--b", SW[i].b); $("[data-swn]", prod).textContent = `Colour: ${SW[i].n}`;
      $(".cm-shoe", prod).animate([{ transform: "translateX(-14px) rotate(-6deg)", opacity: 0.4 }, { transform: "none", opacity: 1 }], { duration: 420, easing: "cubic-bezier(.2,.9,.3,1.2)" });
    };
    $$(".cm-sw button", prod).forEach((b, i) => b.addEventListener("click", () => setSw(i)));
    const setQty = (q) => {
      qty = clamp(q, 0, 9); add.classList.toggle("is-step", qty > 0); $("[data-q]", prod).textContent = qty; bagN.textContent = qty;
      $(".cm-bag", prod).classList.toggle("is-on", qty > 0);
      $(".cm-bag", prod).animate([{ transform: "scale(1.25)" }, { transform: "none" }], { duration: 300 });
    };
    add.addEventListener("click", (e) => { const s = e.target.closest("[data-d]"); if (s) setQty(qty + +s.dataset.d); else if (e.target.closest(".cm-addl")) setQty(1); });

    /* ---------- Ratings ---------- */
    const rt = grid.children[1], revs = $(".cm-revs", rt);
    let filt = 0;
    const drawRevs = () => {
      const list = REVIEWS.filter((r) => !filt || r.s === filt).slice(0, 3);
      revs.innerHTML = (list.length ? list : [{ s: filt, t: "No written reviews yet." }]).map((r) => `<div class="cm-rev"><span>${stars(r.s, 11)}</span><span>${r.t}</span></div>`).join("");
      $$(".cm-hb", rt).forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.s === filt)));
    };
    const filter = (s) => { filt = filt === s ? 0 : s; drawRevs(); };
    $$(".cm-hb", rt).forEach((b) => b.addEventListener("click", () => filter(+b.dataset.s)));
    drawRevs();
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { rt.classList.add("is-in"); o.disconnect(); } }).observe(rt);

    /* ---------- Map ---------- */
    const mp = grid.children[2], map = $(".cm-map", mp), svg = $("svg", map), courier = $(".cm-courier", svg), done = $(".cm-done", svg);
    const eta = $(".cm-eta", mp), follow = $(".cm-follow", mp);
    glass(eta, { variant: "regular" }); glass(follow, { variant: "regular", interactive: true });
    $$(".cm-mapbtns .btn", mp).forEach((b) => glass(b, { variant: "regular", interactive: true }));
    const path = samples(ROUTE, 24);
    let t = 0.18, following = true, zoom = 1, last = performance.now();
    const place = () => {
      const i = Math.floor(t * (path.length - 1)), [x, y] = path[i];
      courier.setAttribute("transform", `translate(${x} ${y})`);
      done.setAttribute("d", polyline(path.slice(0, i + 1)));
      const mins = Math.max(1, Math.round((1 - t) * 15));
      $("[data-eta]", mp).textContent = t >= 0.999 ? "Arrived" : `${mins} min`;
      $("[data-etas]", mp).textContent = t >= 0.999 ? "Order delivered" : t > 0.8 ? "Arjun is nearby" : "Arjun is on the way";
      const cx = following ? x : 260, cy = following ? y : 150;
      svg.style.transformOrigin = `${(cx / 520) * 100}% ${(cy / 300) * 100}%`;
      svg.style.transform = `scale(${zoom})`;
    };
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (mp.isConnected && mp.offsetParent) { t += dt / 40; if (t > 1.15) t = 0.05; place(); }
      requestAnimationFrame(loop);
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) place(); else requestAnimationFrame(loop);
    follow.addEventListener("click", () => { following = !following; follow.setAttribute("aria-pressed", String(following)); follow.querySelector("span:last-child").textContent = following ? "Following" : "Follow"; place(); });
    const setZoom = (z) => {
      const from = zoom; zoom = clamp(z, 1, 2.2);
      spring(from, zoom, (v) => { zoom = v; place(); }, { response: 0.45 });
      const cl = $(".cm-cluster", svg), split = zoom > 1.4;
      cl.style.transition = "opacity .25s"; cl.style.opacity = split ? 0 : 1;
      $$(".cm-sub", svg).forEach((n) => n.remove());
      if (split) [[-26, -6], [10, 18], [22, -20]].forEach(([dx, dy], k) => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g"); g.setAttribute("class", "cm-sub");
        g.innerHTML = `<circle r="8" fill="${C.orange}" stroke="#fff" stroke-width="2"/>`;
        g.setAttribute("transform", "translate(150 255)"); svg.querySelector(".cm-pins").before(g);
        g.animate([{ transform: "translate(150px,255px)" }, { transform: `translate(${150 + dx}px,${255 + dy}px)` }], { duration: 480, delay: k * 40, easing: "cubic-bezier(.2,.9,.3,1.3)", fill: "forwards" });
      });
    };
    $(".cm-zin", mp).addEventListener("click", () => setZoom(zoom + 0.6));
    $(".cm-zout", mp).addEventListener("click", () => setZoom(zoom - 0.6));
    const dropPin = (x, y) => {
      const pins = $(".cm-pins", svg); pins.innerHTML = "";
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.innerHTML = `<ellipse cx="0" cy="0" rx="7" ry="2.5" fill="rgb(0 0 0 / .35)"/><g class="cm-pinb"><path d="M0 0 C-3 -9 -12 -14 -12 -24 A12 12 0 1 1 12 -24 C12 -14 3 -9 0 0Z" fill="${C.red}" stroke="#fff" stroke-width="2"/><circle cy="-24" r="4.5" fill="#fff"/></g>`;
      g.setAttribute("transform", `translate(${x} ${y})`); pins.appendChild(g);
      g.querySelector(".cm-pinb").animate([{ transform: "translateY(-60px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1, offset: 0.6 }, { transform: "translateY(-8px)", offset: 0.8 }, { transform: "none" }], { duration: 650, easing: "ease-out" });
    };
    svg.addEventListener("click", (e) => {
      const r = svg.getBoundingClientRect(), m = svg.getScreenCTM().inverse(), pt = svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(m); void r; dropPin(p.x, p.y);
    });

    /* ---------- Delivery ---------- */
    const dl = grid.children[3];
    const pickDel = (i) => {
      $$(".cm-del button", dl).forEach((b, j) => b.setAttribute("aria-checked", String(i === j)));
      const total = PRICE * Math.max(1, qty) + DELIVERY[i].p, el = $("[data-total]", dl), from = +el.dataset.v || PRICE;
      el.dataset.v = total; tween(380, (k) => { el.textContent = `₹${fmt(from + (total - from) * k)}`; });
    };
    $$(".cm-del button", dl).forEach((b, i) => b.addEventListener("click", () => pickDel(i)));

    return {
      async play(tok, d) {
        for (const i of [1, 2, 3, 0]) { setSw(i); await d.wait(tok, 650); }
        await press(add); setQty(1); await d.wait(tok, 700); setQty(2); await d.wait(tok, 600);
        for (const s of [5, 4, 1, 0]) { filter(s || filt); await d.wait(tok, 800); }
        setZoom(1.8); await d.wait(tok, 1200); dropPin(330, 210); await d.wait(tok, 900); setZoom(1); await d.wait(tok, 700);
        pickDel(1); await d.wait(tok, 900); pickDel(0); await d.wait(tok, 600);
      },
    };
  },
};
