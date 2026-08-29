import { ActionLink } from "@/components/ui/ActionLink";
import { UtilityPage } from "@/components/pages/UtilityPage";
import { pathFor } from "@/lib/routes";
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
    >
      <div className="utility-page-actions">
        <ActionLink href={pathFor("home", "en")} variant="primary">
          {messages.notFound.homeAction}
        </ActionLink>
        <ActionLink href={pathFor("contact", "en")} variant="text" withArrow>
          {messages.notFound.contactAction}
        </ActionLink>
      </div>
    </UtilityPage>
  );
}
