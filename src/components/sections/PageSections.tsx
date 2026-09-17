import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site-config";
import { getStatusLabel } from "@/lib/content-labels";
import { articleToCardItem, getArticle, getArticleById } from "@/lib/articles";
import { isContentCardItem } from "@/lib/types";
import type { Locale, PageSection, PageVisual } from "@/lib/types";

import { ActionLink } from "@/components/ui/ActionLink";
import { CardGrid } from "@/components/ui/CardGrid";
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
  /** Filtr należący do sekcji biblioteki artykułów. */
  articleLibraryNav?: ReactNode;
}

/**
 * Renderuje generyczne sekcje stron bez uzależniania UI od źródła danych.
 */
export function PageSections({
  sections,
  locale,
  visual,
  articleLibraryNav,
}: PageSectionsProps) {
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
              {isArticleLibrary ? articleLibraryNav : null}
              {isContactChannels ? (
                <ContactChannels
                  locale={locale}
                  light={tone === "paper" || tone === "white"}
                  objectId={`${pageSection.id}-contact-channels`}
                />
              ) : pageSection.items?.length ? (
                <CardGrid
                  columns={pageSection.items.length}
                  layout={isArticleLibrary ? "editorial" : "standard"}
                >
                  {pageSection.items.map((contentItem, index) => {
                    if (isResources) {
                      if (!("title" in contentItem)) {
                        return null;
                      }

                      const statusLabel =
                        contentItem.status === "preparing" ||
                        contentItem.status === "unavailable"
                          ? getStatusLabel(contentItem.status, locale)
                          : undefined;
                      const isNavigationCard =
                        isContentCardItem(contentItem) &&
                        contentItem.kind === "navigation";

                      return (
                        <li className="card-grid__item" key={contentItem.id}>
                          {isNavigationCard ? (
                            <ContentCard
                              item={contentItem}
                              index={index}
                              objectId={contentItem.id}
                              statusLabel={statusLabel}
                            />
                          ) : (
                            <ResourceItem resource={contentItem} locale={locale} />
                          )}
                        </li>
                      );
                    }

                    if (isArticleLibrary) {
                      const articleId = contentItem.id.replace("insight-", "");
                      const article =
                        getArticleById(locale, articleId) ??
                        (contentItem.href
                          ? getArticle(locale, contentItem.href.split("/").pop() ?? "")
                          : undefined);

                      return article ? (
                        <li className="card-grid__item" key={contentItem.id}>
                          <ContentCard
                            item={articleToCardItem(article)}
                            index={index}
                            objectId={contentItem.id}
                          />
                        </li>
                      ) : "title" in contentItem && isContentCardItem(contentItem) ? (
                        <li className="card-grid__item" key={contentItem.id}>
                          <ContentCard
                            item={contentItem}
                            index={index}
                            objectId={contentItem.id}
                          />
                        </li>
                      ) : null;
                    }

                    return "title" in contentItem && isContentCardItem(contentItem) ? (
                      <li className="card-grid__item" key={contentItem.id}>
                        <ContentCard
                          item={contentItem}
                          index={index}
                          objectId={contentItem.id}
                          statusLabel={
                            contentItem.status === "preparing" ||
                            contentItem.status === "unavailable"
                              ? getStatusLabel(contentItem.status, locale)
                              : undefined
                          }
                        />
                      </li>
                    ) : null;
                  })}
                </CardGrid>
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
