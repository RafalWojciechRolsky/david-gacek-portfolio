import assert from "node:assert/strict";
import fs from "node:fs";

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const content = readJson("src/content/site-content.json");
const articles = readJson("src/content/articles.json");
const messages = readJson("src/messages/ui.json");
const visuals = readJson("src/content/site-visuals.json");
const locales = ["pl", "en"];

/**
 * Sprawdza, czy dwa obiekty JSON mają ten sam kształt kluczy.
 */
const sameShape = (left, right, path = "$") => {
  assert.equal(typeof left, typeof right, `${path}: type mismatch`);
  if (Array.isArray(left) || Array.isArray(right)) {
    assert.equal(Array.isArray(left), Array.isArray(right), `${path}: array mismatch`);
    assert.equal(left.length, right.length, `${path}: array length mismatch`);
    left.forEach((value, index) => sameShape(value, right[index], `${path}[${index}]`));
    return;
  }
  if (left && typeof left === "object") {
    const leftKeys = Object.keys(left).sort();
    const rightKeys = Object.keys(right).sort();
    assert.deepEqual(leftKeys, rightKeys, `${path}: key mismatch`);
    leftKeys.forEach((key) => sameShape(left[key], right[key], `${path}.${key}`));
  }
};

/**
 * Sprawdza wymagane pola każdej strony lokalnej.
 */
const validatePage = (page, locale, pageKey) => {
  assert.equal(page.locale, locale, `${pageKey}/${locale}: locale mismatch`);
  assert.equal(typeof page.contentKey, "string", `${pageKey}/${locale}: missing contentKey`);
  assert.equal(typeof page.title, "string", `${pageKey}/${locale}: missing title`);
  assert.ok(page.seo?.title, `${pageKey}/${locale}: missing SEO title`);
  assert.ok(page.seo?.description, `${pageKey}/${locale}: missing SEO description`);
  assert.ok(page.sections.length > 0, `${pageKey}/${locale}: missing sections`);
  assert.ok(page.faq.length > 0, `${pageKey}/${locale}: missing FAQ`);
  page.sections.forEach((section, index) => {
    assert.ok(section.id, `${pageKey}/${locale}/section-${index}: missing id`);
    assert.ok(section.heading, `${pageKey}/${locale}/section-${index}: missing heading`);
  });
};

sameShape(messages.pl, messages.en, "messages");
sameShape(content.homepageContent.pl, content.homepageContent.en, "homepage");

const pageKeys = Object.keys(content.pageContent).sort();
pageKeys.forEach((pageKey) => {
  sameShape(content.pageContent[pageKey].pl, content.pageContent[pageKey].en, pageKey);
  locales.forEach((locale) => validatePage(content.pageContent[pageKey][locale], locale, pageKey));
});

const visualKeys = Object.keys(visuals).sort();
assert.deepEqual(visualKeys, pageKeys.filter((pageKey) => pageKey !== "home" && pageKey !== "materials"), "visuals: page key mismatch");
visualKeys.forEach((pageKey) => {
  const visual = visuals[pageKey];
  assert.ok(visual.variant, `${pageKey}: missing visual variant`);
  assert.ok(visual.signal, `${pageKey}: missing visual signal`);
  assert.ok(visual.toneBySection, `${pageKey}: missing section tones`);
  locales.forEach((locale) => {
    assert.ok(visual.heroImage?.[locale], `${pageKey}/${locale}: missing hero image`);
    assert.ok(visual.heroCaption?.[locale], `${pageKey}/${locale}: missing hero caption`);
    assert.ok(visual.toneBySection[locale], `${pageKey}/${locale}: missing tone map`);
    content.pageContent[pageKey][locale].sections.forEach((section) => {
      assert.ok(
        visual.toneBySection[locale][section.id],
        `${pageKey}/${locale}/${section.id}: missing section tone`,
      );
    });
    Object.values(visual.toneBySection[locale]).forEach((tone) => {
      assert.ok(
        ["paper", "white", "ink", "cobalt", "ochre", "coral", "green"].includes(tone),
        `${pageKey}/${locale}: invalid section tone`,
      );
    });
  });
});

assert.deepEqual(
  Object.keys(articles.articles.pl).length,
  Object.keys(articles.articles.en).length,
  "articles: locale length mismatch",
);
assert.deepEqual(
  articles.articles.pl.map((article) => article.id),
  articles.articles.en.map((article) => article.id),
  "articles: locale id mismatch",
);
articles.articles.pl.forEach((article) => {
  assert.ok(article.seoTitle, `${article.id}/pl: missing SEO title`);
  assert.ok(article.seoDescription, `${article.id}/pl: missing SEO description`);
  assert.ok(article.faq.length > 0, `${article.id}/pl: missing FAQ`);
});
articles.articles.en.forEach((article) => {
  assert.ok(article.seoTitle, `${article.id}/en: missing SEO title`);
  assert.ok(article.seoDescription, `${article.id}/en: missing SEO description`);
  assert.ok(article.faq.length > 0, `${article.id}/en: missing FAQ`);
});

console.log(
  `Content contracts valid: ${pageKeys.length + 1} pages, ${articles.articles.pl.length} article pairs, ${locales.length} locales.`,
);
