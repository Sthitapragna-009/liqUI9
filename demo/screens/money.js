// Money: investments line with a glass loupe, spending donut, budget rings with overrun,
// activity list, and a checkout that confirms in a glass sheet. MIT, (c) 2026 KSP.
import { C, tile, ring, segHTML, segmented, sliderHTML, slider, glass, smooth, fmt, clamp, lerp, tween, press, spinner, ico, $, $$ } from "./lib.js";

const rnd = (s) => () => ((s = (s * 9301 + 49297) % 233280) / 233280);
function series(n, seed, drift) {
  const r = rnd(seed); let v = 100; let o = [];
  for (let i = 0; i < n; i++) { v += (r() - 0.47 + drift) * 4; o.push(v); }
  // Two passes of a 5-point moving average: market-like, not static noise.
  for (let k = 0; k < 2; k++) o = o.map((_, i) => { const w = o.slice(Math.max(0, i - 2), i + 3); return w.reduce((a, b) => a + b, 0) / w.length; });
  return o;
}
const PERIODS = { "1D": series(60, 5, 0.01), "1W": series(60, 7, 0.02), "1M": series(60, 13, 0.03), "1Y": series(60, 29, 0.06) };
const PNAME = { "1D": "today", "1W": "this week", "1M": "this month", "1Y": "this year" };
const BASE = 458021;

const CATS = [
  { k: "Groceries", v: 8420, c: C.green, i: "bag" },
  { k: "Dining", v: 5150, c: C.orange, i: "star" },
  { k: "Transport", v: 3280, c: C.blue, i: "car" },
  { k: "Shopping", v: 6900, c: C.pink, i: "card" },
  { k: "Bills", v: 4100, c: C.purple, i: "bolt" },
];
const BUDGETS = [
  { k: "Food", cap: 12000, spent: 8420, c: C.green },
  { k: "Travel", cap: 5000, spent: 3280, c: C.blue },
  { k: "Shopping", cap: 6000, spent: 6900, c: C.pink },
];
const ACTS = [
  { n: "Blue Tokai", s: "Dining · 9:14", a: -340, c: C.orange, i: "star" },
  { n: "Metro card", s: "Transport · Yesterday", a: -500, c: C.blue, i: "car" },
  { n: "Salary", s: "Income · 1 Nov", a: 142000, c: C.green, i: "up" },
  { n: "Electricity", s: "Bills · 30 Oct", a: -2180, c: C.purple, i: "bolt" },
];

export default {
  id: "money", name: "Money", color: C.green,
  sub: "Drag across the chart, pick a category, overspend a budget, then pay.",
  mount(grid) {
    grid.innerHTML = [
      tile({ span: 8, label: "Investments", icon: "up", color: C.green, ux: "line; scrub", body: `
        <div class="hstack between wrap" style="align-items:flex-start">
          <div><div class="mut">Portfolio value</div><div class="num" data-val>₹${fmt(BASE)}</div><div class="mut" data-chg></div></div>
          ${segHTML(["1D", "1W", "1M", "1Y"], 1, "mny-period")}
        </div>
        <div class="mny-plot" style="position:relative;margin-top:12px">
          <svg class="plot" viewBox="0 0 600 190" preserveAspectRatio="none" style="height:190px" role="img" aria-label="Portfolio value over time">
            <defs><linearGradient id="mny-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${C.green}" stop-opacity=".32"/><stop offset="1" stop-color="${C.green}" stop-opacity="0"/></linearGradient></defs>
            <g stroke="var(--separator)" stroke-width=".5"><line x1="0" x2="600" y1="47" y2="47"/><line x1="0" x2="600" y1="95" y2="95"/><line x1="0" x2="600" y1="142" y2="142"/></g>
            <path data-area fill="url(#mny-area)"/><path data-line fill="none" stroke="${C.green}" stroke-width="2.5" vector-effect="non-scaling-stroke"/>
            <line data-rule y1="0" y2="190" stroke="var(--label-3)" stroke-width="1" vector-effect="non-scaling-stroke" opacity="0"/>
          </svg>
          <div class="loupe"></div><div class="glabel"><span class="gl-t"></span></div>
        </div>
        <div class="hint">Drag or hover across the line. The loupe is clear glass; the value sits on regular glass.</div>` }),
      tile({ span: 4, label: "Spending", icon: "card", color: C.pink, ux: "donut; separators", body: `
        <div style="display:grid;place-items:center;position:relative">
          <svg viewBox="0 0 200 200" width="180" height="180" class="mny-donut" role="img" aria-label="Spending by category"></svg>
          <div class="mny-dc" style="position:absolute;inset:0;display:grid;place-content:center;text-align:center;pointer-events:none"><div class="mut" data-k>November</div><div class="num-s" data-v></div></div>
        </div>
        <div class="vstack mny-legend" style="margin-top:10px;gap:2px"></div>` }),
      tile({ span: 4, label: "Budgets", icon: "timer", color: C.orange, ux: "complications; overrun", body: `
        <div class="hstack between mny-rings" style="gap:6px"></div>
        <div style="margin-top:12px">${segHTML(BUDGETS.map((b) => b.k), 2, "mny-bsel")}</div>
        <div style="margin-top:10px">${sliderHTML("mny-bsl")}</div>
        <div class="mut" data-bnote style="margin-top:4px"></div>` }),
      tile({ span: 4, label: "Activity", icon: "doc", color: C.blue, ux: "list; dividers", body: `<div class="mny-acts"></div>` }),
      tile({ span: 4, label: "Checkout", icon: "bag", color: C.teal, ux: "sheet; confirm", cls: "mny-co", body: `
        <div class="vstack" style="gap:6px">
          <div class="hstack between"><span>Atta, 5 kg</span><span>₹389</span></div>
          <div class="hstack between"><span>Basmati rice, 5 kg</span><span>₹1,240</span></div>
          <div class="hstack between"><span>Cold-pressed oil, 2 L</span><span>₹670</span></div>
          <div class="hstack between mut"><span>Delivery</span><span>₹49</span></div>
          <div class="hstack between" style="font-weight:700;border-top:.5px solid var(--separator);padding-top:8px"><span>Total</span><span>₹2,348</span></div>
        </div>
        <button class="btn btn--tinted btn--lg mny-pay" style="width:100%;margin-top:14px"><span class="pt">Pay ₹2,348</span></button>
        <button class="btn btn--plain mny-reset" style="width:100%;margin-top:4px;visibility:hidden">Start over</button>
        <div class="mny-sheet" role="dialog" aria-label="Confirm payment" aria-hidden="true">
          <div class="mny-grab"></div>
          <div class="mut">Pay Kirana Mart</div><div class="num">₹2,348</div><div class="mut2" style="margin-top:2px">From Savings ••42</div>
          <div class="hstack" style="margin-top:14px"><button class="btn btn--glass mny-cancel" style="flex:1">Cancel</button><button class="btn btn--tinted mny-confirm" style="flex:1.4">Confirm</button></div>
        </div>` }),
    ].join("");

    /* ---------- Investments ---------- */
    const inv = grid.children[0], plot = $(".mny-plot", inv), svg = $("svg", plot);
    const lineP = $("[data-line]", svg), areaP = $("[data-area]", svg), rule = $("[data-rule]", svg);
    const loupe = $(".loupe", plot), label = $(".glabel", plot), lt = $(".gl-t", label);
    glass(loupe, { variant: "clear", zoom: 0.3 }); glass(label, { variant: "regular" });
    let period = "1W", data = PERIODS[period].slice(), pts = [];
    const toPts = (d) => { const mn = Math.min(...d), mx = Math.max(...d); return d.map((v, i) => [(i / (d.length - 1)) * 600, 175 - ((v - mn) / (mx - mn || 1)) * 155]); };
    const draw = (d) => { pts = toPts(d); const p = smooth(pts); lineP.setAttribute("d", p); areaP.setAttribute("d", `${p} L600 190 L0 190 Z`); };
    const valAt = (d, i) => BASE * (d[i] / d[d.length - 1]);
    const setHead = () => {
      const d = PERIODS[period], pct = ((d.at(-1) - d[0]) / d[0]) * 100;
      const c = $("[data-chg]", inv); c.textContent = `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}% ${PNAME[period]}`; c.className = `mut ${pct >= 0 ? "pos" : "neg"}`;
      $("[data-val]", inv).textContent = `₹${fmt(BASE)}`;
    };
    draw(data); setHead();
    const per = segmented($(".mny-period", inv), (i, v) => {
      const from = data.slice(), to = PERIODS[v]; period = v; setHead();
      tween(520, (k) => { data = from.map((x, j) => lerp(x, to[j], k)); draw(data); });
    });
    const scrubAt = (fx) => {
      const r = svg.getBoundingClientRect(), i = Math.round(clamp(fx, 0, 1) * (pts.length - 1)), [px, py] = pts[i];
      const x = (px / 600) * r.width, y = (py / 190) * r.height;
      rule.setAttribute("x1", px); rule.setAttribute("x2", px); rule.setAttribute("opacity", "1");
      loupe.style.transform = `translate(${x - 23}px, ${y - 23}px)`;
      const days = { "1D": `${9 + Math.floor(i / 9)}:${String((i * 7) % 60).padStart(2, "0")}`, "1W": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][Math.min(6, Math.floor(i / 9))], "1M": `${1 + Math.floor(i / 2)} Nov`, "1Y": ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][Math.min(11, Math.floor(i / 5))] }[period];
      lt.innerHTML = `₹${fmt(valAt(PERIODS[period], i))}<br><span style="opacity:.7;font-weight:500">${days}</span>`;
      label.style.transform = `translate(${clamp(x - 52, 0, r.width - 118)}px, ${Math.max(-30, y - 78)}px)`;
      $("[data-val]", inv).textContent = `₹${fmt(valAt(PERIODS[period], i))}`;
      plot.classList.add("is-scrub");
    };
    const endScrub = () => { plot.classList.remove("is-scrub"); rule.setAttribute("opacity", "0"); setHead(); };
    const fxOf = (e) => { const r = svg.getBoundingClientRect(); return (e.clientX - r.left) / r.width; };
    svg.addEventListener("pointerdown", (e) => { svg.setPointerCapture(e.pointerId); scrubAt(fxOf(e)); });
    svg.addEventListener("pointermove", (e) => scrubAt(fxOf(e)));
    svg.addEventListener("pointerleave", endScrub); svg.addEventListener("pointerup", (e) => { if (e.pointerType !== "mouse") endScrub(); });

    /* ---------- Spending donut ---------- */
    const sp = grid.children[1], donut = $(".mny-donut", sp), legend = $(".mny-legend", sp);
    let active = -1;
    const arcD = (a0, a1, r = 78) => { const p = (a) => [100 + r * Math.cos(a), 100 + r * Math.sin(a)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1}`; };
    const drawDonut = () => {
      const total = CATS.reduce((s, c) => s + c.v, 0), gap = 0.05; let a = -Math.PI / 2;
      donut.innerHTML = CATS.map((c, i) => { const span = (c.v / total) * Math.PI * 2, a0 = a + gap / 2, a1 = a + span - gap / 2; a += span;
        return `<path d="${arcD(a0, a1)}" stroke="${c.c}" stroke-width="${i === active ? 30 : 22}" fill="none" opacity="${active < 0 || i === active ? 1 : 0.28}" data-i="${i}" style="cursor:pointer;transition:opacity .25s,stroke-width .25s" stroke-linecap="butt"/>`; }).join("");
      legend.innerHTML = CATS.map((c, i) => `<button class="mny-lg" data-i="${i}" aria-pressed="${i === active}" style="--c:${c.c}"><span class="dot"></span><span>${c.k}</span><span class="mut" style="margin-left:auto">₹${fmt(c.v)}</span></button>`).join("");
      const t = active < 0 ? null : CATS[active];
      $("[data-k]", sp).textContent = t ? t.k : "November"; $("[data-v]", sp).textContent = `₹${fmt(t ? t.v : total)}`;
      $("[data-v]", sp).style.color = t ? t.c : "";
    };
    const pick = (i) => { active = active === i ? -1 : i; drawDonut(); };
    sp.addEventListener("click", (e) => { const n = e.target.closest("[data-i]"); if (n) pick(+n.dataset.i); });
    drawDonut();

    /* ---------- Budgets ---------- */
    const bu = grid.children[2], rings = $(".mny-rings", bu), note = $("[data-bnote]", bu);
    let bsel = 2;
    const drawRings = () => {
      rings.innerHTML = BUDGETS.map((b, i) => `<div style="text-align:center;opacity:${i === bsel ? 1 : 0.6};transition:opacity .2s">${ring({ v: b.spent / b.cap, c: b.c, value: `${Math.round((b.spent / b.cap) * 100)}`, label: "%", size: 78, sw: 8 })}<div class="mut2" style="margin-top:4px">${b.k}</div></div>`).join("");
      const b = BUDGETS[bsel], over = b.spent - b.cap;
      note.innerHTML = `₹${fmt(b.spent)} of ₹${fmt(b.cap)} · ${over > 0 ? `<span class="neg">₹${fmt(over)} over</span>` : `₹${fmt(-over)} left`}`;
    };
    const bsl = slider($(".mny-bsl", bu), (p) => { BUDGETS[bsel].spent = Math.round((p * 1.5 * BUDGETS[bsel].cap) / 10) * 10; drawRings(); }, BUDGETS[bsel].spent / BUDGETS[bsel].cap / 1.5);
    $(".mny-bsl", bu).setAttribute("aria-label", "Amount spent");
    const bseg = segmented($(".mny-bsel", bu), (i) => { bsel = i; bsl.set(BUDGETS[i].spent / BUDGETS[i].cap / 1.5, false); drawRings(); });
    drawRings();

    /* ---------- Activity ---------- */
    const acts = $(".mny-acts", grid.children[3]);
    const row = (a, isNew) => `<div class="mny-row${isNew ? " is-new" : ""}" style="--c:${a.c}"><span class="mny-ic">${ico(a.i, 16)}</span><div style="min-width:0"><div class="mny-n">${a.n}</div><div class="mut2">${a.s}</div></div><div class="${a.a > 0 ? "pos" : ""}" style="margin-left:auto;font-weight:600;font-variant-numeric:tabular-nums">${a.a > 0 ? "+" : "−"}₹${fmt(Math.abs(a.a))}</div></div>`;
    acts.innerHTML = ACTS.map((a) => row(a)).join("");
    const addAct = (a) => { acts.insertAdjacentHTML("afterbegin", row(a, true)); if (acts.children.length > 5) acts.lastElementChild.remove(); };

    /* ---------- Checkout ---------- */
    const co = grid.children[4], pay = $(".mny-pay", co), sheet = $(".mny-sheet", co), reset = $(".mny-reset", co);
    glass(pay, { variant: "tinted", interactive: true }); glass(sheet, { variant: "regular", radius: 22, frost: 7 });
    glass($(".mny-confirm", co), { variant: "tinted", interactive: true }); glass($(".mny-cancel", co), { variant: "regular", interactive: true });
    let state = "idle";
    const pt = $(".pt", pay);
    const openSheet = (on) => { sheet.classList.toggle("is-open", on); sheet.setAttribute("aria-hidden", String(!on)); sheet.closest(".st").classList.toggle("has-sheet", on); };
    const setPay = (s) => {
      state = s;
      pay.style.setProperty("--lg-tint-color", s === "paid" ? "var(--green)" : "");
      pt.innerHTML = s === "idle" ? "Pay ₹2,348" : s === "processing" ? `${spinner(18)} Processing…` : `${ico("check", 18)} Paid`;
      pt.style.display = "inline-flex"; pt.style.alignItems = "center"; pt.style.gap = "8px";
      reset.style.visibility = s === "paid" ? "visible" : "hidden";
    };
    pay.addEventListener("click", () => { if (state === "idle") openSheet(true); });
    $(".mny-cancel", co).addEventListener("click", () => openSheet(false));
    const confirm = async () => {
      openSheet(false); setPay("processing");
      await new Promise((r) => setTimeout(r, 1400));
      setPay("paid");
      addAct({ n: "Kirana Mart", s: "Groceries · now", a: -2348, c: C.green, i: "bag" });
      CATS[0].v += 2348; drawDonut();
      BUDGETS[0].spent += 2348; if (bsel === 0) bsl.set(BUDGETS[0].spent / BUDGETS[0].cap / 1.5, false); drawRings();
    };
    $(".mny-confirm", co).addEventListener("click", confirm);
    reset.addEventListener("click", () => setPay("idle"));

    return {
      async play(tok, d) {
        inv.scrollIntoView({ block: "nearest", behavior: "smooth" });
        await d.wait(tok, 500); per.select(2); await d.wait(tok, 800);
        for (let k = 0; k <= 1.0001; k += 0.025) { scrubAt(0.08 + k * 0.86); await d.wait(tok, 40); }
        await d.wait(tok, 500); endScrub();
        for (const i of [0, 3, 1]) { pick(i); await d.wait(tok, 750); } pick(1);
        bseg.select(2); await d.wait(tok, 400); await bsl.animateTo(0.95, 1100); await d.wait(tok, 700);
        if (state === "paid") { setPay("idle"); await d.wait(tok, 400); }
        await press(pay); openSheet(true); await d.wait(tok, 1200);
        await press($(".mny-confirm", co)); await confirm(); await d.wait(tok, 1500);
      },
    };
  },
};
