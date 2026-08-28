import type { Metadata } from "next";

import { UtilityPage } from "@/components/pages/UtilityPage";
import { getMessages } from "@/messages/ui";

const messages = getMessages("en");

export const metadata: Metadata = {
  title: `${messages.legal.privacyTitle} | ${messages.brandName}`,
  description: messages.legal.privacyDescription,
};

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
    />
  );
}
