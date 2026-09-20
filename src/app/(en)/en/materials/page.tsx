import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/PageShell";
import { StructuredData } from "@/components/seo/StructuredData";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { DisclosureFaq } from "@/components/ui/DisclosureFaq";
import { RhythmicMarker } from "@/components/ui/RhythmicMarker";
import { ResourceItem } from "@/components/ui/ResourceItem";
import { getPage } from "@/lib/content";
import { buildUtilityJsonLd } from "@/lib/json-ld";
import { pathFor } from "@/lib/routes";
import { getMessages } from "@/messages/ui";

const page = getPage("materials", "en");

export const metadata: Metadata = {
  title: page.seo.title,
  description: page.seo.description,
  robots: { index: false, follow: false },
};

/**
 * Renderuje angielską ścieżkę materiałów po szkoleniu poza indeksem.
 */
export default function EnglishMaterialsPage() {
  const messages = getMessages("en");
  const section = page.sections.find(
    (item) => item.id === "post-training-materials",
  );

  return (
    <PageShell locale="en" currentPage="materials">
      <StructuredData
        data={buildUtilityJsonLd(
          page.seo.title,
          page.seo.description,
          "en",
          pathFor("materials", "en"),
        )}
      />
      <section className="utility-page">
        <div className="container utility-page-inner">
          <RhythmicMarker />
          <h1 className="section-heading">{page.title}</h1>
          <p className="section-intro">{page.intro}</p>
          <div className="resource-list">
            {section?.items?.map((resource) =>
              "title" in resource ? (
                <ResourceItem
                  key={resource.id}
                  resource={resource}
                  locale="en"
                  headingLevel="h2"
                />
              ) : null,
            )}
          </div>
        </div>
      </section>
      <section className="faq-section" aria-labelledby="materials-faq-heading">
        <div className="container faq-layout">
          <div className="faq-heading">
            <SectionHeader
              heading={messages.page.faqHeading}
              headingId="materials-faq-heading"
              signal="cobalt"
            />
          </div>
          <DisclosureFaq items={page.faq} objectId="materials-faq-list" />
        </div>
      </section>
    </PageShell>
  );
}
