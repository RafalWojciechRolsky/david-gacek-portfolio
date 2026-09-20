"use client";

import { useState } from "react";

import type { ContentItem } from "@/lib/types";
import { getMessages } from "@/messages/ui";

import { ActionLink } from "@/components/ui/ActionLink";
import { ShareButton } from "@/components/ui/ShareButton";

interface ResourceItemProps {
  /** Dane zasobu. */
  resource: ContentItem;
  /** Lokalizacja bieżącej strony. */
  locale: "pl" | "en";
  /** Poziom nagłówka zasobu, gdy strona nie ma nagłówka sekcji H2. */
  headingLevel?: "h2" | "h3";
}

/**
 * Udostępnia zasób natywnie albo pokazuje uczciwy stan przygotowania.
 */
export function ResourceItem({ resource, locale, headingLevel = "h3" }: ResourceItemProps) {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const messages = getMessages(locale);
  const isAvailable = resource.status === "available" && Boolean(resource.href);
  const unavailableLabel =
    resource.status === "preparing"
      ? messages.resources.preparing
      : messages.resources.unavailable;
  const unavailableStatus =
    resource.status === "unavailable"
      ? "status--unavailable"
      : "status--pending";
  const Heading = headingLevel;

  return (
    <article className="resource-item">
      <span className="card-label">{resource.type ?? messages.resources.label}</span>
      <Heading>{resource.title}</Heading>
      <p>{resource.body}</p>
      <div className="card-footer resource-footer">
        {isAvailable && resource.href ? (
          <>
            <ActionLink
              href={resource.href}
              variant="text"
              ariaLabel={
                resource.actionLabel ??
                `${messages.resources.downloadAria} ${resource.title}`
              }
              className="resource-action"
              onClick={() => setDownloadStarted(true)}
              download
              eventName="file_download"
              eventParameters={{ location: "resource", format: "pdf" }}
            >
              {resource.actionLabel ?? messages.resources.download}
            </ActionLink>
            {downloadStarted ? (
              <span className="sr-only" role="status">
                {messages.resources.downloadStarted}
              </span>
            ) : null}
            <div className="resource-sharing">
              <ShareButton
                href={resource.href}
                label={messages.resources.share}
                copiedLabel={messages.resources.copied}
                errorLabel={messages.resources.copyError}
              />
              <span className="resource-url">{resource.href}</span>
            </div>
          </>
        ) : (
          <span className={`card-status ${unavailableStatus}`}>{unavailableLabel}</span>
        )}
      </div>
    </article>
  );
}
