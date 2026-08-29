import type { ReactNode } from "react";
import type { Metadata } from "next";

import "../globals.css";
import { inter, spaceGrotesk } from "@/app/fonts";
import { PageTransition } from "@/components/chrome/PageTransition";
import { getMessages } from "@/messages/ui";

const messages = getMessages("en");

export const metadata: Metadata = {
  title: {
    default: messages.brandName,
    template: "%s",
  },
  description: messages.siteDescription,
};

interface EnglishLayoutProps {
  /** Zawartość lokalizacji angielskiej. */
  children: ReactNode;
}

/**
 * Ustawia angielski root layout dla tras pod prefiksem /en.
 */
export default function EnglishLayout({ children }: EnglishLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
