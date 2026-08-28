import { SectionHeader } from "@/components/sections/SectionHeader";
import { MediaFacade } from "@/components/ui/MediaFacade";
import type { Locale, Signal, VideoData } from "@/lib/types";
import { getMessages } from "@/messages/ui";

interface VideoSectionProps {
  /** Lokalizacja tekstów sekcji. */
  locale: Locale;
  /** Dane materiału wideo. */
  video: VideoData;
  /** Sygnał kolorystyczny bieżącego kontekstu. */
  signal: Signal;
}

/**
 * Renderuje sekcję demonstracji sposobu pracy przed ofertą i kontaktem.
 */
export function VideoSection({ locale, video, signal }: VideoSectionProps) {
  const messages = getMessages(locale);

  return (
    <section
      className={`video-section video-section--${signal}`}
      aria-labelledby="page-video-heading"
    >
      <div className="container video-layout">
        <div>
          <SectionHeader
            heading={messages.page.videoHeading}
            intro={messages.page.videoIntro}
            headingId="page-video-heading"
            signal={signal}
          />
        </div>
        <MediaFacade
          video={video}
          locale={locale}
          playLabel={messages.page.videoPlayLabel}
          objectId="page-video-facade"
        />
      </div>
    </section>
  );
}
