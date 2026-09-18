import Image from "next/image";

import { siteConfig } from "@/lib/site-config";
import type { Locale, PageData, PageVisual } from "@/lib/types";

import { ActionLink } from "@/components/ui/ActionLink";
import { PhoneIcon } from "@/components/ui/PhoneIcon";

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
export function PageHero({ page, visual, proof, ctaLabel }: PageHeroProps) {
  const heroImage = visual.heroImage ?? page.heroImage;
  const heroClassName = `page-hero page-hero--${visual.variant} page-hero--${visual.signal}`;

  return (
    <section className={heroClassName} aria-labelledby="page-hero-heading">
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          {page.eyebrow ? <p className="eyebrow">{page.eyebrow}</p> : null}
          <h1 id="page-hero-heading">{page.title}</h1>
          <p className="page-hero-intro">{page.intro}</p>
          {proof ? <p className="page-hero-proof">{proof}</p> : null}
          <div className="hero-actions">
            {page.cta ? (
              <ActionLink
                href={page.cta.href.startsWith("tel:") ? siteConfig.phoneHref : page.cta.href}
                variant="primary"
              >
                <PhoneIcon />
                {ctaLabel}
              </ActionLink>
            ) : null}
            {page.ctaSecondary ? (
              <ActionLink
                href={page.ctaSecondary.href}
                variant="secondary"
                withArrow
                objectId="page-hero-secondary-cta"
              >
                {page.ctaSecondary.label}
              </ActionLink>
            ) : null}
          </div>
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
