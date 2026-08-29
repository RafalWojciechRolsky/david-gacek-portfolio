import Image from "next/image";

import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ActionLink } from "@/components/ui/ActionLink";
import { ContentCard } from "@/components/ui/ContentCard";
import { DisclosureFaq } from "@/components/ui/DisclosureFaq";
import type { ArticleDetail, ArticleSection, Locale } from "@/lib/types";
import { articleToCardItem, formatArticleDate, getRelatedArticles } from "@/lib/articles";
import { pathFor, pathWithAnchor } from "@/lib/routes";
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
      <article className="article-page">
        <div className="container article-page-inner">
          <p className="eyebrow">{article.type}</p>
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
        <div className="container article-page-inner">
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
          <div className="article-source">
            <SectionHeader
              heading={messages.article.authorHeading}
              intro={messages.article.authorBio}
            />
            <p className="article-source-line">
              {messages.article.sourcePrefix} {article.sourceLabel}
            </p>
          </div>
          {related.length ? (
            <section className="article-related" aria-labelledby="article-related-heading">
              <SectionHeader heading={messages.article.relatedHeading} headingId="article-related-heading" />
              <div className="content-grid content-grid--3">
                {related.map((relatedArticle, index) => (
                  <ContentCard
                    key={relatedArticle.id}
                    item={articleToCardItem(relatedArticle)}
                    index={index}
                    objectId={`related-${relatedArticle.id}`}
                    linkWholeCard
                  />
                ))}
              </div>
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
      <section className="faq-section section-rule" aria-labelledby="article-faq-heading">
        <div className="container faq-layout">
          <div className="faq-heading">
            <SectionHeader
              heading={messages.article.faqHeading}
              headingId="article-faq-heading"
              signal="ochre"
            />
          </div>
          <DisclosureFaq items={article.faq} objectId="article-faq-list" />
        </div>
      </section>
      <ContactSection locale={locale} />
    </>
  );
}
