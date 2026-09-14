import assert from "node:assert/strict";
import test from "node:test";
import {
  finalizeTranslation,
  hash,
  readFrontMatter,
  reuseTranslatedBlocks,
  rewriteInternalUrls,
  translationFingerprint,
  translatedUrl,
} from "../scripts/translation-lib.mjs";

test("reads YAML front matter", () => {
  assert.deepEqual(readFrontMatter("---\ntitle: Test\n---\nBody"), {
    frontMatter: "title: Test",
    body: "Body",
  });
});

test("prefixes translated URLs", () => {
  assert.equal(translatedUrl("/"), "/en/");
  assert.equal(translatedUrl("/docs/intro/"), "/en/docs/intro/");
});

test("translation fingerprints do not depend on the global route map", () => {
  const input = {
    content: "Content",
    glossary: "Glossary",
    model: "model",
    promptVersion: 1,
  };
  assert.equal(
    translationFingerprint({ ...input, routeMap: [["/old/", "/en/old/"]] }),
    translationFingerprint({ ...input, routeMap: [["/new/", "/en/new/"]] }),
  );
});

test("reuses unchanged translated blocks after a source insertion", () => {
  const previousSource = ["Erster Absatz.", "Zweiter Absatz."];
  const result = reuseTranslatedBlocks(
    [previousSource[0], "Neuer Absatz.", previousSource[1]].join("\n\n"),
    "Manually corrected first paragraph.\n\nSecond paragraph.",
    previousSource.map(hash),
  );
  assert.deepEqual(result, [
    { sourceBlock: previousSource[0], translation: "Manually corrected first paragraph." },
    { sourceBlock: "Neuer Absatz.", translation: null },
    { sourceBlock: previousSource[1], translation: "Second paragraph." },
  ]);
});

test("rejects incremental reuse when the target structure changed", () => {
  assert.equal(reuseTranslatedBlocks("Quelle", "One\n\nTwo", [hash("Quelle")]), null);
});

test("rewrites known internal page URLs but not asset URLs", () => {
  const routes = new Map([
    ["/", "/en/"],
    ["/docs/intro/", "/en/docs/intro/"],
  ]);
  const markdown = "[Home](/) [Docs](/docs/intro/) ![Image](/assets/images/test.png)";
  assert.equal(
    rewriteInternalUrls(markdown, routes),
    "[Home](/en/) [Docs](/en/docs/intro/) ![Image](/assets/images/test.png)",
  );
});

test("rewrites overlapping routes once and repairs duplicate English prefixes", () => {
  const routes = new Map([
    ["/docs/smarthome/", "/en/docs/smarthome/"],
    ["/docs/smarthome/openhab", "/en/docs/smarthome/openhab"],
  ]);
  const markdown = [
    "[OpenHAB](/docs/smarthome/openhab)",
    "[Already translated](/en/docs/smarthome/openhab)",
    "[Broken](/en/en/en/docs/smarthome/openhab)",
  ].join(" ");
  const expected = [
    "[OpenHAB](/en/docs/smarthome/openhab)",
    "[Already translated](/en/docs/smarthome/openhab)",
    "[Broken](/en/docs/smarthome/openhab)",
  ].join(" ");
  assert.equal(rewriteInternalUrls(markdown, routes), expected);
});

test("adds translation metadata and replaces the sidebar", () => {
  const translated = `---
title: Settings
permalink: /docs/einstellungen/
sidebar:
  nav: "docs"
---

Read [the introduction](/docs/intro/).
`;
  const result = finalizeTranslation(translated, {
    sourceUrl: "/docs/einstellungen/",
    targetUrl: "/en/docs/einstellungen/",
    sidebar: "en_docs",
    routeMap: new Map([["/docs/intro/", "/en/docs/intro/"]]),
  });
  assert.match(result, /permalink: \/en\/docs\/einstellungen\//);
  assert.match(result, /nav: "en_docs"/);
  assert.match(result, /lang: en/);
  assert.match(result, /translation_url: \/docs\/einstellungen\//);
  assert.match(result, /\]\(\/en\/docs\/intro\/\)/);
});

test("repairs generated front matter without translating its source URL", () => {
  const result = finalizeTranslation(
    `---
title: OpenHAB
permalink: /en/en/en/docs/smarthome/openhab
translation_url: /en/en/docs/smarthome/openhab
translation_generated: true
---

[Overview](/en/en/docs/smarthome/)
`,
    {
      sourceUrl: "/docs/smarthome/openhab",
      targetUrl: "/en/docs/smarthome/openhab",
      sidebar: "en_docs",
      routeMap: new Map([
        ["/docs/smarthome/", "/en/docs/smarthome/"],
        ["/docs/smarthome/openhab", "/en/docs/smarthome/openhab"],
      ]),
    },
  );
  assert.match(result, /permalink: \/en\/docs\/smarthome\/openhab/);
  assert.match(result, /translation_url: \/docs\/smarthome\/openhab/);
  assert.doesNotMatch(result, /\/en\/en\//);
});

test("finalizing an existing translation is idempotent", () => {
  const options = {
    sourceUrl: "/docs/app/",
    targetUrl: "/en/docs/app/",
    sidebar: "en_docs",
    routeMap: new Map([["/docs/app/", "/en/docs/app/"]]),
  };
  const once = finalizeTranslation("---\ntitle: App\npermalink: /docs/app/\n---\n\nContent\n", options);
  assert.equal(finalizeTranslation(once, options), once);
});
