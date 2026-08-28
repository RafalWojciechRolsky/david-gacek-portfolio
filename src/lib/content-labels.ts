import type { ContentStatus, Locale } from "@/lib/types";
import { getMessages } from "@/messages/ui";

/**
 * Zwraca lokalizowaną etykietę statusu treści.
 */
export function getStatusLabel(status: ContentStatus, locale: Locale): string {
  return getMessages(locale).status[status];
}
