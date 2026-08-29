import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/PageShell";
import { RhythmicMarker } from "@/components/ui/RhythmicMarker";
import { ResourceItem } from "@/components/ui/ResourceItem";
import { getPage } from "@/lib/content";
import { getMessages } from "@/messages/ui";

const messages = getMessages("pl");

export const metadata: Metadata = {
  title: `${messages.materials.title} | ${messages.brandName}`,
  description: messages.materials.description,
  robots: { index: false, follow: false },
};

/**
 * Renderuje polską ścieżkę materiałów po szkoleniu poza indeksem.
 */
export default function PolishMaterialsPage() {
  const page = getPage("teacherTraining", "pl");

  return (
    <PageShell locale="pl" currentPage="materials">
      <section className="utility-page">
        <div className="container utility-page-inner">
          <RhythmicMarker />
          <h1 className="section-heading">{messages.materials.title}</h1>
          <p className="section-intro">
            {messages.materials.intro}
          </p>
          <div className="resource-list">
            {page.sections
              .find((item) => item.id === "materialy-dla-dyrekcji" || item.id === "materialy-dla-dyrektorki")
              ?.items?.map((resource) =>
                "title" in resource ? (
                  <ResourceItem key={resource.id} resource={resource} locale="pl" />
                ) : null,
              )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
