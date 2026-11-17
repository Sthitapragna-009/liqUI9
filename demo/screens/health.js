// Health: heart-rate range chart with D/W and a glass scrub label, run zones, sleep stages,
// steps with an average rule, and trends with a confidence band. MIT, (c) 2026 KSP.
import { C, tile, segHTML, segmented, glass, smooth, clamp, lerp, tween, fmt, $, $$ } from "./lib.js";

const rnd = (s) => () => ((s = (s * 9301 + 49297) % 233280) / 233280);
const HR = {
  D: (() => { const r = rnd(3); return Array.from({ length: 24 }, (_, h) => { const base = h < 6 ? 54 : h < 8 ? 64 : h === 18 ? 96 : 70; const lo = base - 4 - r() * 6; return [lo, lo + 10 + r() * (h === 18 ? 70 : 34)]; }); })(),
  W: (() => { const r = rnd(9); return Array.from({ length: 7 }, () => { const lo = 50 + r() * 6; return [lo, 120 + r() * 50]; }); })(),
};
const ZONES = [{ k: "Zone 1", m: 3, c: C.cyan }, { k: "Zone 2", m: 7, c: C.green }, { k: "Zone 3", m: 11, c: C.yellow }, { k: "Zone 4", m: 6, c: C.orange }, { k: "Zone 5", m: 1.2, c: C.red }];
const STAGES = ["Awake", "REM", "Core", "Deep"], SC = [C.orange, C.cyan, C.blue, C.indigo];
const SLEEP = [[0, 0.03, 2], [0.03, 0.12, 3], [0.12, 0.22, 2], [0.22, 0.27, 1], [0.27, 0.38, 2], [0.38, 0.45, 3], [0.45, 0.47, 0], [0.47, 0.58, 2], [0.58, 0.66, 1], [0.66, 0.78, 2], [0.78, 0.82, 3], [0.82, 0.9, 1], [0.9, 0.92, 0], [0.92, 1, 2]];
const STEPS = { "This week": [8420, 11260, 6120, 9840, 12980, 4310, 7650], "Last week": [6200, 7400, 9100, 5600, 8800, 10400, 6900] };
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const TRENDS = {
  "Resting HR": { c: C.red, u: "BPM", d: [64, 63, 63, 62, 61, 61, 60, 59, 60, 58, 58, 57], ci: 2.5 },
  HRV: { c: C.cyan, u: "ms", d: [38, 40, 39, 42, 44, 43, 46, 47, 46, 49, 51, 52], ci: 4 },
  "Cardio fitness": { c: C.green, u: "VO₂ max", d: [38.2, 38.4, 38.3, 38.9, 39.2, 39.5, 39.4, 39.9, 40.3, 40.4, 40.8, 41.1], ci: 0.6 },
};

export default {
  id: "health", name: "Health", color: C.pink,
  sub: "Scrub heart rate by day or week, inspect zones and sleep stages, compare steps, switch trends.",
  mount(grid) {
    grid.innerHTML = [
      tile({ span: 7, label: "Heart Rate", icon: "heart", color: C.pink, ux: "range; scrub", body: `
        <div class="hstack between"><div><div class="mut2">RANGE</div><div><span class="num" data-hrv>48–166</span> <span class="mut">BPM</span></div><div class="mut2" data-hrd>Today</div></div>${segHTML(["D", "W"], 0, "hl-hrseg")}</div>
        <div class="hl-hr" style="position:relative;margin-top:10px"><svg class="plot" viewBox="0 0 600 180" preserveAspectRatio="none" style="height:180px" role="img" aria-label="Heart rate range chart"></svg><div class="glabel"><span class="gl-t"></span></div></div>` }),
      tile({ span: 5, label: "Outdoor Run", icon: "walk", color: C.green, ux: "stacked bar", body: `
        <div class="hstack" style="gap:18px"><div><div class="mut2">DISTANCE</div><div class="num-s">5.21 km</div></div><div><div class="mut2">TIME</div><div class="num-s">28:14</div></div><div><div class="mut2">AVG HR</div><div class="num-s">152</div></div></div>
        <div class="hl-zbar" role="group" aria-label="Time in heart rate zones">${ZONES.map((z, i) => `<button style="--c:${z.c};flex:${z.m}" data-i="${i}" aria-label="${z.k}: ${z.m} minutes"></button>`).join("")}</div>
        <div class="hl-zl">${ZONES.map((z, i) => `<button data-i="${i}" style="--c:${z.c}"><span class="dot"></span>${z.k}<b>${String(Math.floor(z.m)).padStart(2, "0")}:${String(Math.round((z.m % 1) * 60)).padStart(2, "0")}</b></button>`).join("")}</div>` }),
      tile({ span: 6, label: "Sleep", icon: "bed", color: C.indigo, ux: "stages", body: `
        <div class="hstack" style="gap:18px"><div><div class="mut2">TIME ASLEEP</div><div class="num-s">7 h 18 min</div></div><div><div class="mut2" data-sls>23:10 – 06:40</div></div></div>
        <div class="hl-sl" style="position:relative;margin-top:10px"><svg class="plot" viewBox="0 0 600 150" preserveAspectRatio="none" style="height:150px" role="img" aria-label="Sleep stages"></svg><div class="glabel"><span class="gl-t"></span></div></div>
        <div class="hstack wrap" style="gap:12px;margin-top:6px">${STAGES.map((s, i) => `<span class="mut2" style="display:inline-flex;gap:5px;align-items:center"><i style="width:8px;height:8px;border-radius:2px;background:${SC[i]}"></i>${s}</span>`).join("")}</div>` }),
      tile({ span: 6, label: "Steps", icon: "walk", color: C.orange, ux: "average rule", body: `
        <div class="hstack between"><div><div class="mut2">DAILY AVERAGE</div><div><span class="num" data-avg>0</span> <span class="mut">steps</span></div></div>${segHTML(["This week", "Last week"], 0, "hl-stseg")}</div>
        <div class="hl-steps"><svg viewBox="0 0 600 170" preserveAspectRatio="none" style="width:100%;height:170px;overflow:visible" role="img" aria-label="Steps per day"></svg></div>
        <div class="mut2" data-sel style="min-height:1.2em">Tap a day.</div>` }),
      tile({ span: 12, label: "Trends", icon: "wave", color: C.cyan, ux: "confidence", body: `
        <div class="hstack between wrap"><div class="hstack wrap hl-tc" style="gap:6px">${Object.keys(TRENDS).map((k, i) => `<button class="chip" aria-pressed="${i === 0}" style="--c:${TRENDS[k].c}">${k}</button>`).join("")}</div><div class="mut" data-tsum></div></div>
        <svg class="hl-tr" viewBox="0 0 900 170" preserveAspectRatio="none" style="width:100%;height:170px;margin-top:10px" role="img" aria-label="Twelve-month trend with confidence band"><path data-band/><path data-tline fill="none" stroke-width="2.5" vector-effect="non-scaling-stroke"/><g data-tdots></g></svg>
        <div class="hstack between mut2 hl-months">${["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map((m) => `<span>${m}</span>`).join("")}</div>` }),
    ].join("");

    /* ---------- Heart rate ---------- */
    const hr = grid.children[0], hsvg = $(".hl-hr svg", hr), hwrap = $(".hl-hr", hr), hlab = $(".glabel", hwrap);
    glass(hlab, { variant: "regular" });
    let mode = "D", sel = -1;
    let top = 190;
    const y = (v) => 170 - ((v - 40) / (top - 40)) * 160;
    const drawHR = () => {
      const d = HR[mode], n = d.length, w = 600 / n, bw = Math.min(26, w * 0.5);
      top = Math.ceil((Math.max(...d.map((x) => x[1])) + 12) / 20) * 20;
      hsvg.innerHTML = `<g stroke="var(--separator)" stroke-width=".5">${[60, 80, 100, 120, 140, 160, 180].filter((v) => v < top).map((v) => `<line x1="0" x2="600" y1="${y(v)}" y2="${y(v)}"/>`).join("")}</g>` +
        d.map(([lo, hi], i) => `<rect x="${i * w + (w - bw) / 2}" y="${y(hi)}" width="${bw}" height="${y(lo) - y(hi)}" rx="${bw / 2}" fill="${C.pink}" opacity="${sel < 0 || sel === i ? 1 : 0.35}" style="transition:opacity .2s"/>`).join("");
      const lo = Math.min(...d.map((x) => x[0])), hi = Math.max(...d.map((x) => x[1]));
      $("[data-hrv]", hr).textContent = `${Math.round(lo)}–${Math.round(hi)}`; $("[data-hrd]", hr).textContent = mode === "D" ? "Today" : "10–16 Nov";
    };
    const scrubHR = (fx) => {
      const d = HR[mode], i = clamp(Math.floor(fx * d.length), 0, d.length - 1), r = hsvg.getBoundingClientRect();
      sel = i; drawHR();
      const [lo, hi] = d[i], x = ((i + 0.5) / d.length) * r.width;
      $(".gl-t", hlab).innerHTML = `${Math.round(lo)}–${Math.round(hi)} BPM<br><span style="opacity:.7;font-weight:500">${mode === "D" ? `${String(i).padStart(2, "0")}:00` : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>`;
      hlab.style.transform = `translate(${clamp(x - 50, 0, r.width - 110)}px, ${Math.max(-36, (y(hi) / 180) * r.height - 56)}px)`;
      hwrap.classList.add("is-scrub");
    };
    const endHR = () => { sel = -1; drawHR(); hwrap.classList.remove("is-scrub"); };
    const fx = (e, el) => { const r = el.getBoundingClientRect(); return (e.clientX - r.left) / r.width; };
    hsvg.addEventListener("pointerdown", (e) => { hsvg.setPointerCapture(e.pointerId); scrubHR(fx(e, hsvg)); });
    hsvg.addEventListener("pointermove", (e) => scrubHR(fx(e, hsvg)));
    hsvg.addEventListener("pointerleave", endHR); hsvg.addEventListener("pointerup", (e) => { if (e.pointerType !== "mouse") endHR(); });
    const hseg = segmented($(".hl-hrseg", hr), (i, v) => { mode = v; endHR(); hsvg.animate([{ opacity: 0.2, transform: "scaleY(.6)" }, { opacity: 1, transform: "none" }], { duration: 380, easing: "ease-out" }); });
    drawHR();

    /* ---------- Zones ---------- */
    const run = grid.children[1];
    const zone = (i) => {
      $$("[data-i]", run).forEach((b) => b.classList.toggle("is-dim", i >= 0 && +b.dataset.i !== i));
      $$(".hl-zl button", run).forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.i === i)));
    };
    let zsel = -1;
    run.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) { zsel = zsel === +b.dataset.i ? -1 : +b.dataset.i; zone(zsel); } });

    /* ---------- Sleep ---------- */
    const sl = grid.children[2], ssvg = $(".hl-sl svg", sl), swrap = $(".hl-sl", sl), slab = $(".glabel", swrap);
    glass(slab, { variant: "regular" });
    const rowY = (s) => 8 + s * 36;
    ssvg.innerHTML = STAGES.map((_, s) => `<line x1="0" x2="600" y1="${rowY(s) + 13}" y2="${rowY(s) + 13}" stroke="var(--separator)" stroke-width=".5" stroke-dasharray="2 4"/>`).join("") +
      SLEEP.map(([a, b, s]) => `<rect x="${a * 600}" y="${rowY(s)}" width="${Math.max(3, (b - a) * 600 - 1.5)}" height="26" rx="6" fill="${SC[s]}"/>`).join("") +
      `<line data-rule x1="0" x2="0" y1="0" y2="150" stroke="var(--label)" stroke-width="1.5" vector-effect="non-scaling-stroke" opacity="0"/>`;
    const scrubSl = (f) => {
      f = clamp(f, 0, 0.999); const seg = SLEEP.find(([a, b]) => f >= a && f < b) || SLEEP[0], r = ssvg.getBoundingClientRect();
      const mins = 23 * 60 + 10 + f * 450, hh = Math.floor(mins / 60) % 24, mm = Math.floor(mins % 60);
      const rule = $("[data-rule]", ssvg); rule.setAttribute("x1", f * 600); rule.setAttribute("x2", f * 600); rule.setAttribute("opacity", "1");
      $(".gl-t", slab).innerHTML = `<span style="color:${SC[seg[2]]}">●</span> ${STAGES[seg[2]]} · ${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
      slab.style.transform = `translate(${clamp(f * r.width - 60, 0, r.width - 130)}px, ${(rowY(seg[2]) / 150) * r.height - 40}px)`;
      swrap.classList.add("is-scrub");
    };
    const endSl = () => { swrap.classList.remove("is-scrub"); $("[data-rule]", ssvg).setAttribute("opacity", "0"); };
    ssvg.addEventListener("pointerdown", (e) => { ssvg.setPointerCapture(e.pointerId); scrubSl(fx(e, ssvg)); });
    ssvg.addEventListener("pointermove", (e) => scrubSl(fx(e, ssvg)));
    ssvg.addEventListener("pointerleave", endSl); ssvg.addEventListener("pointerup", (e) => { if (e.pointerType !== "mouse") endSl(); });

    /* ---------- Steps ---------- */
    const st = grid.children[3], stsvg = $(".hl-steps svg", st);
    let wk = "This week", cur = STEPS[wk].slice(), day = -1;
    const sy = (v) => 150 - (v / 14000) * 140;
    const drawSteps = () => {
      const avg = cur.reduce((a, b) => a + b, 0) / 7, w = 600 / 7;
      stsvg.innerHTML = cur.map((v, i) => `<g data-d="${i}" style="cursor:pointer"><rect x="${i * w}" y="0" width="${w}" height="170" fill="transparent"/><rect x="${i * w + w * 0.2}" y="${sy(v)}" width="${w * 0.6}" height="${150 - sy(v)}" rx="6" fill="${C.orange}" opacity="${day < 0 || day === i ? 1 : 0.35}"/><text x="${i * w + w / 2}" y="168" text-anchor="middle" font-size="12" fill="var(--label-2)" font-family="system-ui">${DAYS[i]}</text></g>`).join("") +
        `<line x1="0" x2="600" y1="${sy(avg)}" y2="${sy(avg)}" stroke="var(--label)" stroke-width="1.5" stroke-dasharray="5 5" vector-effect="non-scaling-stroke"/><text x="598" y="${sy(avg) - 6}" text-anchor="end" font-size="11" font-weight="600" fill="var(--label)" font-family="system-ui">avg</text>`;
      $("[data-avg]", st).textContent = fmt(avg);
    };
    stsvg.addEventListener("click", (e) => { const g = e.target.closest("[data-d]"); if (!g) return; day = day === +g.dataset.d ? -1 : +g.dataset.d; drawSteps();
      $("[data-sel]", st).textContent = day < 0 ? "Tap a day." : `${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][day]}: ${fmt(cur[day])} steps`; });
    const stseg = segmented($(".hl-stseg", st), (i, v) => { const from = cur.slice(), to = STEPS[v]; wk = v; tween(600, (k) => { cur = from.map((x, j) => lerp(x, to[j], k)); drawSteps(); }); });
    drawSteps();

    /* ---------- Trends ---------- */
    const tr = grid.children[4], tsvg = $(".hl-tr", tr);
    let tk = "Resting HR", tdata = TRENDS[tk].d.slice(), tci = TRENDS[tk].ci;
    const drawTr = () => {
      const T = TRENDS[tk], mn = Math.min(...tdata) - tci * 2, mx = Math.max(...tdata) + tci * 2;
      const P = (v, i) => [(i / 11) * 880 + 10, 160 - ((v - mn) / (mx - mn)) * 150];
      const up = tdata.map((v, i) => P(v + tci, i)), dn = tdata.map((v, i) => P(v - tci, i)).reverse();
      $("[data-band]", tsvg).setAttribute("d", `${smooth(up)} L${dn[0][0]} ${dn[0][1]} ${smooth(dn).slice(1).replace(/^[\d.]+ [\d.]+/, "")} Z`);
      $("[data-band]", tsvg).setAttribute("fill", T.c); $("[data-band]", tsvg).setAttribute("fill-opacity", ".16");
      const line = tdata.map(P); $("[data-tline]", tsvg).setAttribute("d", smooth(line)); $("[data-tline]", tsvg).setAttribute("stroke", T.c);
      $("[data-tdots]", tsvg).innerHTML = line.map(([x, yy]) => `<circle cx="${x}" cy="${yy}" r="3" fill="${T.c}"/>`).join("");
      const ch = T.d.at(-1) - T.d[0];
      $("[data-tsum]", tr).innerHTML = `${T.d.at(-1)} ${T.u} · <span class="${(tk === "Resting HR" ? ch < 0 : ch > 0) ? "pos" : "neg"}">${ch > 0 ? "+" : ""}${ch.toFixed(1)} in 12 months</span>`;
    };
    const pickTr = (k) => {
      $$(".hl-tc .chip", tr).forEach((b) => b.setAttribute("aria-pressed", String(b.textContent === k)));
      const from = tdata.slice(), f0 = tci, to = TRENDS[k].d, mnF = Math.min(...from), mxF = Math.max(...from), mnT = Math.min(...to), mxT = Math.max(...to);
      tk = k;
      // Normalise both series to the same 0..1 space so the morph reads as a shape change, not a jump in scale.
      tween(560, (q) => { tdata = from.map((v, j) => { const a = (v - mnF) / (mxF - mnF), b = (to[j] - mnT) / (mxT - mnT); return mnT + lerp(a, b, q) * (mxT - mnT); }); tci = lerp(f0 * ((mxT - mnT) / (mxF - mnF)), TRENDS[k].ci, q); drawTr(); });
    };
    $$(".hl-tc .chip", tr).forEach((b) => b.addEventListener("click", () => pickTr(b.textContent)));
    drawTr();

    return {
      async play(tok, d) {
        for (let k = 0; k <= 1; k += 0.04) { scrubHR(k * 0.99); await d.wait(tok, 45); }
        endHR(); hseg.select(1); await d.wait(tok, 600);
        for (let k = 0; k <= 1; k += 0.08) { scrubHR(k * 0.99); await d.wait(tok, 70); }
        endHR(); hseg.select(0); await d.wait(tok, 400);
        for (const i of [2, 4, -1]) { zsel = i; zone(i); await d.wait(tok, 700); }
        for (let k = 0; k <= 1; k += 0.03) { scrubSl(k); await d.wait(tok, 45); } endSl();
        stseg.select(1); await d.wait(tok, 900); stseg.select(0); await d.wait(tok, 700);
        for (const k of ["HRV", "Cardio fitness", "Resting HR"]) { pickTr(k); await d.wait(tok, 1000); }
      },
    };
  },
};
