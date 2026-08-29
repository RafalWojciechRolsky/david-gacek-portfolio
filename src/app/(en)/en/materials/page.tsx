import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/PageShell";
import { RhythmicMarker } from "@/components/ui/RhythmicMarker";
import { ResourceItem } from "@/components/ui/ResourceItem";
import { getPage } from "@/lib/content";
import { getMessages } from "@/messages/ui";

const messages = getMessages("en");

export const metadata: Metadata = {
  title: `${messages.materials.title} | ${messages.brandName}`,
  description: messages.materials.description,
  robots: { index: false, follow: false },
};

/**
 * Renderuje angielską ścieżkę materiałów po szkoleniu poza indeksem.
 */
export default function EnglishMaterialsPage() {
  const page = getPage("teacherTraining", "en");

  return (
    <PageShell locale="en" currentPage="materials">
      <section className="utility-page">
        <div className="container utility-page-inner">
          <RhythmicMarker />
          <h1 className="section-heading">{messages.materials.title}</h1>
          <p className="section-intro">
            {messages.materials.intro}
          </p>
          <div className="resource-list">
            {page.sections
              .find((item) => item.id === "director-materials" || item.id === "leadership-materials")
              ?.items?.map((resource) =>
                "title" in resource ? (
                  <ResourceItem key={resource.id} resource={resource} locale="en" />
                ) : null,
              )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
