import type { Metadata } from "next";

import { UtilityPage } from "@/components/pages/UtilityPage";
import { getMessages } from "@/messages/ui";

const messages = getMessages("pl");

export const metadata: Metadata = {
  title: `${messages.legal.termsTitle} | ${messages.brandName}`,
  description: messages.legal.termsDescription,
};

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
    />
  );
}
