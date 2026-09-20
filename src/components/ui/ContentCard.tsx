import type { ContentCardItem } from "@/lib/types";

import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ActionLink } from "@/components/ui/ActionLink";
import { Arrow } from "@/components/ui/Arrow";

interface ContentCardProps {
  /** Dane karty treści. */
  item: ContentCardItem;
  /** Lokalny komunikat statusu. */
  statusLabel?: string;
  /** Numer pozycji w kolekcji. */
  index?: number;
  /** Identyfikator obiektu ze specyfikacji. */
  objectId?: string;
}

/**
 * Renderuje semantyczną kartę artykułu, oferty, realizacji lub zasobu.
 */
export function ContentCard({
  item,
  statusLabel,
  index,
  objectId,
}: ContentCardProps) {
  const cardNumber = index === undefined ? undefined : String(index + 1).padStart(2, "0");
  const hasTop = Boolean(cardNumber || item.type || item.label);
  const hasFooter = Boolean(
    item.meta ||
      item.readTime ||
      statusLabel ||
      item.kind === "evidence" ||
      item.kind === "navigation"
  );
  const cardClassName = [
    "content-card",
    `content-card--${item.kind}`,
    hasTop ? "" : "content-card--without-top",
    item.featured ? "content-card--featured" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const cardContent = (
    <>
      {hasTop ? (
        <div className="card-top">
          {cardNumber ? (
            <span className="card-number" aria-hidden="true">
              {cardNumber}
            </span>
          ) : null}
          {item.type ?? item.label ? (
            <span className="card-label">{item.type ?? item.label}</span>
          ) : null}
        </div>
      ) : null}
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {hasFooter ? (
        <div className="card-footer">
          {item.meta ?? item.readTime ? (
            <span className="card-meta">{item.meta ?? item.readTime}</span>
          ) : null}
          {statusLabel ? <span className="card-status">{statusLabel}</span> : null}
          {item.kind === "evidence" ? (
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
          {item.kind === "navigation" ? (
            <span className="card-action">
              {item.actionLabel ?? item.title}
              <Arrow />
            </span>
          ) : null}
        </div>
      ) : null}
    </>
  );

  if (item.kind === "navigation") {
    return item.download ? (
      <TrackedLink
        className={cardClassName}
        href={item.href}
        objectId={objectId}
        download
        eventName="file_download"
        parameters={{ location: objectId ?? "content-card", format: "pdf" }}
      >
        {cardContent}
      </TrackedLink>
    ) : (
      <a
        className={cardClassName}
        href={item.href}
        data-object-id={objectId}
        download={item.download || undefined}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <article className={cardClassName} data-object-id={objectId}>
      {cardContent}
    </article>
  );
}
