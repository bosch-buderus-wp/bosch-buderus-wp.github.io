import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function translationFingerprint({ content, glossary, model, promptVersion }) {
  return hash(JSON.stringify({ content, glossary, model, promptVersion }));
}

export function markdownBlocks(markdown) {
  const trimmed = markdown.trim();
  return trimmed ? trimmed.split(/\r?\n[\t ]*\r?\n/) : [];
}

export function reuseTranslatedBlocks(sourceBody, targetBody, cachedSourceHashes) {
  const sourceBlocks = markdownBlocks(sourceBody);
  const targetBlocks = markdownBlocks(targetBody);
  if (!cachedSourceHashes || targetBlocks.length !== cachedSourceHashes.length) return null;

  const translationsBySourceHash = new Map();
  for (const [index, sourceHash] of cachedSourceHashes.entries()) {
    const translations = translationsBySourceHash.get(sourceHash) || [];
    translations.push(targetBlocks[index]);
    translationsBySourceHash.set(sourceHash, translations);
  }

  return sourceBlocks.map((sourceBlock) => {
    const translations = translationsBySourceHash.get(hash(sourceBlock));
    return { sourceBlock, translation: translations?.shift() ?? null };
  });
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

export function targetUrlFor(source, sourceUrl = sourceUrlFor(source, source.group)) {
  const configuredUrl = source.group.targetPermalinkByFile?.[source.relativePath];
  return configuredUrl ? normalizeUrl(configuredUrl) : translatedUrl(sourceUrl);
}

export function normalizeUrl(url) {
  const normalized = `/${url}`.replace(/\/{2,}/g, "/");
  return normalized;
}

export function finalizeTranslation(markdown, { sourceUrl, targetUrl, sidebar, routeMap }) {
  const normalizedMarkdown = markdown.replace(/\/(?:en\/){2,}/g, "/en/");
  const { frontMatter, body } = readFrontMatter(normalizedMarkdown);
  if (!frontMatter) throw new Error("Translated Markdown is missing YAML front matter");

  let updated = rewriteInternalUrls(frontMatter, routeMap)
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
  updated = updated.trimEnd();
  updated += `\nlang: en\ntranslation_url: ${sourceUrl}\ntranslation_generated: true`;

  const normalizedBody = body.replace(/^(?:\r?\n)+/, "");
  return `---\n${updated.trim()}\n---\n\n${rewriteInternalUrls(normalizedBody, routeMap).trimEnd()}\n`;
}

export function rewriteInternalUrls(markdown, routeMap) {
  let result = markdown.replace(/\/(?:en\/){2,}/g, "/en/");
  const pageRoutes = [...routeMap.entries()]
    .filter(([sourceUrl]) => sourceUrl !== "/")
    .sort(([a], [b]) => b.length - a.length);

  for (const [sourceUrl, targetUrl] of pageRoutes) {
    const previousTargetUrl = translatedUrl(sourceUrl);
    if (previousTargetUrl !== targetUrl) result = replaceRoute(result, previousTargetUrl, targetUrl);
  }

  if (pageRoutes.length > 0) {
    const alternatives = pageRoutes
      .map(([sourceUrl]) => sourceUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const routePattern = new RegExp(`(?<!/en)(${alternatives})(?=[#?'\\"\\s)]|$)`, "g");
    result = result.replace(routePattern, (sourceUrl) => routeMap.get(sourceUrl));
  }

  const rootTarget = routeMap.get("/");
  if (rootTarget) {
    result = result
      .replace(/\]\(\/\)/g, `](${rootTarget})`)
      .replace(/href=(["'])\/\1/g, `href=$1${rootTarget}$1`)
      .replace(/^(\s*url:\s*["']?)\/(["']?\s*)$/gm, `$1${rootTarget}$2`);
  }
  return result;
}

function replaceRoute(markdown, sourceUrl, targetUrl) {
  const escapedSourceUrl = sourceUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return markdown.replace(new RegExp(`${escapedSourceUrl}(?=[#?'\\"\\s)]|$)`, "g"), targetUrl);
}

export async function collectSources(root, config) {
  const sources = [];
  for (const group of config.groups) {
    const sourceRoot = path.join(root, group.sourceDirectory);
    const files = await markdownFiles(sourceRoot);
    for (const absolutePath of files) {
      const relativePath = path.relative(sourceRoot, absolutePath);
      if (group.include && !group.include.includes(relativePath)) continue;
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
