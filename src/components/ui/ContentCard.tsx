import type { ContentItem } from "@/lib/types";

import { ActionLink } from "@/components/ui/ActionLink";
import { Arrow } from "@/components/ui/Arrow";

interface ContentCardProps {
  /** Dane karty treści. */
  item: ContentItem;
  /** Lokalny komunikat statusu. */
  statusLabel?: string;
  /** Numer pozycji w kolekcji. */
  index?: number;
  /** Identyfikator obiektu ze specyfikacji. */
  objectId?: string;
  /** Renderuje pojedynczy link obejmujący całą kartę. */
  linkWholeCard?: boolean;
}

/**
 * Renderuje semantyczną kartę artykułu, oferty, realizacji lub zasobu.
 */
export function ContentCard({
  item,
  statusLabel,
  index,
  objectId,
  linkWholeCard = false,
}: ContentCardProps) {
  const cardNumber = index === undefined ? undefined : String(index + 1).padStart(2, "0");
  const cardClassName = `content-card ${
    linkWholeCard && item.href ? "content-card--link" : ""
  }`.trim();
  const hasTop = Boolean(cardNumber || item.type || item.label);
  const hasFooter = Boolean(
    item.meta ||
      item.readTime ||
      statusLabel ||
      (!linkWholeCard && item.source) ||
      (linkWholeCard && item.href) ||
      (!linkWholeCard && item.href)
  );

  const cardContent = (
    <>
      <div className={`card-top ${hasTop ? "" : "card-top--empty"}`}>
        {cardNumber ? <span className="card-number">{cardNumber}</span> : null}
        {item.type ?? item.label ? (
          <span className="card-label">{item.type ?? item.label}</span>
        ) : null}
      </div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <div className={`card-footer ${hasFooter ? "" : "card-footer--empty"}`}>
        {item.meta ?? item.readTime ? (
          <span className="card-meta">{item.meta ?? item.readTime}</span>
        ) : null}
        {statusLabel ? <span className="card-status">{statusLabel}</span> : null}
        {!linkWholeCard && item.source ? (
          <ActionLink
            href={item.source.href}
            variant="source"
            ariaLabel={item.source.ariaLabel}
            download={item.source.href.endsWith(".pdf")}
            withArrow
          >
            {item.source.label}
          </ActionLink>
        ) : null}
        {linkWholeCard && item.href ? (
          <span className="card-action">
            {item.actionLabel ?? item.title}
            <Arrow />
          </span>
        ) : null}
        {!linkWholeCard && item.href ? (
          <ActionLink href={item.href} variant="text" withArrow>
            {item.actionLabel ?? item.title}
          </ActionLink>
        ) : null}
      </div>
    </>
  );

  if (linkWholeCard && item.href) {
    return (
      <a className={cardClassName} href={item.href} data-object-id={objectId}>
        {cardContent}
      </a>
    );
  }

  return (
    <article className={cardClassName} id={item.href?.startsWith("#") ? item.href.slice(1) : undefined} data-object-id={objectId}>
      {cardContent}
    </article>
  );
}
