import { pathFor } from "@/lib/routes";
import { getArticleCategories } from "@/lib/articles";
import type { Locale } from "@/lib/types";
import { getMessages } from "@/messages/ui";

interface CategoryNavProps {
  /** Lokalizacja huba Wiedzy. */
  locale: Locale;
  /** Aktywna kategoria z parametru zapytania. */
  active?: string;
}

/**
 * Renderuje serwerowy filtr kategorii huba Wiedzy, działający bez JavaScriptu.
 */
export function CategoryNav({ locale, active }: CategoryNavProps) {
  const messages = getMessages(locale);
  const categories = getArticleCategories(locale);
  const basePath = pathFor("insights", locale);

  return (
    <nav className="category-nav" aria-label={messages.article.categoryNavAria}>
      <a href={basePath} aria-current={!active ? "true" : undefined}>
        {messages.article.allCategories}
      </a>
      {categories.map((category) => (
        <a
          key={category.id}
          href={`${basePath}?kategoria=${category.id}`}
          aria-current={active === category.id ? "true" : undefined}
        >
          {category.label}
        </a>
      ))}
    </nav>
  );
}
