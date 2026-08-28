import { NextResponse, type NextRequest } from "next/server";

import { getArticle, getArticles } from "@/lib/articles";
import {
  legacyRouteAliases,
  legalRoutes,
  pageKeyFromSlug,
  routeMap,
} from "@/lib/routes";

const publicFile = /\.(.*)$/;

/**
 * Przekierowuje pierwszy request anglojęzycznego użytkownika do wersji EN.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const legacyDestination = Object.entries(legacyRouteAliases).find(
    ([source]) => source === pathname,
  )?.[1];

  if (legacyDestination) {
    const destination = request.nextUrl.clone();
    destination.pathname = legacyDestination;
    return NextResponse.redirect(destination);
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    publicFile.test(pathname) ||
    pathname.startsWith("/en")
  ) {
    return NextResponse.next();
  }

  if (request.cookies.has("NEXT_LOCALE")) {
    return NextResponse.next();
  }

  const acceptsEnglish = request.headers
    .get("accept-language")
    ?.toLowerCase()
    .startsWith("en");

  if (acceptsEnglish) {
    const destination = request.nextUrl.clone();
    const polishSlug = pathname.replace(/^\/|\/$/g, "");
    const pageKey = pageKeyFromSlug("pl", polishSlug);
    const polishArticleSlug = pathname.match(/^\/wiedza\/([^/]+)\/?$/)?.[1];
    const article = polishArticleSlug
      ? getArticle("pl", polishArticleSlug)
      : undefined;
    const englishArticle = article
      ? getArticles("en").find((candidate) => candidate.id === article.id)
      : undefined;
    const englishSlug =
      englishArticle?.href?.replace(/^\/en\//, "") ??
      (pageKey === undefined
        ? pathname === legalRoutes.privacy.pl
          ? legalRoutes.privacy.en.replace(/^\/en\//, "")
          : pathname === legalRoutes.terms.pl
            ? legalRoutes.terms.en.replace(/^\/en\//, "")
            : polishSlug
        : routeMap[pageKey].en);
    destination.pathname = `/en${englishSlug ? `/${englishSlug}` : "/"}`;
    const response = NextResponse.redirect(destination);
    response.cookies.set("NEXT_LOCALE", "en", { path: "/" });
    return response;
  }

  const response = NextResponse.next();
  response.cookies.set("NEXT_LOCALE", "pl", { path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
