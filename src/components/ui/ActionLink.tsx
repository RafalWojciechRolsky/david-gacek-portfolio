import type { ReactNode } from "react";

import { Arrow } from "@/components/ui/Arrow";

interface ActionLinkProps {
  /** Cel natywnego linku. */
  href: string;
  /** Widoczna etykieta akcji. */
  children: ReactNode;
  /** Wariant wizualny linku. */
  variant?: "primary" | "text" | "source" | "quiet";
  /** Dodatkowy tekst dla technologii asystujących. */
  ariaLabel?: string;
  /** Czy pokazać dekoracyjną strzałkę. */
  withArrow?: boolean;
  /** Stabilny identyfikator obiektu ze specyfikacji. */
  objectId?: string;
  /** Dodatkowa klasa stylu. */
  className?: string;
  /** Opcjonalna reakcja lokalna, bez zastępowania natywnej nawigacji. */
  onClick?: () => void;
  /** Włącza natywne pobieranie zasobu. */
  download?: boolean;
}

/**
 * Renderuje natywny link dla nawigacji, CTA, źródła albo kontaktu.
 */
export function ActionLink({
  href,
  children,
  variant = "text",
  ariaLabel,
  withArrow = false,
  objectId,
  className = "",
  onClick,
  download = false,
}: ActionLinkProps) {
  return (
    <a
      className={`action-link action-link--${variant} ${className}`.trim()}
      href={href}
      aria-label={ariaLabel}
      data-object-id={objectId}
      onClick={onClick}
      download={download}
    >
      <span>{children}</span>
      {withArrow ? <Arrow /> : null}
    </a>
  );
}
