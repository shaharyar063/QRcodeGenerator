import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  canonicalUrlForPath,
  getAllRouteSeoMeta,
  ogImageUrlForMeta,
  type RouteSeoMeta,
} from "../src/data/route-seo.ts";
import { OG_CARD_HEIGHT, OG_CARD_WIDTH } from "../src/data/og-illustrations.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function setMeta(html: string, attr: "name" | "property", key: string, content: string): string {
  const pattern = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`, "i");
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`;
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function setLink(html: string, rel: string, href: string): string {
  const pattern = new RegExp(`<link\\s+rel="${rel}"[^>]*>`, "i");
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`;
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function patchHtml(html: string, meta: RouteSeoMeta): string {
  const canonicalUrl = canonicalUrlForPath(meta.path);
  const imageUrl = ogImageUrlForMeta(meta.ogImage);

  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);

  out = setMeta(out, "name", "description", meta.description);
  if (meta.keywords) {
    out = setMeta(out, "name", "keywords", meta.keywords);
  } else {
    out = out.replace(/\s*<meta name="keywords"[^>]*>\s*/i, "\n");
  }

  out = setLink(out, "canonical", canonicalUrl);

  out = setMeta(out, "property", "og:title", meta.title);
  out = setMeta(out, "property", "og:description", meta.description);
  out = setMeta(out, "property", "og:url", canonicalUrl);
  out = setMeta(out, "property", "og:image", imageUrl);
  out = setMeta(out, "property", "og:image:width", String(OG_CARD_WIDTH));
  out = setMeta(out, "property", "og:image:height", String(OG_CARD_HEIGHT));
  out = setMeta(out, "property", "og:image:alt", meta.title);

  out = setMeta(out, "name", "twitter:title", meta.title);
  out = setMeta(out, "name", "twitter:description", meta.description);
  out = setMeta(out, "name", "twitter:image", imageUrl);
  out = setMeta(out, "name", "twitter:image:alt", meta.title);

  if (meta.path !== "/") {
    out = out.replace(
      /\s*<!-- WebSite \+ Organization JSON-LD -->[\s\S]*?<\/script>\s*/m,
      "\n",
    );
  }

  return out;
}

async function writeRouteHtml(template: string, meta: RouteSeoMeta): Promise<void> {
  const html = patchHtml(template, meta);
  const outputPath =
    meta.path === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, meta.path.slice(1), "index.html");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

async function main(): Promise<void> {
  const templatePath = path.join(distDir, "index.html");
  const template = await readFile(templatePath, "utf8");
  const routes = getAllRouteSeoMeta();

  for (const route of routes) {
    await writeRouteHtml(template, route);
  }

  console.log(`Prerendered SEO HTML for ${routes.length} routes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
