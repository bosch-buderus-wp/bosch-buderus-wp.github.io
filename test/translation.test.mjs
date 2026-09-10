import assert from "node:assert/strict";
import test from "node:test";
import {
  finalizeTranslation,
  readFrontMatter,
  rewriteInternalUrls,
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
