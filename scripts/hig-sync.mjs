// hig-sync: download Apple HIG pages to a git-ignored local cache and report what changed
// since the liqUI9 digests were last written. Never commit the cache: Apple owns that text.
// Usage: node scripts/hig-sync.mjs            -> report added / removed / changed pages
//        node scripts/hig-sync.mjs --update   -> also rewrite scripts/hig-manifest.json
import fs from "node:fs";
import path from "node:path";

const BASE = "https://developer.apple.com/tutorials/data/design/human-interface-guidelines/";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, ".hig-cache");
const MANIFEST = path.join(ROOT, "scripts", "hig-manifest.json");
const UPDATE = process.argv.includes("--update");
fs.mkdirSync(OUT, { recursive: true });
const SECTIONS = ["getting-started", "foundations", "patterns", "components", "inputs", "technologies"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(slug) {
  let err;
  for (let a = 0; a < 3; a++) {
    try {
      const r = await fetch(BASE + slug + ".json");
      if (r.ok) return await r.json();
      err = r.status;
    } catch (e) { err = e.message; }
    await sleep(1500);
  }
  console.log("FAIL", slug, err);
  return null;
}
const slugOf = (ref) => (ref.url || "").replace(/\/$/, "").split("/").pop();

function inline(items, refs) {
  let s = "";
  for (const it of items || []) {
    const t = it.type;
    if (t === "text") s += it.text;
    else if (t === "codeVoice") s += "`" + it.code + "`";
    else if (t === "emphasis" || t === "strong" || t === "newTerm") {
      const w = t === "emphasis" ? "*" : "**";
      s += w + inline(it.inlineContent, refs) + w;
    } else if (t === "reference") {
      const r = refs[it.identifier] || {};
      s += r.title || it.overridingTitle || "";
    } else if (t === "image") {
      const r = refs[it.identifier] || {};
      if (r.alt) s += `[image: ${r.alt}]`;
    } else if (it.inlineContent) s += inline(it.inlineContent, refs);
  }
  return s;
}

function blocks(items, refs, depth = 0) {
  const out = [];
  const pad = "  ".repeat(depth);
  for (const b of items || []) {
    const t = b.type;
    if (t === "heading") out.push("\n" + "#".repeat(Math.min(6, (b.level || 2) + 1)) + " " + (b.text || ""));
    else if (t === "paragraph") out.push(pad + inline(b.inlineContent, refs));
    else if (t === "unorderedList" || t === "orderedList") {
      (b.items || []).forEach((li, i) => {
        const body = blocks(li.content, refs, depth + 1).trim();
        out.push(`${pad}${t === "orderedList" ? i + 1 + "." : "-"} ${body}`);
      });
    } else if (t === "aside") out.push(pad + "> " + (b.name || b.style || "Note") + ": " + blocks(b.content, refs).trim());
    else if (t === "table") {
      for (const row of b.rows || []) out.push("| " + row.map((c) => blocks(c, refs).trim().replace(/\n/g, " ")).join(" | ") + " |");
    } else if (t === "termList") {
      for (const it of b.items || []) out.push(`- **${inline(it.term.inlineContent, refs)}**: ${blocks(it.definition.content, refs).trim()}`);
    } else if (t === "row") {
      for (const col of b.columns || []) out.push(blocks(col.content, refs, depth));
    } else if (t === "tabNavigator") {
      for (const tab of b.tabs || []) out.push(`${pad}[${tab.title}] ` + blocks(tab.content, refs, depth).trim());
    } else if (b.inlineContent) out.push(pad + inline(b.inlineContent, refs));
    else if (b.content) out.push(blocks(b.content, refs, depth));
  }
  return out.join("\n");
}

function pageMd(j, slug, section, group) {
  const refs = j.references || {};
  const title = (j.metadata && j.metadata.title) || slug;
  let body = "";
  for (const sec of j.primaryContentSections || []) body += blocks(sec.content, refs) + "\n";
  return `# ${title}\nsection: ${section}${group ? " / " + group : ""}\nurl: https://developer.apple.com/design/human-interface-guidelines/${slug}\n\n${inline(j.abstract, refs)}\n${body}`;
}

const index = [];
for (const sec of SECTIONS) {
  const sj = await get(sec);
  if (!sj) continue;
  for (const ts of sj.topicSections || []) {
    for (const ident of ts.identifiers) {
      const ref = sj.references[ident];
      if (!ref) continue;
      const slug = slugOf(ref);
      const pj = await get(slug);
      if (!pj) continue;
      const children = (pj.topicSections || []).flatMap((t) => t.identifiers).map((i) => pj.references[i]).filter(Boolean);
      if (sec === "components" && children.length) {
        for (const c of children) {
          const cs = slugOf(c);
          const cj = await get(cs);
          if (!cj) continue;
          const md = pageMd(cj, cs, sec, ref.title);
          fs.writeFileSync(path.join(OUT, `${sec}__${cs}.md`), md);
          index.push([sec, ref.title, c.title, cs, md]);
        }
      } else {
        const md = pageMd(pj, slug, sec);
        fs.writeFileSync(path.join(OUT, `${sec}__${slug}.md`), md);
        index.push([sec, "", ref.title, slug, md]);
      }
      await sleep(150);
    }
  }
}
const hash = (t) => crypto.createHash("sha256").update(t).digest("hex").slice(0, 16);
const now = Object.fromEntries(index.map(([sec, group, title, slug, md]) => [slug, { section: sec, group, title, sha: hash(md) }]));
const old = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")).pages : {};
const added = Object.keys(now).filter((k) => !old[k]);
const removed = Object.keys(old).filter((k) => !now[k]);
const changed = Object.keys(now).filter((k) => old[k] && old[k].sha !== now[k].sha);
console.log(`${index.length} pages. added ${added.length}, removed ${removed.length}, changed ${changed.length}`);
for (const [label, list] of [["added", added], ["removed", removed], ["changed", changed]])
  for (const k of list) console.log(`  ${label.padEnd(8)} ${(now[k] || old[k]).section}/${k}`);
if (UPDATE) {
  fs.writeFileSync(MANIFEST, JSON.stringify({ synced: new Date().toISOString().slice(0, 10), pages: now }, null, 2) + "\n");
  console.log("manifest updated:", path.relative(ROOT, MANIFEST));
} else if (added.length + removed.length + changed.length) {
  console.log("Update the matching reference digests, then run again with --update.");
}
