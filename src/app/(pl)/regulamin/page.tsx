import type { Metadata } from "next";

import { UtilityPage } from "@/components/pages/UtilityPage";
import { buildUtilityJsonLd } from "@/lib/json-ld";
import { buildLegalMetadata } from "@/lib/metadata";
import { legalRoutes } from "@/lib/routes";
import { getMessages } from "@/messages/ui";

const messages = getMessages("pl");

export const metadata: Metadata = buildLegalMetadata(
  `${messages.legal.termsTitle} | ${messages.brandName}`,
  messages.legal.termsDescription,
  "pl",
  legalRoutes.terms.pl,
  legalRoutes.terms.en,
);

/**
 * Renderuje polską stronę regulaminu.
 */
export default function PolishTermsPage() {
  return (
    <UtilityPage
      locale="pl"
      currentPage="home"
      title={messages.legal.termsTitle}
      intro={messages.legal.intro}
      body={messages.legal.termsBody}
      structuredData={buildUtilityJsonLd(
        messages.legal.termsTitle,
        messages.legal.termsDescription,
        "pl",
        legalRoutes.terms.pl,
      )}
    />
  );
}
