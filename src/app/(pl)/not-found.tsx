import { NotFoundPage } from "@/components/pages/NotFoundPage";

/**
 * Renderuje polski fallback 404 z motywem złamanego rytmu.
 */
export default function PolishNotFound() {
  return <NotFoundPage locale="pl" />;
}
