import { legalRoutes, pathFor } from "@/lib/routes";
import { preferredSourceUrl, siteConfig } from "@/lib/site-config";
import type { Locale, PageKey } from "@/lib/types";
import { getMessages } from "@/messages/ui";

import { LanguageSwitcher } from "@/components/chrome/LanguageSwitcher";

interface FooterProps {
  /** Bieżąca lokalizacja. */
  locale: Locale;
  /** Bieżąca strona. */
  currentPage: PageKey;
}

/**
 * Renderuje wspólny Footer z nawigacją, źródłami, językiem i informacjami prawnymi.
 */
export function Footer({ locale, currentPage }: FooterProps) {
  const messages = getMessages(locale);
  const legalPrivacy = legalRoutes.privacy[locale];
  const legalTerms = legalRoutes.terms[locale];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            {messages.brandName}
            <p>{messages.footer.brandLine}</p>
          </div>
          <nav className="footer-column" aria-label={messages.footer.workWith}>
            <h2>{messages.footer.workWith}</h2>
            <a href={pathFor("profile", locale)}>{messages.header.dawid}</a>
            <a href={pathFor("teacherTraining", locale)}>{messages.header.teacherTraining}</a>
            <a href={pathFor("childrenWorkshops", locale)}>{messages.header.childrenWorkshops}</a>
            <a href={pathFor("corporateEvents", locale)}>{messages.header.corporateEvents}</a>
            <a href={pathFor("disc", locale)}>{messages.header.disc}</a>
          </nav>
          <nav className="footer-column" aria-label={messages.footer.materials}>
            <h2>{messages.footer.materials}</h2>
            <a href={pathFor("projects", locale)}>{messages.footer.projects}</a>
            <a href={pathFor("insights", locale)}>{messages.footer.insights}</a>
            <a href={pathFor("insights", locale)}>{messages.footer.blog}</a>
            <a href={pathFor("materials", locale)}>{messages.footer.postTraining}</a>
            <a href={pathFor("contact", locale)}>{messages.footer.contact}</a>
          </nav>
          <nav className="footer-column" aria-label={messages.footer.elsewhere}>
            <h2>{messages.footer.elsewhere}</h2>
            <a href={siteConfig.externalLinks.linkedin.href}>{siteConfig.externalLinks.linkedin.label}</a>
            <a href={siteConfig.externalLinks.instagram.href}>{siteConfig.externalLinks.instagram.label}</a>
            <a href={siteConfig.externalLinks.facebook.href}>{siteConfig.externalLinks.facebook.label}</a>
            <a href={siteConfig.externalLinks.patronite.href}>{siteConfig.externalLinks.patronite.label}</a>
            <a
              href={preferredSourceUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-object-id="site-footer-preferred-source"
            >
              {messages.page.preferredSourceCta}
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>{messages.footer.copyright}</p>
          <div className="footer-meta">
            <LanguageSwitcher locale={locale} pageKey={currentPage} objectId="site-footer-language-switcher" />
            <a href={legalPrivacy}>{messages.footer.privacy}</a>
            <a href={legalTerms}>{messages.footer.terms}</a>
            <span className="footer-credit">
              <span aria-hidden="true">@</span>
              <a href={siteConfig.creatorLinks.portfolio.href}>{siteConfig.creatorLinks.portfolio.label}</a>
              <span aria-hidden="true">/</span>
              <a href={siteConfig.creatorLinks.musicStore.href}>{siteConfig.creatorLinks.musicStore.label}</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
