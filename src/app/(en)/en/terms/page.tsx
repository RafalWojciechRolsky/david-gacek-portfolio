import type { Metadata } from "next";

import { UtilityPage } from "@/components/pages/UtilityPage";
import { getMessages } from "@/messages/ui";

const messages = getMessages("en");

export const metadata: Metadata = {
  title: `${messages.legal.termsTitle} | ${messages.brandName}`,
  description: messages.legal.termsDescription,
};

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
    />
  );
}
