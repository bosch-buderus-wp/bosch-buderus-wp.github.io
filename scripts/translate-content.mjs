#!/usr/bin/env node

import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  collectSources,
  finalizeTranslation,
  hash,
  markdownBlocks,
  readFrontMatter,
  reuseTranslatedBlocks,
  sourceUrlFor,
  translationFingerprint,
  translatedUrl,
} from "./translation-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(await readFile(path.join(root, "translation/config.json"), "utf8"));
const glossary = await readFile(path.join(root, "translation/glossary.yml"), "utf8");
const manifestPath = path.join(root, ".translation-cache.json");
const forceAll = process.argv.includes("--all");
const dryRun = process.argv.includes("--dry-run");
const repairOnly = process.argv.includes("--repair");
const model = process.env.OPENAI_TRANSLATION_MODEL || config.defaultModel;
const apiKey = process.env.OPENAI_API_KEY;
const fingerprintVersion = 2;
const segmentVersion = 1;

const sources = await collectSources(root, config);
const routeMap = new Map(
  sources.map((source) => {
    const sourceUrl = sourceUrlFor(source, source.group);
    return [sourceUrl, translatedUrl(sourceUrl)];
  }),
);
const manifest = await readJson(manifestPath, { version: 1, files: {} });
const migrateFingerprints = manifest.fingerprintVersion !== fingerprintVersion;
const migrateSegments = manifest.segmentVersion !== segmentVersion;
const currentKeys = new Set();
let translated = 0;
let repaired = 0;
let skipped = 0;

for (const source of sources) {
  const sourceKey = path.relative(root, source.absolutePath);
  const targetKey = path.relative(root, source.targetPath);
  const sourceUrl = sourceUrlFor(source, source.group);
  const sourceHash = hash(source.content);
  const fingerprint = translationFingerprint({
    content: source.content,
    glossary,
    model,
    promptVersion: config.promptVersion,
  });
  currentKeys.add(sourceKey);

  const targetExists = await fileExists(source.targetPath);
  const cached = manifest.files[sourceKey];
  if (repairOnly) {
    if (!targetExists) {
      console.log(`Skipping missing translation ${targetKey}`);
      continue;
    }
    const cachedSourceHash = manifest.files[sourceKey]?.sourceHash;
    if (cachedSourceHash && cachedSourceHash !== sourceHash) {
      console.log(`Skipping stale translation ${targetKey}; source content changed`);
      continue;
    }
    const currentTranslation = await readFile(source.targetPath, "utf8");
    const repairedTranslation = finalizeTranslation(currentTranslation, {
      sourceUrl,
      targetUrl: routeMap.get(sourceUrl),
      sidebar: source.group.sidebarByFile?.[source.relativePath] || source.group.sidebar,
      routeMap,
    });
    if (currentTranslation !== repairedTranslation) {
      console.log(`${dryRun ? "Would repair" : "Repairing"} ${targetKey}`);
      if (!dryRun) await atomicWrite(source.targetPath, repairedTranslation);
      repaired += 1;
    }
    if (!dryRun) {
      const entry = { fingerprint, sourceHash, target: targetKey };
      addSegmentMetadata(entry, source.content, repairedTranslation);
      manifest.files[sourceKey] = entry;
    }
    continue;
  }

  if (!forceAll && targetExists && migrateFingerprints && cached?.sourceHash === sourceHash) {
    if (!dryRun) {
      cached.fingerprint = fingerprint;
      addSegmentMetadata(cached, source.content, await readFile(source.targetPath, "utf8"));
    }
    skipped += 1;
    continue;
  }

  if (!forceAll && targetExists && manifest.files[sourceKey]?.fingerprint === fingerprint) {
    if (!dryRun && migrateSegments) {
      addSegmentMetadata(cached, source.content, await readFile(source.targetPath, "utf8"));
    }
    skipped += 1;
    continue;
  }

  if (dryRun) {
    console.log(`Would translate ${sourceKey} -> ${targetKey}`);
    continue;
  }
  if (!apiKey) throw new Error("OPENAI_API_KEY is required to translate changed files");

  let rawTranslation;
  if (!forceAll && targetExists && cached?.sourceHash !== sourceHash && cached?.bodyBlockSourceHashes) {
    rawTranslation = await translateIncrementally(source.content, await readFile(source.targetPath, "utf8"), cached, {
      apiKey,
      model,
      glossary,
      config,
      sourceKey,
    });
  }
  if (!rawTranslation) {
    console.log(`Translating ${sourceKey} -> ${targetKey} with ${model}`);
    rawTranslation = await translate(source.content, { apiKey, model, glossary, config });
  }
  const result = finalizeTranslation(rawTranslation, {
    sourceUrl,
    targetUrl: routeMap.get(sourceUrl),
    sidebar: source.group.sidebarByFile?.[source.relativePath] || source.group.sidebar,
    routeMap,
  });
  await mkdir(path.dirname(source.targetPath), { recursive: true });
  await atomicWrite(source.targetPath, result);
  const entry = { fingerprint, sourceHash, target: targetKey };
  addSegmentMetadata(entry, source.content, result);
  manifest.files[sourceKey] = entry;
  translated += 1;
}

for (const [sourceKey, entry] of Object.entries(manifest.files)) {
  if (currentKeys.has(sourceKey)) continue;
  if (!dryRun) {
    const target = path.resolve(root, entry.target);
    if (!target.startsWith(`${root}${path.sep}`)) throw new Error(`Unsafe cached target: ${entry.target}`);
    await rm(target, { force: true });
    delete manifest.files[sourceKey];
  }
  console.log(`Removed translation for deleted source ${sourceKey}`);
}

if (!dryRun) {
  manifest.fingerprintVersion = fingerprintVersion;
  manifest.segmentVersion = segmentVersion;
  await atomicWrite(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}
console.log(
  dryRun
    ? `Dry run complete: ${sources.length} source files found, ${repaired} translations need repair`
    : `Done: ${translated} translated, ${repaired} repaired, ${skipped} unchanged`,
);

async function translate(markdown, { apiKey, model, glossary, config, fragment = false }) {
  const scope = fragment
    ? `Translate the provided Markdown fragment from ${config.sourceLanguage} to ${config.targetLanguage}.
Return only the translated fragment. Preserve its outer structure and do not add a code fence.`
    : `Translate the complete Markdown document from ${config.sourceLanguage} to ${config.targetLanguage}.
Return only the complete translated Markdown document, starting with its YAML front matter. Do not use a code fence.`;
  const instructions = `You are a technical translator for a German website about Bosch and Buderus heat pumps.
${scope}
Preserve YAML keys, Markdown structure, Liquid tags, HTML, code blocks, inline code, formulas, URLs, anchors, file names, product names, entity IDs, API names, and Bosch/Buderus parameter names exactly.
Translate human-readable YAML values, headings, prose, table text, link labels, image alt text, and UI labels.
Do not add, remove, summarize, correct, or reinterpret content.
Use this glossary consistently:\n${glossary}`;

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          reasoning: { effort: "none" },
          instructions,
          input: markdown,
          store: false,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(`OpenAI API ${response.status}: ${payload.error?.message || response.statusText}`);
      if (payload.status && payload.status !== "completed") {
        throw new Error(`OpenAI response was ${payload.status}: ${JSON.stringify(payload.incomplete_details || {})}`);
      }
      const text = payload.output
        ?.filter((item) => item.type === "message")
        .flatMap((item) => item.content || [])
        .filter((item) => item.type === "output_text")
        .map((item) => item.text)
        .join("");
      if (!text) throw new Error("OpenAI API returned no output text");
      return text;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** (attempt - 1)));
    }
  }
  throw lastError;
}

async function translateIncrementally(sourceMarkdown, targetMarkdown, cached, options) {
  const source = readFrontMatter(sourceMarkdown);
  const target = readFrontMatter(targetMarkdown);
  const reusable = reuseTranslatedBlocks(source.body, target.body, cached.bodyBlockSourceHashes);
  if (!source.frontMatter || !target.frontMatter || !reusable) return null;

  let translatedFrontMatter = target.frontMatter;
  if (cached.frontMatterSourceHash !== hash(source.frontMatter)) {
    console.log(`Translating changed front matter in ${options.sourceKey}`);
    const translated = await translate(`---\n${source.frontMatter}\n---\n`, { ...options, fragment: true });
    translatedFrontMatter = readFrontMatter(translated).frontMatter;
    if (!translatedFrontMatter) throw new Error(`Translated front matter is invalid in ${options.sourceKey}`);
  }

  for (const [index, block] of reusable.entries()) {
    if (block.translation !== null) continue;
    console.log(`Translating changed block ${index + 1}/${reusable.length} in ${options.sourceKey}`);
    block.translation = await translate(block.sourceBlock, { ...options, fragment: true });
  }

  return `---\n${translatedFrontMatter}\n---\n\n${reusable.map(({ translation }) => translation.trim()).join("\n\n")}\n`;
}

function addSegmentMetadata(entry, sourceMarkdown, targetMarkdown) {
  const source = readFrontMatter(sourceMarkdown);
  const target = readFrontMatter(targetMarkdown);
  const sourceBlocks = markdownBlocks(source.body);
  const targetBlocks = markdownBlocks(target.body);
  if (!source.frontMatter || !target.frontMatter || sourceBlocks.length !== targetBlocks.length) return;
  entry.frontMatterSourceHash = hash(source.frontMatter);
  entry.bodyBlockSourceHashes = sourceBlocks.map(hash);
}

async function readJson(filename, fallback) {
  try {
    return JSON.parse(await readFile(filename, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function fileExists(filename) {
  try {
    await readFile(filename);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function atomicWrite(filename, content) {
  await mkdir(path.dirname(filename), { recursive: true });
  const temporary = `${filename}.tmp`;
  await writeFile(temporary, content, "utf8");
  await rename(temporary, filename);
}
