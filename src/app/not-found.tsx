import { UtilityPage } from "@/components/pages/UtilityPage";
import { getMessages } from "@/messages/ui";

/**
 * Renderuje neutralny fallback 404, gdy Next.js nie może dobrać route group.
 */
export default function GlobalNotFound() {
  const messages = getMessages("pl");

  return (
    <UtilityPage
      locale="pl"
      currentPage="home"
      title={messages.notFound.title}
      intro={messages.notFound.intro}
      body={messages.notFound.body}
    />
  );
}
