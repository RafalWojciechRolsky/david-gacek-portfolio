/**
 * Renderuje dekoracyjną strzałkę używaną przy linkach akcji.
 */
export function Arrow() {
  return (
    <svg
      className="arrow"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 10h15M11 4l6 6-6 6" />
    </svg>
  );
}
