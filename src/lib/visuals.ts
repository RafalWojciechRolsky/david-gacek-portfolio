import visualData from "@/content/site-visuals.json";
import type {
  Locale,
  PageKey,
  PageVisual,
  PageVisualSource,
} from "@/lib/types";

type VisualPageKey = Exclude<PageKey, "home" | "materials">;

const typedVisualData = visualData as Record<VisualPageKey, PageVisualSource>;

/**
 * Zwraca zlokalizowaną konfigurację rytmu, assetu i tonów podstrony.
 */
export function getPageVisual(
  pageKey: VisualPageKey,
  locale: Locale,
): PageVisual {
  const source = typedVisualData[pageKey];

  return {
    variant: source.variant,
    signal: source.signal,
    heroImage: source.heroImage?.[locale],
    heroCaption: source.heroCaption?.[locale],
    mediaImage: source.mediaImage?.[locale],
    toneBySection: source.toneBySection[locale],
  };
}
