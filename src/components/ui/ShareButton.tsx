"use client";

import { useState } from "react";

interface ShareButtonProps {
  /** Kanoniczny adres udostępnianego zasobu. */
  href: string;
  /** Etykieta podstawowej akcji. */
  label: string;
  /** Komunikat po skopiowaniu adresu. */
  copiedLabel: string;
  /** Komunikat po nieudanej próbie udostępnienia. */
  errorLabel: string;
}

/**
 * Udostępnia zasób przez Web Share API albo kopiuje jego adres do schowka.
 */
export function ShareButton({
  href,
  label,
  copiedLabel,
  errorLabel,
}: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url: href });
        setStatus("copied");
        return;
      }

      if (!navigator.clipboard) {
        setStatus("error");
        return;
      }

      await navigator.clipboard.writeText(href);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  return (
    <button
      className="share-button"
      type="button"
      aria-live="polite"
      onClick={handleShare}
    >
      {status === "copied" ? copiedLabel : status === "error" ? errorLabel : label}
    </button>
  );
}
