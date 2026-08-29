import { ActionLink } from "@/components/ui/ActionLink";
import { UtilityPage } from "@/components/pages/UtilityPage";
import { pathFor } from "@/lib/routes";
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
    >
      <div className="utility-page-actions">
        <ActionLink href={pathFor("home", "pl")} variant="primary">
          {messages.notFound.homeAction}
        </ActionLink>
        <ActionLink href={pathFor("contact", "pl")} variant="text" withArrow>
          {messages.notFound.contactAction}
        </ActionLink>
      </div>
    </UtilityPage>
  );
}
