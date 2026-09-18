import assert from "node:assert/strict";
import fs from "node:fs";

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const content = readJson("src/content/site-content.json");
const articles = readJson("src/content/articles.json");
const messages = readJson("src/messages/ui.json");
const visuals = readJson("src/content/site-visuals.json");
const locales = ["pl", "en"];
const cardKinds = ["navigation", "evidence", "information"];
const articleLibraryIds = new Set(["artykuly", "articles"]);

/**
 * Sprawdza rozłączny kontrakt pełnej karty.
 */
const validateCard = (item, location) => {
  assert.ok(
    cardKinds.includes(item.kind),
    `${location}: missing or invalid card kind`,
  );

  if (item.kind === "navigation") {
    assert.ok(item.href, `${location}: navigation needs href`);
    assert.ok(!item.source, `${location}: navigation must not have source`);
    assert.ok(
      !item.download || item.href.endsWith(".pdf"),
      `${location}: navigation download flag requires a PDF href`,
    );
    return;
  }

  if (item.kind === "evidence") {
    assert.ok(item.source, `${location}: evidence needs source`);
    assert.ok(!item.href, `${location}: evidence must not have href`);
    assert.ok(!item.actionLabel, `${location}: evidence must not have actionLabel`);
    return;
  }

  assert.ok(!item.href, `${location}: information must not have href`);
  assert.ok(!item.source, `${location}: information must not have source`);
  assert.ok(!item.actionLabel, `${location}: information must not have actionLabel`);
};

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
    section.items?.forEach((item, itemIndex) => {
      if (!("title" in item)) {
        assert.ok(
          articleLibraryIds.has(section.id),
          `${pageKey}/${locale}/${section.id}/item-${itemIndex}: reference outside article library`,
        );
        return;
      }

      validateCard(item, `${pageKey}/${locale}/${section.id}/item-${itemIndex}`);
    });
  });
};

sameShape(messages.pl, messages.en, "messages");
sameShape(content.homepageContent.pl, content.homepageContent.en, "homepage");
locales.forEach((locale) => {
  content.homepageContent[locale].articles.forEach((item, index) => {
    validateCard(item, `homepage/${locale}/article-${index}`);
  });
});

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
        ["paper", "paper-deep", "white", "ink", "cobalt", "ochre", "coral", "green"].includes(tone),
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
  assert.equal(article.kind, "navigation", `${article.id}/pl: article card must be navigation`);
  assert.ok(article.seoTitle, `${article.id}/pl: missing SEO title`);
  assert.ok(article.seoDescription, `${article.id}/pl: missing SEO description`);
  assert.ok(article.faq.length > 0, `${article.id}/pl: missing FAQ`);
});
articles.articles.en.forEach((article) => {
  assert.equal(article.kind, "navigation", `${article.id}/en: article card must be navigation`);
  assert.ok(article.seoTitle, `${article.id}/en: missing SEO title`);
  assert.ok(article.seoDescription, `${article.id}/en: missing SEO description`);
  assert.ok(article.faq.length > 0, `${article.id}/en: missing FAQ`);
});

/**
 * Sprawdza kontrakt pełnego artykułu w nowym modelu sekcji.
 */
const validateArticle = (article, locale) => {
  assert.ok(
    ["teacherTraining", "childrenWorkshops", "corporateEvents", "disc"].includes(article.category?.id),
    `${article.id}/${locale}: invalid category id`,
  );
  assert.ok(article.category?.label, `${article.id}/${locale}: missing category label`);
  assert.ok(
    ["cobalt", "ochre", "coral", "green"].includes(article.category?.signal),
    `${article.id}/${locale}: invalid category signal`,
  );
  assert.ok(article.category?.href?.startsWith("/"), `${article.id}/${locale}: invalid category href`);
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt), `${article.id}/${locale}: invalid publishedAt`);
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(article.updatedAt), `${article.id}/${locale}: invalid updatedAt`);
  assert.ok(article.updatedAt >= article.publishedAt, `${article.id}/${locale}: updatedAt before publishedAt`);
  assert.ok(article.hero?.src?.startsWith("/images/"), `${article.id}/${locale}: hero must use /images/`);
  assert.ok(article.hero.alt, `${article.id}/${locale}: missing hero alt`);
  assert.ok(article.hero.caption, `${article.id}/${locale}: missing hero caption`);
  assert.ok(article.hero.width > 0 && article.hero.height > 0, `${article.id}/${locale}: missing hero dimensions`);
  assert.ok(article.sections.length >= 4, `${article.id}/${locale}: needs at least 4 sections`);
  const sectionIds = article.sections.map((section) => section.id);
  assert.equal(new Set(sectionIds).size, sectionIds.length, `${article.id}/${locale}: duplicate section ids`);
  article.sections.forEach((section, index) => {
    assert.ok(section.heading, `${article.id}/${locale}/section-${index}: missing heading`);
    assert.ok(
      (section.paragraphs?.length ?? 0) + (section.bullets?.length ?? 0) > 0,
      `${article.id}/${locale}/section-${index}: empty section`,
    );
  });
  const wordCount = article.sections
    .flatMap((section) => [...(section.paragraphs ?? []), ...(section.bullets ?? [])])
    .join(" ")
    .split(/\s+/).length;
  assert.ok(wordCount >= 600, `${article.id}/${locale}: too short, ${wordCount} words`);
  if (article.related) {
    const allIds = articles.articles[locale].map((candidate) => candidate.id);
    article.related.forEach((relatedId) => {
      assert.ok(allIds.includes(relatedId), `${article.id}/${locale}: unknown related id ${relatedId}`);
    });
  }
};
articles.articles.pl.forEach((article) => validateArticle(article, "pl"));
articles.articles.en.forEach((article) => validateArticle(article, "en"));

/**
 * Sprawdza, że biblioteka na hubie Wiedzy odwołuje się do istniejących artykułów.
 */
["artykuly", "articles"].forEach((sectionId) => {
  const section = content.pageContent.insights[sectionId === "artykuly" ? "pl" : "en"].sections.find(
    (candidate) => candidate.id === sectionId,
  );
  assert.ok(section, `insights: missing section ${sectionId}`);
  section.items.forEach((item) => {
    const slug = item.id.replace("insight-", "");
    const article = articles.articles[sectionId === "artykuly" ? "pl" : "en"].find(
      (candidate) => candidate.id === slug,
    );
    assert.ok(article, `insights/${sectionId}: card id ${item.id} has no matching article`);
  });
});

console.log(
  `Content contracts valid: ${pageKeys.length + 1} pages, ${articles.articles.pl.length} article pairs, ${locales.length} locales.`,
);
