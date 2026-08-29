import type { Metadata } from "next";

import { UtilityPage } from "@/components/pages/UtilityPage";
import { buildUtilityJsonLd } from "@/lib/json-ld";
import { buildLegalMetadata } from "@/lib/metadata";
import { legalRoutes } from "@/lib/routes";
import { getMessages } from "@/messages/ui";

const messages = getMessages("en");

export const metadata: Metadata = buildLegalMetadata(
  `${messages.legal.privacyTitle} | ${messages.brandName}`,
  messages.legal.privacyDescription,
  "en",
  legalRoutes.privacy.pl,
  legalRoutes.privacy.en,
);

/**
 * Renderuje angielską stronę polityki prywatności.
 */
export default function EnglishPrivacyPage() {
  return (
    <UtilityPage
      locale="en"
      currentPage="home"
      title={messages.legal.privacyTitle}
      intro={messages.legal.intro}
      body={messages.legal.privacyBody}
      structuredData={buildUtilityJsonLd(
        messages.legal.privacyTitle,
        messages.legal.privacyDescription,
        "en",
        legalRoutes.privacy.en,
      )}
    />
  );
}
