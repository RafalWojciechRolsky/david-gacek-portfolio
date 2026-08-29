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
}

/**
 * Udostępnia zasób natywnie albo pokazuje uczciwy stan przygotowania.
 */
export function ResourceItem({ resource, locale }: ResourceItemProps) {
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

  return (
    <article className="resource-item">
      <span className="card-label">{resource.type ?? messages.resources.label}</span>
      <h3>{resource.title}</h3>
      <p>{resource.body}</p>
      <div className="card-footer resource-footer">
        {isAvailable && resource.href ? (
          <>
            <ActionLink
              href={resource.href}
              variant="text"
              ariaLabel={`${messages.resources.downloadAria} ${resource.title}`}
              className="resource-action"
              onClick={() => setDownloadStarted(true)}
              download
              live
            >
              {downloadStarted
                ? messages.resources.downloadStarted
                : messages.resources.download}
            </ActionLink>
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
