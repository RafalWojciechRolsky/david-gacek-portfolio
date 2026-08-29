import type { EvidenceItem } from "@/lib/types";

import { ActionLink } from "@/components/ui/ActionLink";

interface EvidenceBlockProps {
  /** Dane pojedynczego dowodu. */
  evidence: EvidenceItem;
  /** Lokalna nazwa statusu (opcjonalna). */
  statusLabel?: string;
  /** Identyfikator obiektu ze specyfikacji. */
  objectId?: string;
}

/**
 * Renderuje fakt z kontekstem oraz opcjonalnym źródłem.
 */
export function EvidenceBlock({
  evidence,
  objectId,
}: EvidenceBlockProps) {
  return (
    <li className="evidence-item" data-object-id={objectId}>
      <span className="evidence-number" aria-hidden="true">
        {evidence.label}
      </span>
      <div className="evidence-content">
        <div className="evidence-title-row">
          <h3>{evidence.title}</h3>
        </div>
        <p>{evidence.body}</p>
        {evidence.source ? (
          <ActionLink
            href={evidence.source.href}
            variant="source"
            ariaLabel={evidence.source.ariaLabel}
            withArrow
          >
            {evidence.source.label}
          </ActionLink>
        ) : null}
      </div>
    </li>
  );
}
