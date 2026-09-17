import type { ReactNode } from "react";

import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/sections/PageHero";
import { PageSections } from "@/components/sections/PageSections";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { VideoSection } from "@/components/sections/VideoSection";
import { DisclosureFaq } from "@/components/ui/DisclosureFaq";
import { getHomepage } from "@/lib/content";
import { getPageVisual } from "@/lib/visuals";
import { getMessages } from "@/messages/ui";
import type { Locale, PageData, PageKey, VideoData } from "@/lib/types";

interface GenericPageProps {
  /** Zlokalizowana strona treści. */
  page: PageData;
  /** Klucz strony dla wyjątków zdefiniowanych w specyfikacji. */
  pageKey: Exclude<PageKey, "home" | "materials">;
  /** Lokalizacja strony. */
  locale: Locale;
  /** Opcjonalny filtr osadzany wewnątrz sekcji biblioteki artykułów. */
  articleLibraryNav?: ReactNode;
}

const VIDEO_AFTER_SECTION: Partial<
  Record<PageKey, Record<Locale, string>>
> = {
  teacherTraining: {
    pl: "sposob-pracy",
    en: "how",
  },
  corporateEvents: {
    pl: "oferta",
    en: "offer",
  },
  childrenWorkshops: {
    pl: "sposob-pracy",
    en: "how",
  },
};

/**
 * Renderuje wspólny szkielet podstron editorialowych z zachowaniem kolejności treści.
 */
export function GenericPage({
  page,
  pageKey,
  locale,
  articleLibraryNav,
}: GenericPageProps) {
  const messages = getMessages(locale);
  const visual = getPageVisual(pageKey, locale);
  const hasVideo =
    pageKey === "teacherTraining" ||
    pageKey === "corporateEvents" ||
    pageKey === "childrenWorkshops";
  const pageVideo = page.video ?? getHomepage(locale).video;
  const video: VideoData = {
    ...pageVideo,
    placeholderImage: visual.mediaImage ?? pageVideo.placeholderImage,
  };
  const videoAfterSection = VIDEO_AFTER_SECTION[pageKey]?.[locale];
  const videoIndex = page.sections.findIndex(
    (pageSection) => pageSection.id === videoAfterSection,
  );
  const sectionsBeforeVideo =
    videoIndex === -1 ? page.sections : page.sections.slice(0, videoIndex + 1);
  const sectionsAfterVideo =
    videoIndex === -1 ? [] : page.sections.slice(videoIndex + 1);

  return (
    <>
      <PageHero
        page={page}
        visual={visual}
        proof={page.proof}
        ctaLabel={page.cta?.label ?? page.title}
        locale={locale}
      />
      <PageSections
        sections={sectionsBeforeVideo}
        locale={locale}
        visual={visual}
        articleLibraryNav={articleLibraryNav}
      />
      {hasVideo ? (
        <VideoSection locale={locale} video={video} signal={visual.signal} />
      ) : null}
      {sectionsAfterVideo.length ? (
        <PageSections
          sections={sectionsAfterVideo}
          locale={locale}
          visual={visual}
          articleLibraryNav={articleLibraryNav}
        />
      ) : null}
      <section
        className={`faq-section section-rule page-section-signal--${visual.signal}`}
        aria-labelledby="page-faq-heading"
      >
        <div className="container faq-layout">
          <div className="faq-heading">
            <SectionHeader
              heading={messages.page.faqHeading}
              intro={messages.page.faqIntro}
              headingId="page-faq-heading"
              signal={visual.signal}
            />
          </div>
          <DisclosureFaq items={page.faq} objectId={`${pageKey}-faq-list`} />
        </div>
      </section>
      {pageKey !== "contact" ? (
        <ContactSection locale={locale} dark signal={visual.signal} />
      ) : null}
    </>
  );
}
