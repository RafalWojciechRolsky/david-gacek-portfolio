"use client";

import { useEffect } from "react";

/**
 * Zapewnia płynne przewijanie strony klawiszem spacji (oraz Shift+Spacja w górę),
 * zachowując natywne działanie w polach formularzy, przyciskach i akordeonach.
 */
export function KeyboardScroll() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.code !== "Space") {
        return;
      }

      // Sprawdź czy użytkownik pisze w polu formularza lub ma fokus na kontrolce
      const activeEl = document.activeElement;
      const target = event.target;
      const elementsToCheck = [target, activeEl];

      for (const el of elementsToCheck) {
        if (el instanceof HTMLElement) {
          const tagName = el.tagName.toLowerCase();
          if (
            tagName === "input" ||
            tagName === "textarea" ||
            tagName === "select" ||
            tagName === "summary" ||
            tagName === "button" ||
            el.isContentEditable
          ) {
            return;
          }
        }
      }

      event.preventDefault();

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const scrollDistance = Math.round(window.innerHeight * 0.85);
      const topDelta = event.shiftKey ? -scrollDistance : scrollDistance;

      window.scrollBy({
        top: topDelta,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
