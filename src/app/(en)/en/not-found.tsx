import { UtilityPage } from "@/components/pages/UtilityPage";
import { getMessages } from "@/messages/ui";

/**
 * Renderuje angielski fallback 404 z zachowaniem nawigacji.
 */
export default function EnglishNotFound() {
  const messages = getMessages("en");

  return (
    <UtilityPage
      locale="en"
      currentPage="home"
      title={messages.notFound.title}
      intro={messages.notFound.intro}
      body={messages.notFound.body}
    />
  );
}
