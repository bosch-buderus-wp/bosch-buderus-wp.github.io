import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function readFrontMatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { frontMatter: "", body: markdown };
  return { frontMatter: match[1], body: markdown.slice(match[0].length) };
}

export function frontMatterValue(frontMatter, key) {
  const match = frontMatter.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?\\s*$`, "m"));
  return match?.[1]?.trim();
}

export function sourceUrlFor(source, group) {
  const { frontMatter } = readFrontMatter(source.content);
  const permalink = frontMatterValue(frontMatter, "permalink");
  if (permalink) return normalizeUrl(permalink);

  const basename = path.basename(source.relativePath, path.extname(source.relativePath)).toLowerCase();
  if (group.sourceDirectory === "_docs") return `/docs/${basename}/`;
  if (group.sourceDirectory === "_xps") return `/xps/${basename}/`;
  return `/${basename}/`;
}

export function translatedUrl(sourceUrl) {
  if (sourceUrl === "/") return "/en/";
  return normalizeUrl(`/en${sourceUrl}`);
}

export function normalizeUrl(url) {
  const normalized = `/${url}`.replace(/\/{2,}/g, "/");
  return normalized;
}

export function finalizeTranslation(markdown, { sourceUrl, targetUrl, sidebar, routeMap }) {
  const { frontMatter, body } = readFrontMatter(markdown);
  if (!frontMatter) throw new Error("Translated Markdown is missing YAML front matter");

  let updated = frontMatter
    .replace(/^lang:\s*.*(?:\r?\n|$)/gm, "")
    .replace(/^translation_url:\s*.*(?:\r?\n|$)/gm, "")
    .replace(/^translation_generated:\s*.*(?:\r?\n|$)/gm, "")
    .replace(/^permalink:\s*.*$/m, `permalink: ${targetUrl}`);

  if (!/^permalink:/m.test(updated)) updated += `\npermalink: ${targetUrl}`;
  if (sidebar) {
    if (/^(\s*)nav:\s*["']?.+?["']?\s*$/m.test(updated)) {
      updated = updated.replace(/^(\s*)nav:\s*["']?.+?["']?\s*$/m, `$1nav: "${sidebar}"`);
    } else {
      updated += `\nsidebar:\n  nav: "${sidebar}"`;
    }
  }
  updated += `\nlang: en\ntranslation_url: ${sourceUrl}\ntranslation_generated: true`;

  return `---\n${rewriteInternalUrls(updated.trim(), routeMap)}\n---\n\n${rewriteInternalUrls(body, routeMap).trimEnd()}\n`;
}

export function rewriteInternalUrls(markdown, routeMap) {
  const routes = [...routeMap.entries()].sort(([a], [b]) => b.length - a.length);
  let result = markdown;
  for (const [sourceUrl, targetUrl] of routes) {
    if (sourceUrl === "/") {
      result = result
        .replace(/\]\(\/\)/g, `](${targetUrl})`)
        .replace(/href=(["'])\/\1/g, `href=$1${targetUrl}$1`)
        .replace(/^(\s*url:\s*["']?)\/(["']?\s*)$/gm, `$1${targetUrl}$2`);
      continue;
    }
    const escaped = sourceUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const boundary = sourceUrl.endsWith("/") ? "" : "(?=[#?/'\\\"\\s)]|$)";
    result = result.replace(new RegExp(`${escaped}${boundary}`, "g"), targetUrl);
  }
  return result;
}

export async function collectSources(root, config) {
  const sources = [];
  for (const group of config.groups) {
    const sourceRoot = path.join(root, group.sourceDirectory);
    const files = await markdownFiles(sourceRoot);
    for (const absolutePath of files) {
      const relativePath = path.relative(sourceRoot, absolutePath);
      if (group.include && !group.include.includes(relativePath)) continue;
      if (config.excludeFilenameSuffixes.some((suffix) => relativePath.endsWith(suffix))) continue;
      sources.push({
        absolutePath,
        relativePath,
        targetPath: path.join(root, group.targetDirectory, relativePath),
        group,
        content: await readFile(absolutePath, "utf8"),
      });
    }
  }
  return sources.sort((a, b) => a.absolutePath.localeCompare(b.absolutePath));
}

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(entryPath)));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(entryPath);
  }
  return files;
}
