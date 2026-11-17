// Buttons: the material switcher, styles x sizes, roles with a destructive confirm, a toolbar
// with a gliding selection and a morphing pull-down menu, and press / load / hold states. MIT, (c) 2026 KSP.
import { C, tile, segHTML, segmented, glass, spring, liquidStretch, ico, spinner, press, tween, $, $$ } from "./lib.js";

const NOTES = {
  clear: "Clear: barely tinted, for rich media. Add a dimming layer if labels need it.",
  regular: "Regular: the default. Frosted and refracted, adapts to what's behind it.",
  tinted: "Tinted: colour in the glass body, reserved for the one primary action.",
};

export default {
  id: "buttons", name: "Buttons", color: C.blue,
  sub: "Switch the material, press every style, confirm a destructive action, open the menu, hold to pay.",
  mount(grid) {
    grid.innerHTML = [
      tile({ span: 6, label: "Glass material", icon: "sparkle", color: C.cyan, ux: "clear; regular; tinted", body: `
        <div class="bd bd--photo btn-mat"><div class="btn-panel"><span><b style="font:700 28px/1 var(--font-display)">Aa</b><br><small data-vn>Regular</small></span></div></div>
        <div class="hstack between wrap" style="margin-top:12px">${segHTML(["Clear", "Regular", "Tinted"], 1, "btn-var")}<span class="mut2" data-note style="flex:1;min-width:180px">${NOTES.regular}</span></div>` }),
      tile({ span: 6, label: "Button styles", icon: "plus", color: C.blue, ux: "styles x sizes", body: `
        <div class="bd bd--stripes btn-grid">
          ${["sm", "", "lg"].map((s) => `<div class="hstack wrap" style="gap:10px">
            <button class="btn btn--glass ${s && `btn--${s}`}" data-g="regular">Glass</button>
            <button class="btn btn--tinted ${s && `btn--${s}`}" data-g="tinted">Tinted</button>
            <button class="btn btn--gray ${s && `btn--${s}`}">Gray</button>
            <button class="btn btn--plain ${s && `btn--${s}`}">Plain</button></div>`).join("")}
        </div>
        <div class="hint">Small, medium, large. Keep one size within a set; hierarchy comes from style.</div>` }),
      tile({ span: 5, label: "Roles", icon: "bolt", color: C.red, ux: "accent; destructive", cls: "btn-roles", body: `
        <div class="bd bd--warm" style="display:grid;gap:12px;padding:16px">
          <div class="btn-photo" aria-label="Photo"><span>IMG_2048</span></div>
          <div class="hstack" style="gap:10px"><button class="btn btn--glass" data-g="regular" style="flex:1">${ico("share", 16)}<span>Share</span></button><button class="btn btn--glass btn--destructive btn-del" data-g="regular" style="flex:1"><span>Delete</span></button></div>
        </div>
        <div class="btn-sheet" role="dialog" aria-label="Delete photo" aria-hidden="true">
          <div class="mut" style="color:rgb(255 255 255 / .75);margin-bottom:10px">This photo will be deleted from all your devices.</div>
          <button class="btn btn--tinted btn--destructive btn-del2" style="width:100%"><span>Delete Photo</span></button>
          <button class="btn btn--glass btn-cancel" style="width:100%;margin-top:8px;color:#fff"><span>Cancel</span></button>
        </div>
        <div class="btn-toast" aria-live="polite"><span>Photo deleted</span><button class="btn btn--plain btn--sm btn-undo">Undo</button></div>` }),
      tile({ span: 7, label: "Icons, toolbars, menus", icon: "star", color: C.purple, ux: "capsule; morph", body: `
        <div class="bd bd--cool btn-tb">
          <div class="toolbar__group btn-tools" role="toolbar" aria-label="Markup tools">
            <span class="btn-bead"></span>
            ${[["sparkle", "Highlight"], ["star", "Favourite"], ["doc", "Notes"], ["share", "Share"]].map(([i, n], k) => `<button class="btn btn--icon" aria-label="${n}" aria-pressed="${k === 0}">${ico(i, 20)}</button>`).join("")}
          </div>
          <div style="position:relative">
            <button class="btn btn--glass btn--icon btn-more" aria-label="More" aria-haspopup="menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button>
            <div class="btn-menu" role="menu" aria-hidden="true">
              ${[["doc", "Duplicate"], ["star", "Favourite"], ["share", "Share…"], ["plus", "Add to Album"]].map(([i, n]) => `<button role="menuitem">${ico(i, 18)}<span>${n}</span></button>`).join("")}
              <button role="menuitem" class="danger">${ico("minus", 18)}<span>Delete</span></button>
            </div>
          </div>
        </div>
        <div class="mut2" data-tbn style="margin-top:8px">Tool: Highlight</div>` }),
      tile({ span: 12, label: "States", icon: "timer", color: C.orange, ux: "press; load; hold", body: `
        <div class="bd bd--photo btn-states">
          <div class="btn-state"><button class="btn btn--glass btn--lg" data-g="regular"><span>Press and hold</span></button><div class="mut2">Press: squish and flare</div></div>
          <div class="btn-state"><button class="btn btn--tinted btn--lg btn-save" style="min-width:150px"><span class="st-l">Save</span></button><div class="mut2">Load: spinner, then a result</div></div>
          <div class="btn-state"><div class="btn-hold"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" stroke="rgb(255 255 255 / .25)" stroke-width="5" fill="none"/><circle class="hr" cx="50" cy="50" r="46" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" transform="rotate(-90 50 50)"/></svg>
            <button class="btn btn--tinted btn-holdb" aria-label="Hold to pay"><span class="hl">Hold<br>to Pay</span></button></div><div class="mut2">Hold: commit only when complete</div></div>
        </div>` }),
    ].join("");
    $$("[data-g]", grid).forEach((b) => glass(b, { variant: b.dataset.g, interactive: true }));

    /* ---------- Material switcher ---------- */
    const panel = $(".btn-panel", grid);
    let mat = glass(panel, { variant: "regular" });
    const vseg = segmented($(".btn-var", grid), (i, v) => {
      const key = v.toLowerCase();
      mat.destroy(); mat = glass(panel, { variant: key, ...(key === "clear" ? { dim: 0.15 } : {}) });
      $("[data-vn]", grid).textContent = v; $("[data-note]", grid).textContent = NOTES[key];
      panel.animate([{ transform: "scale(.94)" }, { transform: "scale(1.03)" }, { transform: "none" }], { duration: 450, easing: "ease-out" });
    });

    /* ---------- Roles ---------- */
    const roles = $(".btn-roles", grid), sheet = $(".btn-sheet", roles), toast = $(".btn-toast", roles), photo = $(".btn-photo", roles);
    glass(sheet, { variant: "regular", radius: 22, frost: 7 }); glass($(".btn-del2", roles), { variant: "tinted", interactive: true }); glass($(".btn-cancel", roles), { variant: "regular", interactive: true });
    glass(toast, { variant: "regular" });
    const openSheet = (on) => { sheet.classList.toggle("is-open", on); sheet.setAttribute("aria-hidden", String(!on)); sheet.closest(".st").classList.toggle("has-sheet", on); };
    let tt = 0;
    const del = () => { openSheet(false); photo.classList.add("is-gone"); toast.classList.add("is-on"); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove("is-on"), 4000); };
    const undo = () => { photo.classList.remove("is-gone"); toast.classList.remove("is-on"); };
    $(".btn-del", roles).addEventListener("click", () => { if (!photo.classList.contains("is-gone")) openSheet(true); });
    $(".btn-cancel", roles).addEventListener("click", () => openSheet(false));
    $(".btn-del2", roles).addEventListener("click", del);
    $(".btn-undo", roles).addEventListener("click", undo);

    /* ---------- Toolbar bead + morphing menu ---------- */
    const tools = $(".btn-tools", grid), bead = $(".btn-bead", tools), tbtn = $$("button", tools);
    glass(tools, { variant: "regular" });
    let bx = 0, cancelBead = () => {};
    const moveBead = (i, anim = true) => {
      tbtn.forEach((b, j) => b.setAttribute("aria-pressed", String(i === j)));
      const to = tbtn[i].offsetLeft; bead.style.width = `${tbtn[i].offsetWidth}px`;
      $("[data-tbn]", grid).textContent = `Tool: ${tbtn[i].getAttribute("aria-label")}`;
      cancelBead();
      if (!anim) { bx = to; bead.style.transform = `translateX(${to}px)`; return; }
      cancelBead = spring(bx, to, (v, vel) => { bx = v; const { sx, sy } = liquidStretch(vel); bead.style.transform = `translateX(${v}px) scale(${sx},${sy})`; }, { response: 0.4, damping: 0.8 });
    };
    tbtn.forEach((b, i) => b.addEventListener("click", () => moveBead(i)));
    requestAnimationFrame(() => moveBead(0, false));
    new ResizeObserver(() => moveBead(tbtn.findIndex((b) => b.getAttribute("aria-pressed") === "true"), false)).observe(tools);

    const more = $(".btn-more", grid), menu = $(".btn-menu", grid);
    glass(more, { variant: "regular", interactive: true }); glass(menu, { variant: "regular", radius: 22 });
    const setMenu = (on) => {
      if (on === menu.classList.contains("is-open")) return;
      menu.classList.toggle("is-open", on); menu.setAttribute("aria-hidden", String(!on)); more.setAttribute("aria-expanded", String(on));
      const sx = more.offsetWidth / menu.offsetWidth, sy = more.offsetHeight / menu.offsetHeight;
      const closed = { transform: `scale(${sx}, ${sy})`, borderRadius: "999px", opacity: 0.2 }, open = { transform: "none", borderRadius: "22px", opacity: 1 };
      menu.animate(on ? [closed, { transform: "scale(1.03, 1.02)", offset: 0.7 }, open] : [open, closed], { duration: on ? 460 : 260, easing: on ? "cubic-bezier(.2,.9,.3,1)" : "ease-in", fill: "both" });
      more.style.opacity = on ? "0" : "";
    };
    more.addEventListener("click", (e) => { e.stopPropagation(); setMenu(true); });
    menu.addEventListener("click", (e) => { if (e.target.closest("button")) setMenu(false); });
    document.addEventListener("pointerdown", (e) => { if (!menu.contains(e.target) && e.target !== more) setMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

    /* ---------- States ---------- */
    const save = $(".btn-save", grid); glass(save, { variant: "tinted", interactive: true });
    let saving = false;
    const doSave = async () => {
      if (saving) return; saving = true; const l = $(".st-l", save);
      l.innerHTML = `${spinner(18)}<span>Saving…</span>`; await new Promise((r) => setTimeout(r, 1300));
      save.style.setProperty("--lg-tint-color", "var(--green)"); l.innerHTML = `${ico("check", 18)}<span>Saved</span>`;
      await new Promise((r) => setTimeout(r, 1500)); save.style.removeProperty("--lg-tint-color"); l.textContent = "Save"; saving = false;
    };
    save.addEventListener("click", doSave);

    const holdB = $(".btn-holdb", grid), hr = $(".hr", grid), hl = $(".hl", grid);
    glass(holdB, { variant: "tinted", interactive: true });
    let p = 0, raf = 0, holding = false, done = false;
    const setP = (v) => { p = v; hr.setAttribute("stroke-dashoffset", String(100 - v * 100)); };
    const tick = (t0, p0) => (t) => {
      if (!holding) return;
      setP(Math.min(1, p0 + (t - t0) / 1300));
      if (p >= 1) { done = true; holding = false; holdB.style.setProperty("--lg-tint-color", "var(--green)"); hl.innerHTML = `${ico("check", 26)}`; setTimeout(resetHold, 2200); return; }
      raf = requestAnimationFrame(tick(t0, p0));
    };
    const resetHold = () => { done = false; holdB.style.removeProperty("--lg-tint-color"); hl.innerHTML = "Hold<br>to Pay"; spring(p, 0, setP, { response: 0.5 }); };
    const startHold = () => { if (done) return; holding = true; cancelAnimationFrame(raf); raf = requestAnimationFrame(tick(performance.now(), p)); };
    const endHold = () => { if (!holding) return; holding = false; cancelAnimationFrame(raf); if (!done) spring(p, 0, setP, { response: 0.45 }); };
    holdB.addEventListener("pointerdown", startHold);
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => holdB.addEventListener(ev, endHold));
    holdB.addEventListener("keydown", (e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); startHold(); } });
    holdB.addEventListener("keyup", (e) => { if (e.key === " " || e.key === "Enter") endHold(); });

    return {
      async play(tok, d) {
        for (const i of [0, 2, 1]) { vseg.select(i); await d.wait(tok, 1100); }
        for (const b of $$(".btn-grid .btn", grid).slice(0, 8)) { await press(b, 140); await d.wait(tok, 60); }
        await d.wait(tok, 300);
        await press($(".btn-del", roles)); openSheet(true); await d.wait(tok, 1100); await press($(".btn-del2", roles)); del(); await d.wait(tok, 1200); undo();
        for (const i of [2, 1, 3, 0]) { moveBead(i); await d.wait(tok, 520); }
        setMenu(true); await d.wait(tok, 1400); setMenu(false); await d.wait(tok, 400);
        doSave(); await d.wait(tok, 1600);
        holdB.classList.add("is-pressed"); startHold(); await d.wait(tok, 1500); holdB.classList.remove("is-pressed"); await d.wait(tok, 1200);
      },
    };
  },
};
