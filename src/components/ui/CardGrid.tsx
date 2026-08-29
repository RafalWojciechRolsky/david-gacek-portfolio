import type { ReactNode } from "react";

/**
 * Wariant kompozycji kolekcji kart.
 */
export type CardGridLayout = "standard" | "editorial";

/**
 * Właściwości semantycznej, uporządkowanej kolekcji kart.
 */
interface CardGridProps {
  /** Elementy kolekcji, każdy opakowany w `li`. */
  children: ReactNode;
  /** Liczba kolumn wynikająca z zamierzonej kompozycji sekcji. */
  columns: number;
  /** Różnicuje proporcje wybranych kolekcji bez tworzenia drugiego wzorca. */
  layout?: CardGridLayout;
  /** Identyfikator kotwicy kolekcji. */
  id?: string;
}

/**
 * Ustanawia wspólną semantykę i geometrię numerowanych kolekcji kart.
 */
export function CardGrid({
  children,
  columns,
  layout = "standard",
  id,
}: CardGridProps) {
  return (
    <ol
      className={`content-grid content-grid--${columns} content-grid--${layout} card-grid`}
      id={id}
    >
      {children}
    </ol>
  );
}
