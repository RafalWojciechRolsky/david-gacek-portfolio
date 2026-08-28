import { Inter, Space_Grotesk } from "next/font/google";

/**
 * Krój do tekstu ciągłego i interfejsu z pełnym wsparciem polskich znaków.
 */
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Krój display zgodny z kierunkiem typograficznym marki.
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});
