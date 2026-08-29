import { NotFoundPage } from "@/components/pages/NotFoundPage";

/**
 * Renderuje neutralny fallback 404, gdy Next.js nie może dobrać route group.
 */
export default function GlobalNotFound() {
  return <NotFoundPage locale="pl" />;
}
