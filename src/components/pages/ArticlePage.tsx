import Image from "next/image";

import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ActionLink } from "@/components/ui/ActionLink";
import { Arrow } from "@/components/ui/Arrow";
import { CardGrid } from "@/components/ui/CardGrid";
import { ContentCard } from "@/components/ui/ContentCard";
import { DisclosureFaq } from "@/components/ui/DisclosureFaq";
import type { ArticleDetail, ArticleSection, Locale } from "@/lib/types";
import { articleToCardItem, formatArticleDate, getRelatedArticles } from "@/lib/articles";
import { pathFor, pathWithAnchor } from "@/lib/routes";
import { preferredSourceUrl } from "@/lib/site-config";
import { getMessages } from "@/messages/ui";

interface ArticlePageProps {
  /** Pełna treść artykułu. */
  article: ArticleDetail;
  /** Lokalizacja artykułu. */
  locale: Locale;
}

/**
 * Zamienia zapis [tekst](ścieżka) wewnątrz akapitu na linki, resztę tekstu zostawia bez zmian.
 */
function renderRichText(text: string, keyPrefix: string): React.ReactNode[] {
  const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let linkIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <a key={`${keyPrefix}-link-${linkIndex}`} href={match[2]}>
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
    linkIndex += 1;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

interface ArticleSectionBlockProps {
  /** Sekcja treści artykułu. */
  section: ArticleSection;
}

/**
 * Renderuje sekcję artykułu z nagłówkiem H2, akapitami i opcjonalną listą punktów.
 */
function ArticleSectionBlock({ section }: ArticleSectionBlockProps) {
  return (
    <section className="article-section" id={section.id} aria-labelledby={`${section.id}-heading`}>
      <h2 id={`${section.id}-heading`}>{section.heading}</h2>
      {section.paragraphs.map((paragraph, index) => (
        <p key={paragraph}>{renderRichText(paragraph, `${section.id}-${index}`)}</p>
      ))}
      {section.bullets ? (
        <ul className="article-list">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{renderRichText(bullet, `${section.id}-bullet`)}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

/**
 * Renderuje pełny artykuł z obrazem, spisem treści, autorem i powiązanymi materiałami.
 */
export function ArticlePage({ article, locale }: ArticlePageProps) {
  const isPolish = locale === "pl";
  const messages = getMessages(locale);
  const related = getRelatedArticles(locale, article);
  const showToc = article.sections.length >= 4;

  return (
    <>
      <article className={`article-page article-page--${article.category.signal}`}>
        <header className="article-header">
          <div className="container article-header-grid">
            <div className="article-context">
              <nav
                className="article-breadcrumb"
                aria-label={messages.accessibility.breadcrumbNavigation}
              >
                <ol>
                  <li>
                    <a href={pathFor("home", locale)}>{messages.seo.home}</a>
                  </li>
                  <li>
                    <a href={pathFor("insights", locale)}>
                      {messages.header.insights}
                    </a>
                  </li>
                  <li aria-current="page">{article.title}</li>
                </ol>
              </nav>
              <div className="article-category">
                <span>{messages.article.categoryLabel}</span>
                <a href={article.category.href}>{article.category.label}</a>
              </div>
            </div>
            <div className="article-header-copy">
              <p className="article-format">
                <span>{messages.article.formatLabel}</span>
                {article.type}
              </p>
              <h1>{article.title}</h1>
              <p className="article-lead">{article.body}</p>
              <p className="article-meta">
                <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt, locale)}</time>
                <span aria-hidden="true">|</span>
                <span>{article.readTime}</span>
                <span aria-hidden="true">|</span>
                <a href={pathFor("profile", locale)}>{messages.brandName}</a>
              </p>
            </div>
          </div>
        </header>
        <div className="article-reading">
          <figure className="article-hero container">
            <Image
              src={article.hero.src}
              alt={article.hero.alt}
              width={article.hero.width}
              height={article.hero.height}
              priority
              sizes="(min-width: 1440px) 1200px, 100vw"
            />
            <figcaption>{article.hero.caption}</figcaption>
          </figure>
          <div className="container article-reading-grid">
            {showToc ? (
              <nav className="article-toc" aria-labelledby="article-toc-heading">
                <p className="eyebrow" id="article-toc-heading">
                  {messages.article.tocHeading}
                </p>
                <ol>
                  {article.sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>{section.heading}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            <div className="article-body">
              {article.sections.map((section) => (
                <ArticleSectionBlock key={section.id} section={section} />
              ))}
            </div>
          </div>
        </div>
        <div className="container article-footer">
          <div className="article-source">
            <SectionHeader
              heading={messages.article.authorHeading}
              intro={messages.article.authorBio}
              signal={article.category.signal}
            />
            <p className="article-source-line">
              {messages.article.sourcePrefix} {article.sourceLabel}
            </p>
            <a
              className="article-preferred-source"
              href={preferredSourceUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-object-id="article-preferred-source"
            >
              <span>{messages.header.preferredSource}</span>
              <Arrow />
            </a>
          </div>
          {related.length ? (
            <section className="article-related" aria-labelledby="article-related-heading">
              <SectionHeader
                heading={messages.article.relatedHeading}
                headingId="article-related-heading"
                signal={article.category.signal}
              />
              <CardGrid columns={related.length}>
                {related.map((relatedArticle, index) => (
                  <li className="card-grid__item" key={relatedArticle.id}>
                    <ContentCard
                      item={articleToCardItem(relatedArticle)}
                      index={index}
                      objectId={`related-${relatedArticle.id}`}
                    />
                  </li>
                ))}
              </CardGrid>
            </section>
          ) : null}
          <ActionLink
            href={pathWithAnchor("insights", locale, isPolish ? "artykuly" : "articles")}
            variant="text"
            withArrow
          >
            {messages.article.back}
          </ActionLink>
        </div>
      </article>
      <section
        className={`faq-section section-rule page-section-signal--${article.category.signal}`}
        aria-labelledby="article-faq-heading"
      >
        <div className="container faq-layout">
          <div className="faq-heading">
            <SectionHeader
              heading={messages.article.faqHeading}
              headingId="article-faq-heading"
              signal={article.category.signal}
            />
          </div>
          <DisclosureFaq items={article.faq} objectId="article-faq-list" />
        </div>
      </section>
      <ContactSection locale={locale} signal={article.category.signal} />
    </>
  );
}
