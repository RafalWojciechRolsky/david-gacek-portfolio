/**
 * Renderuje pierwszy w kolejności fokusu link pomijający nawigację.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a className="skip-link" href="#main">
      {label}
    </a>
  );
}
