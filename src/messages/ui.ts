import uiMessages from "@/messages/ui.json";
import type { Locale } from "@/lib/types";

export type UiMessages = (typeof uiMessages)[Locale];

/**
 * Zwraca kompletny, zlokalizowany słownik copy interfejsu.
 */
export function getMessages(locale: Locale): UiMessages {
  return uiMessages[locale];
}
