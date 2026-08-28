import type { ReactNode } from "react";
import type { Metadata } from "next";

import "../globals.css";
import { inter, spaceGrotesk } from "@/app/fonts";
import { getMessages } from "@/messages/ui";

const messages = getMessages("pl");

export const metadata: Metadata = {
  title: {
    default: messages.brandName,
    template: "%s",
  },
  description: messages.siteDescription,
};

interface PolishLayoutProps {
  /** Zawartość lokalizacji polskiej. */
  children: ReactNode;
}

/**
 * Ustawia polski root layout dla wszystkich tras bez prefiksu języka.
 */
export default function PolishLayout({ children }: PolishLayoutProps) {
  return (
    <html lang="pl" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
