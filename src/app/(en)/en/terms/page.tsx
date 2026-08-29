import type { Metadata } from "next";

import { UtilityPage } from "@/components/pages/UtilityPage";
import { buildUtilityJsonLd } from "@/lib/json-ld";
import { buildLegalMetadata } from "@/lib/metadata";
import { legalRoutes } from "@/lib/routes";
import { getMessages } from "@/messages/ui";

const messages = getMessages("en");

export const metadata: Metadata = buildLegalMetadata(
  `${messages.legal.termsTitle} | ${messages.brandName}`,
  messages.legal.termsDescription,
  "en",
  legalRoutes.terms.pl,
  legalRoutes.terms.en,
);

/**
 * Renderuje angielską stronę regulaminu.
 */
export default function EnglishTermsPage() {
  return (
    <UtilityPage
      locale="en"
      currentPage="home"
      title={messages.legal.termsTitle}
      intro={messages.legal.intro}
      body={messages.legal.termsBody}
      structuredData={buildUtilityJsonLd(
        messages.legal.termsTitle,
        messages.legal.termsDescription,
        "en",
        legalRoutes.terms.en,
      )}
    />
  );
}
