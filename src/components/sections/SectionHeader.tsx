import { RhythmicMarker } from "@/components/ui/RhythmicMarker";

interface SectionHeaderProps {
  /** Nagłówek sekcji. */
  heading: string;
  /** Wprowadzenie sekcji. */
  intro?: string;
  /** Mała etykieta nad nagłówkiem. */
  eyebrow?: string;
  /** Identyfikator nagłówka. */
  headingId?: string;
  /** Sygnał wizualny. */
  signal?: "cobalt" | "ochre" | "coral" | "green";
}

/**
 * Renderuje wspólny nagłówek sekcji z opcjonalnym rytmicznym znacznikiem.
 */
export function SectionHeader({
  heading,
  intro,
  eyebrow,
  headingId,
  signal = "cobalt",
}: SectionHeaderProps) {
  return (
    <div className="section-heading-block">
      <RhythmicMarker signal={signal} />
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-heading" id={headingId}>
        {heading}
      </h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}
