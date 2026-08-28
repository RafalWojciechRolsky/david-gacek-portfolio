"use client";

import { useState } from "react";
import Image from "next/image";

import type { VideoData } from "@/lib/types";
import { getMessages } from "@/messages/ui";

import { ActionLink } from "@/components/ui/ActionLink";

interface MediaFacadeProps {
  /** Dane filmu i jego fallbacku. */
  video: VideoData;
  /** Etykieta przycisku odtwarzania. */
  playLabel: string;
  /** Identyfikator obiektu ze specyfikacji. */
  objectId?: string;
  /** Lokalizacja potrzebna do komunikatów fallbacku. */
  locale: "pl" | "en";
}

/**
 * Ładuje YouTube dopiero po świadomej aktywacji, zachowując fallback bez JS.
 */
export function MediaFacade({
  video,
  playLabel,
  objectId,
  locale,
}: MediaFacadeProps) {
  const [isActivated, setIsActivated] = useState(false);
  const messages = getMessages(locale);

  if (video.status !== "available" && !isActivated) {
    return (
      <div className="media-facade media-facade--unavailable" data-object-id={objectId}>
        <Image
          className="media-facade-image"
          src={video.placeholderImage.src}
          alt={video.placeholderImage.alt}
          width={video.placeholderImage.width}
          height={video.placeholderImage.height}
          loading="lazy"
          sizes="(max-width: 760px) 100vw, 60vw"
        />
        <div className="media-facade-copy">
          <span className="media-status">
            {messages.media.pendingStatus}
          </span>
          <p>
            {messages.media.pendingBody}
          </p>
          <ActionLink href={video.fallback.href} variant="source">
            {video.fallback.label}
          </ActionLink>
        </div>
      </div>
    );
  }

  if (isActivated) {
    return (
      <div className="media-facade media-facade--iframe" data-object-id={objectId}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
          title={video.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      className="media-facade"
      type="button"
      aria-label={playLabel}
      data-object-id={objectId}
      onClick={() => setIsActivated(true)}
    >
      <Image
        className="media-facade-image"
        src={video.placeholderImage.src}
        alt={video.placeholderImage.alt}
        width={video.placeholderImage.width}
        height={video.placeholderImage.height}
        loading="lazy"
        sizes="(max-width: 760px) 100vw, 60vw"
      />
      <span className="play-control" aria-hidden="true">
        <span />
      </span>
      <span className="media-label">{video.title}</span>
    </button>
  );
}
