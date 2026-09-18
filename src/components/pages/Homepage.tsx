import Image from "next/image";

import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ActionLink } from "@/components/ui/ActionLink";
import { Arrow } from "@/components/ui/Arrow";
import { CardGrid } from "@/components/ui/CardGrid";
import { ContentCard } from "@/components/ui/ContentCard";
import { DisclosureFaq } from "@/components/ui/DisclosureFaq";
import { EvidenceBlock } from "@/components/ui/EvidenceBlock";
import { MediaFacade } from "@/components/ui/MediaFacade";
import { pathWithAnchor } from "@/lib/routes";
import { preferredSourceUrl, siteConfig } from "@/lib/site-config";
import type { HomepageData } from "@/lib/types";
import { getMessages } from "@/messages/ui";

interface HomepageProps {
  /** Zlokalizowana zawartość homepage. */
  page: HomepageData;
}

/**
 * Renderuje homepage zgodną z narracją i proporcjami makiety "dowód w centrum".
 */
export function Homepage({ page }: HomepageProps) {
  const isPolish = page.locale === "pl";
  const messages = getMessages(page.locale);

  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-media">
          <Image
            src={page.heroImage.src}
            alt={page.heroImage.alt}
            width={page.heroImage.width}
            height={page.heroImage.height}
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span className="hero-caption">{page.heroCaption}</span>
        </div>
        <div className="hero-copy">
          <h1 id="hero-heading">
            <span>{messages.brandFirstName}</span>
            <span>{messages.brandLastName}</span>
          </h1>
          <p className="hero-idea">{page.intro}</p>
          <p className="hero-proof">
            <strong>{page.heroStatistic.value}</strong>
            <span>{page.heroStatistic.label}</span>
          </p>
          <p className="hero-hours">{siteConfig.phoneHoursByLocale[page.locale]}</p>
          {page.cta ? (
            <ActionLink
              href={page.cta.href.startsWith("tel:") ? siteConfig.phoneHref : page.cta.href}
              variant="primary"
              withArrow
              objectId="homepage-hero-primary-cta"
            >
              {page.cta.label}
            </ActionLink>
          ) : null}
          <a
            className="hero-preferred-source"
            href={preferredSourceUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-object-id="homepage-hero-preferred-source"
          >
            <span>{messages.homepage.preferredSourceCta}</span>
            <Arrow />
          </a>
          <p className="hero-note">{messages.homepage.heroNote}</p>
        </div>
      </section>

      <section className="proof-section section-rule" aria-labelledby="proof-heading">
        <div className="container proof-layout">
          <div className="proof-heading">
            <SectionHeader
              heading={messages.homepage.proofHeading}
              intro={messages.homepage.proofIntro}
              headingId="proof-heading"
            />
          </div>
          <ol className="proof-list" data-object-id="homepage-proof-passage-evidence-sequence">
            {page.evidence.map((evidence) => (
              <EvidenceBlock
                key={evidence.id}
                evidence={evidence}
                objectId={`homepage-proof-${evidence.id}`}
              />
            ))}
          </ol>
        </div>
      </section>

      <section className="video-section" aria-labelledby="video-heading">
        <div className="container video-layout">
          <div>
            <SectionHeader
              heading={messages.homepage.videoHeading}
              intro={messages.homepage.videoIntro}
              headingId="video-heading"
              signal="ochre"
            />
            <p className="video-note">
              {messages.homepage.videoNote}
            </p>
          </div>
          <MediaFacade
            video={page.video}
            locale={page.locale}
            playLabel={messages.homepage.videoPlayLabel}
            objectId="homepage-video-facade"
          />
        </div>
      </section>

      <section
        className="contexts-section section-rule"
        id={isPolish ? "konteksty" : "contexts"}
        aria-labelledby="contexts-heading"
      >
        <div className="container">
          <div className="contexts-heading-row">
            <SectionHeader
              heading={messages.homepage.contextsHeading}
              headingId="contexts-heading"
            />
            <p>
              {messages.homepage.contextsIntro}
            </p>
          </div>
          <div className="context-grid" data-object-id="homepage-invitation-contexts-grid">
            {page.contexts.map((context, index) => (
              <TrackedLink
                className={`context-card context-card--${context.id}`}
                href={context.href}
                key={context.id}
                eventName="select_invitation_context"
                parameters={{ context: context.id, location: "homepage" }}
              >
                <div className="card-top">
                  <span className="card-number">
                    {String(index + 1).padStart(2, "0")} / {context.label}
                  </span>
                </div>
                <h3>{context.title}</h3>
                <p>{context.body}</p>
                <div className="card-footer">
                  <span className="card-action">
                    {context.actionLabel}
                    <Arrow />
                  </span>
                </div>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="knowledge-section" aria-labelledby="knowledge-heading">
        <div className="container">
          <SectionHeader
            heading={messages.homepage.knowledgeHeading}
            headingId="knowledge-heading"
          />
          <CardGrid
            columns={page.articles.length}
            id={isPolish ? "artykuly" : "articles"}
            layout="editorial"
          >
            {page.articles.map((article, index) => (
              <li className="card-grid__item" key={article.id}>
                <ContentCard
                  item={article}
                  index={index}
                  objectId="homepage-knowledge-article-card"
                />
              </li>
            ))}
          </CardGrid>
          <div className="knowledge-footer">
            <ActionLink
              href={pathWithAnchor(
                "insights",
                page.locale,
                isPolish ? "artykuly" : "articles",
              )}
              variant="text"
              withArrow
              objectId="homepage-knowledge-articles-link"
            >
              {messages.homepage.allArticles}
            </ActionLink>
          </div>
        </div>
      </section>

      <section
        className="faq-section section-rule page-section-signal--cobalt"
        aria-labelledby="faq-heading"
      >
        <div className="container faq-layout">
          <div className="faq-heading">
            <SectionHeader
              heading={messages.homepage.faqHeading}
              intro={messages.homepage.faqIntro}
              headingId="faq-heading"
              signal="cobalt"
            />
          </div>
          <DisclosureFaq items={page.faq} objectId="homepage-faq-list" />
        </div>
      </section>

      <ContactSection locale={page.locale} signal="cobalt" />
    </>
  );
}
