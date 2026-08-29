import type { Metadata } from "next";

import { UtilityPage } from "@/components/pages/UtilityPage";
import { buildUtilityJsonLd } from "@/lib/json-ld";
import { buildLegalMetadata } from "@/lib/metadata";
import { legalRoutes } from "@/lib/routes";
import { getMessages } from "@/messages/ui";

const messages = getMessages("pl");

export const metadata: Metadata = buildLegalMetadata(
  `${messages.legal.privacyTitle} | ${messages.brandName}`,
  messages.legal.privacyDescription,
  "pl",
  legalRoutes.privacy.pl,
  legalRoutes.privacy.en,
);

/**
 * Renderuje polską stronę polityki prywatności.
 */
export default function PolishPrivacyPage() {
  return (
    <UtilityPage
      locale="pl"
      currentPage="home"
      title={messages.legal.privacyTitle}
      intro={messages.legal.intro}
      body={messages.legal.privacyBody}
      structuredData={buildUtilityJsonLd(
        messages.legal.privacyTitle,
        messages.legal.privacyDescription,
        "pl",
        legalRoutes.privacy.pl,
      )}
    />
  );
}
