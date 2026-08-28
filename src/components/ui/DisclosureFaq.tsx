import type { FaqItem } from "@/lib/types";

interface DisclosureFaqProps {
  /** Widoczne pytania i odpowiedzi strony. */
  items: FaqItem[];
  /** Identyfikator obiektu ze specyfikacji. */
  objectId?: string;
}

/**
 * Renderuje natywną listę FAQ, która działa również bez JavaScriptu.
 */
export function DisclosureFaq({ items, objectId }: DisclosureFaqProps) {
  return (
    <div className="faq-list" data-object-id={objectId}>
      {items.map((faq) => (
        <details key={faq.id}>
          <summary>{faq.question}</summary>
          <div className="faq-answer">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}
