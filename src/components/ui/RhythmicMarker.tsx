interface RhythmicMarkerProps {
  /** Opcjonalny sygnał kolorystyczny znacznika. */
  signal?: "cobalt" | "ochre" | "coral" | "green";
}

/**
 * Renderuje dekoracyjny motyw rytmiczny, który nie niesie samodzielnej informacji.
 */
export function RhythmicMarker({ signal = "cobalt" }: RhythmicMarkerProps) {
  return (
    <span
      className={`rhythmic-marker rhythmic-marker--${signal}`}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </span>
  );
}
