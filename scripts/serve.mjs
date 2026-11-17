// Tiny static server for the LiqUI demo (ES modules need http://, not file://).
// Usage: node scripts/serve.mjs [port]   then open http://localhost:4321/demo/
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.argv[2] || process.env.PORT || 4321);
const types = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json", ".md": "text/markdown" };

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p === "/") p = "/demo/";
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(root, p);
  if (!file.startsWith(root) || file.includes(`${path.sep}.hig-cache`)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404).end("Not found"); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" }).end(data);
  });
}).listen(port, () => console.log(`LiqUI demo: http://localhost:${port}/demo/`));
