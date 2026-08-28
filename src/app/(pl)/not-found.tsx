import { UtilityPage } from "@/components/pages/UtilityPage";
import { getMessages } from "@/messages/ui";

/**
 * Renderuje polski fallback 404 z zachowaniem nawigacji.
 */
export default function PolishNotFound() {
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
