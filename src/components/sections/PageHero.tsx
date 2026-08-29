import Image from "next/image";

import { preferredSourceUrl, siteConfig } from "@/lib/site-config";
import type { Locale, PageData, PageVisual } from "@/lib/types";
import { getMessages } from "@/messages/ui";

import { ActionLink } from "@/components/ui/ActionLink";
import { Arrow } from "@/components/ui/Arrow";

interface PageHeroProps {
  /** Dane zlokalizowanej strony. */
  page: PageData;
  /** Konfiguracja kompozycji, sygnału i obrazu podstrony. */
  visual: PageVisual;
  /** Opcjonalny dowód eksponowany w hero. */
  proof?: string;
  /** Etykieta CTA. */
  ctaLabel: string;
  /** Lokalizacja treści. */
  locale: Locale;
}

/**
 * Renderuje hero podstrony z jednym H1, rolą, dowodem i akcją.
 */
export function PageHero({ page, visual, proof, ctaLabel, locale }: PageHeroProps) {
  const heroImage = visual.heroImage ?? page.heroImage;
  const heroClassName = `page-hero page-hero--${visual.variant} page-hero--${visual.signal}`;
  const messages = getMessages(locale);

  return (
    <section className={heroClassName} aria-labelledby="page-hero-heading">
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          {page.eyebrow ? <p className="eyebrow">{page.eyebrow}</p> : null}
          <h1 id="page-hero-heading">{page.title}</h1>
          <p className="page-hero-intro">{page.intro}</p>
          {proof ? <p className="page-hero-proof">{proof}</p> : null}
          {page.cta ? (
            <ActionLink
              href={page.cta.href.startsWith("tel:") ? siteConfig.phoneHref : page.cta.href}
              variant="primary"
              withArrow
            >
              {ctaLabel}
            </ActionLink>
          ) : null}
          <a
            className="hero-preferred-source"
            href={preferredSourceUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-object-id="page-hero-preferred-source"
          >
            <span>{messages.page.preferredSourceCta}</span>
            <Arrow />
          </a>
        </div>
        {heroImage ? (
          <div className="page-hero-media">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              priority
              sizes="(max-width: 760px) 100vw, 45vw"
            />
            {visual.heroCaption ? (
              <span className="page-hero-caption">{visual.heroCaption}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
