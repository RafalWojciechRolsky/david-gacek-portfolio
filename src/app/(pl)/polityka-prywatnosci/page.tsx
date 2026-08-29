import type { Metadata } from "next";

import { UtilityPage } from "@/components/pages/UtilityPage";
import { getPage } from "@/lib/content";
import { getMessages } from "@/messages/ui";

const messages = getMessages("pl");

export const metadata: Metadata = {
  title: `${messages.legal.privacyTitle} | ${messages.brandName}`,
  description: messages.legal.privacyDescription,
};

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
      structuredData={{
        page: getPage("contact", "pl"),
        pageKey: "contact",
      }}
    />
  );
}
