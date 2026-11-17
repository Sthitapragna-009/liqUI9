// Workspace: KPIs that count up, a conversion funnel with step rates, a cohort heatmap with a
// glass tooltip, a sortable accounts table, and an AI summary with sources and feedback. MIT, (c) 2026 KSP.
import { C, tile, glass, ico, fmt, clamp, countUp, smooth, spinner, press, $, $$ } from "./lib.js";

const KPI = [
  { k: "Revenue", v: 18.4, pre: "₹", suf: " L", d: 1, ch: "+12.4%", good: true, c: C.green, s: [9, 10, 9.5, 11, 12, 11.6, 13, 14.2, 13.8, 15.5, 16.9, 18.4] },
  { k: "Active users", v: 48210, ch: "+5.1%", good: true, c: C.blue, s: [39, 40, 41.5, 41, 42.8, 43, 44.1, 45, 44.6, 46.2, 47.1, 48.2] },
  { k: "Churn", v: 2.3, suf: "%", d: 1, ch: "−0.4 pts", good: true, c: C.orange, s: [3.1, 3, 3.2, 2.9, 2.8, 2.9, 2.7, 2.6, 2.6, 2.5, 2.4, 2.3] },
];
const FUNNEL = [["Visited", 48210], ["Signed up", 12480], ["Activated", 7320], ["Paid", 2140]];
const COH = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
const RET = COH.map((_, i) => Array.from({ length: 6 - i }, (_, w) => (w === 0 ? 100 : Math.round(100 * Math.pow(0.78 + i * 0.012, w) - w * 2))));
const ACCOUNTS = [
  { a: "Nimbus Labs", p: "Enterprise", m: 184000, s: 220, h: 92 }, { a: "Chai Point Ops", p: "Business", m: 46000, s: 64, h: 71 },
  { a: "Orbit Freight", p: "Enterprise", m: 128000, s: 140, h: 48 }, { a: "Pixel & Loom", p: "Team", m: 12500, s: 18, h: 88 },
  { a: "Sahyadri Health", p: "Business", m: 61000, s: 75, h: 63 }, { a: "Kite Analytics", p: "Team", m: 9800, s: 12, h: 35 },
];
const COLS = [["a", "Account"], ["p", "Plan"], ["m", "MRR"], ["s", "Seats"], ["h", "Health"]];
const BULLETS = [
  { t: "Revenue is up 12.4%, led by two Enterprise expansions.", src: ["Revenue", "Accounts"] },
  { t: "Activation is the weakest step: 41% of sign-ups never activate.", src: ["Conversion"] },
  { t: "Orbit Freight and Kite Analytics have falling health. Reach out this week.", src: ["Accounts"] },
];

export default {
  id: "workspace", name: "Workspace", color: C.indigo,
  sub: "Watch KPIs count, hover the funnel and cohorts, sort accounts, then ask for a summary.",
  mount(grid) {
    grid.innerHTML = [
      ...KPI.map((k, i) => tile({ span: 4, label: k.k, icon: ["up", "users", "down"][i], color: k.c, ux: "kpi", cls: `ws-kpi ws-src-${k.k.split(" ")[0]}`, body: `
        <div class="hstack between" style="align-items:flex-end"><div><div class="num" data-n>${k.pre || ""}0${k.suf || ""}</div><div class="${k.good ? "pos" : "neg"}" style="font:600 var(--t-footnote)/1.4 var(--font)">${k.ch} <span class="mut2">vs last month</span></div></div>
        <svg viewBox="0 0 120 44" width="120" height="44" style="overflow:visible"><path class="ws-spark" d="${smooth(k.s.map((v, j) => [j * 10.9, 40 - ((v - Math.min(...k.s)) / (Math.max(...k.s) - Math.min(...k.s))) * 36]))}" fill="none" stroke="${k.c}" stroke-width="2.2" stroke-linecap="round" pathLength="1"/></svg></div>` })),
      tile({ span: 6, label: "Conversion", icon: "down", color: C.purple, ux: "funnel; step rate", cls: "ws-src-Conversion", body: `<div class="ws-fun">${FUNNEL.map(([n, v], i) => `
        ${i ? `<div class="ws-rate" data-i="${i}"><span>${ico("down", 12)} ${((v / FUNNEL[i - 1][1]) * 100).toFixed(1)}%</span><span class="mut2">${fmt(FUNNEL[i - 1][1] - v)} drop off</span></div>` : ""}
        <button class="ws-fs" data-i="${i}" style="--w:${(v / FUNNEL[0][1]) * 100}%"><span class="ws-fb"></span><span class="ws-fl"><b>${n}</b><span>${fmt(v)}</span></span></button>`).join("")}</div>` }),
      tile({ span: 6, label: "Retention", icon: "users", color: C.teal, ux: "cohort; heatmap", body: `
        <div class="ws-heat" style="position:relative"><table class="ws-ht" aria-label="Weekly retention by cohort"><thead><tr><th></th>${Array.from({ length: 6 }, (_, w) => `<th>W${w}</th>`).join("")}</tr></thead><tbody>
        ${RET.map((r, i) => `<tr><th>${COH[i]}</th>${Array.from({ length: 6 }, (_, w) => r[w] == null ? "<td></td>" : `<td><button data-c="${i}" data-w="${w}" style="--v:${r[w] / 100}" aria-label="${COH[i]} cohort, week ${w}: ${r[w]}%">${r[w]}</button></td>`).join("")}</tr>`).join("")}
        </tbody></table><div class="glabel"><span class="gl-t"></span></div></div>` }),
      tile({ span: 7, label: "Accounts", icon: "doc", color: C.blue, ux: "table; sort", cls: "ws-src-Accounts", body: `
        <div class="ws-tw"><table class="ws-t"><thead><tr>${COLS.map(([k, n]) => `<th aria-sort="none"><button data-k="${k}">${n}<span class="ws-ar">${ico("down", 12)}</span></button></th>`).join("")}</tr></thead><tbody></tbody></table></div>` }),
      tile({ span: 5, label: "Summary", icon: "sparkle", color: C.purple, ux: "ai; attribution", body: `
        <div class="ws-ai" aria-live="polite"><p class="mut" style="margin:0">A short read of this dashboard, with sources you can check.</p></div>
        <div class="hstack between" style="margin-top:12px"><button class="btn btn--tinted ws-go"><span class="ws-gol">${ico("sparkle", 16)}<span>Summarize this week</span></span></button>
          <span class="hstack ws-fb2" style="gap:4px;visibility:hidden"><button class="btn btn--gray btn--icon btn--sm" data-f="up" aria-label="Good summary" aria-pressed="false">${ico("thumb", 16)}</button><button class="btn btn--gray btn--icon btn--sm" data-f="down" aria-label="Bad summary" aria-pressed="false" style="transform:scaleY(-1)">${ico("thumb", 16)}</button></span></div>
        <div class="mut2" data-fbn style="margin-top:6px;min-height:1.2em"></div>` }),
    ].join("");

    /* ---------- KPIs ---------- */
    const kpis = $$(".ws-kpi", grid);
    const runKpis = () => kpis.forEach((t, i) => {
      const k = KPI[i]; countUp($("[data-n]", t), k.v, { d: k.d || 0, pre: k.pre || "", suf: k.suf || "" });
      const p = $(".ws-spark", t); p.animate([{ strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDasharray: "1 1", strokeDashoffset: 0 }], { duration: 1200, easing: "cubic-bezier(.3,.7,.2,1)" });
    });
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { runKpis(); o.disconnect(); } }, { threshold: 0.4 }).observe(kpis[0]);

    /* ---------- Funnel ---------- */
    const fun = $(".ws-fun", grid);
    const fstep = (i) => { $$(".ws-fs", fun).forEach((b) => b.classList.toggle("is-dim", i >= 0 && +b.dataset.i !== i)); $$(".ws-rate", fun).forEach((r) => r.classList.toggle("is-hi", +r.dataset.i === i)); };
    $$(".ws-fs", fun).forEach((b) => { b.addEventListener("pointerenter", () => fstep(+b.dataset.i)); b.addEventListener("focus", () => fstep(+b.dataset.i)); });
    fun.addEventListener("pointerleave", () => fstep(-1));
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { fun.classList.add("is-in"); o.disconnect(); } }).observe(fun);

    /* ---------- Heatmap ---------- */
    const heat = $(".ws-heat", grid), hl = $(".glabel", heat);
    glass(hl, { variant: "regular" });
    const showCell = (b) => {
      const hr = heat.getBoundingClientRect(), r = b.getBoundingClientRect(), c = +b.dataset.c, w = +b.dataset.w;
      $(".gl-t", hl).innerHTML = `${COH[c]} cohort · week ${w}<br><b style="font-size:15px">${RET[c][w]}%</b> <span style="opacity:.7;font-weight:500">still active</span>`;
      hl.style.transform = `translate(${clamp(r.left - hr.left + r.width / 2 - 70, 0, hr.width - 150)}px, ${r.top - hr.top - 56}px)`;
      heat.classList.add("is-scrub"); $$("button", heat).forEach((x) => x.classList.toggle("is-hi", x === b));
    };
    $$("button", heat).forEach((b) => { b.addEventListener("pointerenter", () => showCell(b)); b.addEventListener("focus", () => showCell(b)); });
    heat.addEventListener("pointerleave", () => { heat.classList.remove("is-scrub"); $$("button", heat).forEach((x) => x.classList.remove("is-hi")); });

    /* ---------- Sortable table (FLIP) ---------- */
    const tb = $(".ws-t tbody", grid);
    let sortK = "m", dir = -1;
    const hcol = (h) => (h >= 75 ? C.green : h >= 50 ? C.yellow : C.red);
    tb.innerHTML = ACCOUNTS.map((r) => `<tr data-a="${r.a}"><td><b>${r.a}</b></td><td class="mut">${r.p}</td><td style="font-variant-numeric:tabular-nums">₹${fmt(r.m)}</td><td>${r.s}</td><td><span class="ws-h" style="--h:${r.h}%;--c:${hcol(r.h)}"><i></i></span><span class="mut2" style="margin-left:6px">${r.h}</span></td></tr>`).join("");
    const sortBy = (k, d) => {
      const rows = [...tb.children], first = new Map(rows.map((r) => [r, r.getBoundingClientRect().top]));
      if (d === undefined) d = k === sortK ? -dir : (k === "a" || k === "p" ? 1 : -1);
      sortK = k; dir = d;
      rows.sort((x, y) => { const A = ACCOUNTS.find((r) => r.a === x.dataset.a)[k], B = ACCOUNTS.find((r) => r.a === y.dataset.a)[k]; return (A > B ? 1 : A < B ? -1 : 0) * dir; }).forEach((r) => tb.appendChild(r));
      rows.forEach((r) => { const dy = first.get(r) - r.getBoundingClientRect().top; if (dy) r.animate([{ transform: `translateY(${dy}px)` }, { transform: "none" }], { duration: 420, easing: "cubic-bezier(.2,.9,.3,1)" }); });
      $$(".ws-t th", grid).forEach((th) => { const b = $("button", th), on = b.dataset.k === k; th.setAttribute("aria-sort", on ? (dir > 0 ? "ascending" : "descending") : "none"); });
    };
    $$(".ws-t th button", grid).forEach((b) => b.addEventListener("click", () => sortBy(b.dataset.k)));
    sortBy("m", -1);

    /* ---------- AI summary ---------- */
    const ai = $(".ws-ai", grid), go = $(".ws-go", grid), fb = $(".ws-fb2", grid);
    glass(go, { variant: "tinted", interactive: true });
    let busy = false;
    const flash = (name) => { const t = $(`.ws-src-${name.split(" ")[0]}`, grid); if (!t) return; t.scrollIntoView({ block: "nearest", behavior: "smooth" }); t.classList.remove("is-flash"); void t.offsetWidth; t.classList.add("is-flash"); };
    const summarize = async () => {
      if (busy) return; busy = true;
      $(".ws-gol", go).innerHTML = `${spinner(16)}<span>Summarizing…</span>`; fb.style.visibility = "hidden"; $("[data-fbn]", grid).textContent = "";
      $$("[data-f]", fb).forEach((b) => b.setAttribute("aria-pressed", "false"));
      ai.innerHTML = `<div class="ws-sk"><i style="width:92%"></i><i style="width:78%"></i><i style="width:86%"></i><i style="width:60%"></i></div>`;
      await new Promise((r) => setTimeout(r, 1300));
      ai.innerHTML = `<ul class="ws-ul"></ul><div class="mut2" style="margin-top:6px">Generated from this dashboard. Check the sources.</div>`;
      const ul = $("ul", ai);
      for (const [i, b] of BULLETS.entries()) {
        const li = document.createElement("li"); li.style.animationDelay = `${i * 380}ms`;
        li.innerHTML = `<span>${b.t}</span> ${b.src.map((s) => `<button class="chip ws-srcchip">${s}</button>`).join(" ")}`; ul.appendChild(li);
      }
      $$(".ws-srcchip", ai).forEach((c) => c.addEventListener("click", () => flash(c.textContent)));
      await new Promise((r) => setTimeout(r, 1100));
      $(".ws-gol", go).innerHTML = `${ico("sparkle", 16)}<span>Regenerate</span>`; fb.style.visibility = "visible"; busy = false;
    };
    go.addEventListener("click", summarize);
    $$("[data-f]", fb).forEach((b) => b.addEventListener("click", () => {
      const on = b.getAttribute("aria-pressed") !== "true";
      $$("[data-f]", fb).forEach((x) => x.setAttribute("aria-pressed", String(on && x === b)));
      $("[data-fbn]", grid).textContent = !on ? "" : b.dataset.f === "up" ? "Thanks. We'll keep summaries like this." : "Thanks. Tell us what was wrong to improve it.";
      b.animate([{ scale: "1.3" }, { scale: "1" }], { duration: 300, easing: "cubic-bezier(.2,.9,.3,1.4)" });
    }));

    return {
      async play(tok, d) {
        runKpis(); await d.wait(tok, 1400);
        for (const i of [1, 2, 3, -1]) { fstep(i); await d.wait(tok, 650); }
        for (const [c, w] of [[0, 1], [1, 2], [2, 3], [3, 2]]) { showCell($(`[data-c="${c}"][data-w="${w}"]`, heat)); await d.wait(tok, 600); }
        heat.dispatchEvent(new PointerEvent("pointerleave"));
        for (const k of ["h", "a", "m"]) { sortBy(k); await d.wait(tok, 900); }
        await press(go); await summarize(); await d.wait(tok, 600);
        flash("Accounts"); await d.wait(tok, 1000); $('[data-f="up"]', fb).click(); await d.wait(tok, 1000);
      },
    };
  },
};
