import { pathFor } from "@/lib/routes";
import type { Locale, PageKey } from "@/lib/types";
import { getMessages } from "@/messages/ui";

interface LanguageSwitcherProps {
  /** Bieżąca lokalizacja. */
  locale: Locale;
  /** Strona, której odpowiednik ma zostać otwarty. */
  pageKey: PageKey;
  /** Identyfikator obiektu w dokumencie. */
  objectId?: string;
}

/**
 * Renderuje przełącznik języka zachowujący kontekst bieżącej strony.
 */
export function LanguageSwitcher({
  locale,
  pageKey,
  objectId,
}: LanguageSwitcherProps) {
  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={getMessages(locale).accessibility.languageSelector}
      data-object-id={objectId}
    >
      {(["pl", "en"] as Locale[]).map((language) => (
        <a
          key={language}
          href={pathFor(pageKey, language)}
          aria-current={locale === language ? "page" : undefined}
        >
          {language.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
