import { absoluteUrl } from "@/lib/metadata";
import type { ArticleDetail, Locale } from "@/lib/types";
import { getMessages } from "@/messages/ui";

interface ArticleJsonLdProps {
  /** Dane artykułu do oznaczenia. */
  article: ArticleDetail;
  /** Lokalizacja artykułu. */
  locale: Locale;
}

/**
 * Renderuje dane BlogPosting zgodne z widoczną treścią artykułu.
 */
export function ArticleJsonLd({ article, locale }: ArticleJsonLdProps) {
  const articleUrl = absoluteUrl(article.href ?? "/");
  const messages = getMessages(locale);
  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.seoDescription,
        inLanguage: locale,
        url: articleUrl,
        mainEntityOfPage: articleUrl,
        author: {
          "@type": "Person",
          name: messages.brandName,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: messages.header.insights,
            item: absoluteUrl(locale === "pl" ? "/wiedza" : "/en/insights"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
