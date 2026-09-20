"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

/** Poniżej tej głębokości glide nie ma sensu, nowa podstrona i tak widać od góry. */
const GLIDE_MIN_SCROLL = 300;

/**
 * Sunie na górę natywnym mechanizmem jak przy kotwicach: poniżej progu bez animacji,
 * z głębokości płynnie, a przy preferencji redukcji ruchu zawsze natychmiast.
 */
function glideToTop(depth: number): void {
  if (
    depth < GLIDE_MIN_SCROLL ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    window.scrollTo(0, 0);
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

interface PageTransitionProps {
  /** Zawartość bieżącej podstrony. */
  children: ReactNode;
}

/**
 * Odtwarza płynny ruch przewijania przy przejściu między podstronami.
 * Kliknięcie w wewnętrzny link zapamiętuje głębokość i nawiguje routerem
 * z scroll: false, więc nowa podstrona montuje się na zachowanej pozycji.
 * Gdy useLayoutEffect widzi już NOWY pathname (montaż zakończony),
 * window.scrollTo({ behavior: "smooth" }) sunie do góry tym samym
 * natywnym mechanizmem co przy kotwicach. Bez animacji CSS.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const pendingDepthRef = useRef<number | null>(null);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest("a");
      if (!anchor || anchor.hasAttribute("download")) {
        return;
      }
      const href = anchor.getAttribute("href") ?? "";
      const isPlainInternal =
        href.startsWith("/") && !href.includes("#") && !href.startsWith("/#");
      const modifier =
        event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0;
      if (!isPlainInternal || modifier) {
        return;
      }

      // Link do bieżącej strony nie zmienia pathname, więc glide po montażu
      // nie ma kiedy się odpalić - przewijam na górę od razu.
      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname) {
        event.preventDefault();
        pendingDepthRef.current = null;
        if (window.location.hash) {
          history.replaceState(null, "", url.pathname);
        }
        glideToTop(window.scrollY);
        return;
      }

      event.preventDefault();
      // Głębokość czeka w refie; glide odpali się dopiero po montażu nowej trasy.
      pendingDepthRef.current = window.scrollY;
      router.push(href, { scroll: false });
    };

    const onPopState = () => {
      pendingDepthRef.current = null;
    };

    document.addEventListener("click", onClickCapture, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, [router]);

  useIsomorphicLayoutEffect(() => {
    const depth = pendingDepthRef.current;
    pendingDepthRef.current = null;

    if (depth === null || window.location.hash) {
      return;
    }

    // Montaż zakończony: natywny smooth scroll z zachowanej głębokości na górę.
    glideToTop(depth);
  }, [pathname]);

  return <>{children}</>;
}
