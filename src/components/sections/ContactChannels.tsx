import { siteConfig } from "@/lib/site-config";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { getMessages } from "@/messages/ui";

interface ContactChannelsProps {
  /** Lokalizacja tekstów kanałów. */
  locale: "pl" | "en";
  /** Identyfikator grupy w specyfikacji. */
  objectId?: string;
  /** Jasny wariant do sekcji na papierowym tle. */
  light?: boolean;
}

/**
 * Renderuje kontakt z centralnej konfiguracji bez formularza i danych w komponencie.
 */
export function ContactChannels({ locale, objectId, light = false }: ContactChannelsProps) {
  const messages = getMessages(locale);

  return (
    <div
      className={`contact-channels ${light ? "contact-channels--light" : ""}`}
      data-object-id={objectId}
    >
      <TrackedLink
        className="contact-channel contact-channel--phone"
        href={siteConfig.phoneHref}
        eventName="click_phone"
        parameters={{ location: "contact" }}
      >
        <strong>{messages.contact.phone}</strong>
        <span>{siteConfig.phoneDisplay}</span>
      </TrackedLink>
      <TrackedLink
        className="contact-channel"
        href={siteConfig.whatsappHref}
        eventName="click_whatsapp"
        parameters={{ location: "contact" }}
      >
        <strong>{messages.contact.whatsapp}</strong>
        <span>{messages.contact.whatsappMeta}</span>
      </TrackedLink>
      <TrackedLink
        className="contact-channel"
        href={`mailto:${siteConfig.email}`}
        eventName="click_email"
        parameters={{ location: "contact" }}
      >
        <strong>{messages.contact.email}</strong>
        <span>{siteConfig.email}</span>
      </TrackedLink>
      <p className="contact-note">{siteConfig.phoneHoursByLocale[locale]}</p>
    </div>
  );
}
