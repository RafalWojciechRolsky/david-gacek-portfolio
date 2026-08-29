import { ContactChannels } from "@/components/sections/ContactChannels";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getMessages } from "@/messages/ui";
import type { Signal } from "@/lib/types";

interface ContactSectionProps {
  /** Lokalizacja tekstu sekcji. */
  locale: "pl" | "en";
  /** Czy użyć ciemnego wariantu końcowego CTA. */
  dark?: boolean;
  /** Sygnał kolorystyczny strony, z której sekcja jest wywoływana. */
  signal?: Signal;
}

/**
 * Renderuje końcową, relacyjną sekcję kontaktu bez formularza.
 */
export function ContactSection({ locale, dark = true, signal }: ContactSectionProps) {
  const messages = getMessages(locale);

  return (
    <section
      className={`contact-section ${dark ? "contact-section--signal" : ""}`}
      id={locale === "pl" ? "kontakt" : "contact"}
    >
      <div className="container contact-layout">
        <div>
          <SectionHeader
            heading={messages.contact.heading}
            intro={messages.contact.intro}
            signal={signal ?? (dark ? "ochre" : "cobalt")}
          />
        </div>
        <ContactChannels locale={locale} objectId="contact-channels" />
      </div>
    </section>
  );
}
