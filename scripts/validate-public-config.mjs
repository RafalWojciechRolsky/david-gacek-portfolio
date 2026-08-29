/**
 * Zatrzymuje build wdrożeniowy bez publicznego adresu, ale nie blokuje lokalnego developmentu.
 */
if (process.env.VALIDATE_PUBLIC_CONFIG !== "true") {
  process.exit(0);
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

if (!siteUrl) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL musi wskazywać publiczny adres, gdy VALIDATE_PUBLIC_CONFIG=true.",
  );
}

let parsedUrl;

try {
  parsedUrl = new URL(siteUrl);
} catch {
  throw new Error("NEXT_PUBLIC_SITE_URL musi być poprawnym adresem URL.");
}

if (!["http:", "https:"].includes(parsedUrl.protocol)) {
  throw new Error("NEXT_PUBLIC_SITE_URL musi używać protokołu http albo https.");
}
