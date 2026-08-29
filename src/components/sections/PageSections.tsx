import { siteConfig } from "@/lib/site-config";
import { getStatusLabel } from "@/lib/content-labels";
import { articleToCardItem, getArticle, getArticleById } from "@/lib/articles";
import type { Locale, PageSection, PageVisual } from "@/lib/types";

import { ActionLink } from "@/components/ui/ActionLink";
import { ContentCard } from "@/components/ui/ContentCard";
import { ResourceItem } from "@/components/ui/ResourceItem";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ContactChannels } from "@/components/sections/ContactChannels";

interface PageSectionsProps {
  /** Sekcje strony z lokalnych danych. */
  sections: PageSection[];
  /** Lokalizacja treści. */
  locale: Locale;
  /** Konfiguracja wizualnego rytmu podstrony. */
  visual: PageVisual;
}

/**
 * Renderuje generyczne sekcje stron bez uzależniania UI od źródła danych.
 */
export function PageSections({ sections, locale, visual }: PageSectionsProps) {
  return (
    <>
      {sections.map((pageSection) => {
        const isResources =
          pageSection.id === "materialy" ||
          pageSection.id === "resources" ||
          pageSection.id === "materialy-dla-dyrekcji" ||
          pageSection.id === "materialy-dla-dyrektorki" ||
          pageSection.id === "leadership-materials" ||
          pageSection.id === "director-materials";
        const isContactChannels =
          pageSection.id === "kanaly" || pageSection.id === "channels";
        const isArticleLibrary =
          pageSection.id === "artykuly" || pageSection.id === "articles";
        const tone =
          visual.toneBySection[pageSection.id] ?? pageSection.tone ?? "paper";

        return (
          <section
            className={`content-section content-section--${tone} page-section--${visual.variant} page-section-signal--${visual.signal}`}
            id={pageSection.id}
            key={pageSection.id}
            aria-labelledby={`${pageSection.id}-heading`}
          >
            <div className="container">
              <SectionHeader
                heading={pageSection.heading}
                intro={pageSection.intro}
                eyebrow={pageSection.eyebrow}
                headingId={`${pageSection.id}-heading`}
                signal={visual.signal}
              />
              {isContactChannels ? (
                <ContactChannels
                  locale={locale}
                  light={tone === "paper" || tone === "white"}
                  objectId={`${pageSection.id}-contact-channels`}
                />
              ) : pageSection.items?.length ? (
                <div
                  className={
                    isArticleLibrary
                      ? "article-grid"
                      : `content-grid content-grid--${pageSection.items.length}`
                  }
                >
                  {pageSection.items.map((contentItem, index) =>
                    isResources ? (
                      <ResourceItem
                        key={contentItem.id}
                        resource={contentItem}
                        locale={locale}
                      />
                    ) : isArticleLibrary ? (
                      (() => {
                        const articleId = contentItem.id.replace("insight-", "");
                        const article =
                          getArticleById(locale, articleId) ??
                          (contentItem.href
                            ? getArticle(locale, contentItem.href.split("/").pop() ?? "")
                            : undefined);
                        return (
                          <ContentCard
                            key={contentItem.id}
                            item={article ? articleToCardItem(article) : contentItem}
                            index={index}
                            objectId={contentItem.id}
                            linkWholeCard
                          />
                        );
                      })()
                    ) : (
                      <ContentCard
                        key={contentItem.id}
                        item={contentItem}
                        index={index}
                        objectId={contentItem.id}
                        linkWholeCard
                        statusLabel={
                          contentItem.status === "preparing" ||
                          contentItem.status === "unavailable"
                            ? getStatusLabel(contentItem.status, locale)
                            : undefined
                        }
                      />
                    ),
                  )}
                </div>
              ) : null}
              {pageSection.action ? (
                <div className="section-action-wrap">
                  <ActionLink
                    href={pageSection.action.href.startsWith("tel:") ? siteConfig.phoneHref : pageSection.action.href}
                    variant="text"
                    withArrow
                    className="section-action"
                  >
                    {pageSection.action.label}
                  </ActionLink>
                </div>
              ) : null}
            </div>
          </section>
        );
      })}
    </>
  );
}
