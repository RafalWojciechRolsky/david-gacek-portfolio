import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ActionLink } from "@/components/ui/ActionLink";
import { DisclosureFaq } from "@/components/ui/DisclosureFaq";
import type { ArticleDetail, Locale } from "@/lib/types";
import { pathWithAnchor } from "@/lib/routes";
import { getMessages } from "@/messages/ui";

interface ArticlePageProps {
  /** Pełna treść artykułu. */
  article: ArticleDetail;
  /** Lokalizacja artykułu. */
  locale: Locale;
}

/**
 * Renderuje pełny artykuł z odpowiedzią na początku i kontekstem źródłowym.
 */
export function ArticlePage({ article, locale }: ArticlePageProps) {
  const isPolish = locale === "pl";
  const messages = getMessages(locale);

  return (
    <>
      <article className="article-page">
        <div className="container article-page-inner">
          <p className="eyebrow">{article.type}</p>
          <h1>{article.title}</h1>
          <p className="article-lead">{article.body}</p>
          <p className="article-meta">{article.readTime}</p>
          <div className="article-body">
            {article.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="article-source">
            <SectionHeader
              heading={messages.article.sourceHeading}
              intro={article.sourceLabel}
            />
          </div>
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
            />
          </div>
          <DisclosureFaq items={article.faq} objectId="article-faq-list" />
        </div>
      </section>
      <ContactSection locale={locale} />
    </>
  );
}
