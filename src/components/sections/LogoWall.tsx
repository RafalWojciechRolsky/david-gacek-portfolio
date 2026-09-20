interface LogoWallProps {
  /** Nazwy marek do wyświetlenia jako typograficzne placeholdery. */
  names: string[];
  /** Stabilny identyfikator obiektu ze specyfikacji. */
  objectId?: string;
}

/**
 * Renderuje typograficzną ścianę marek jako placeholder, dopóki nie wpłyną pliki SVG od Dawida.
 */
export function LogoWall({ names, objectId }: LogoWallProps) {
  return (
    <ul className="logo-wall" data-object-id={objectId}>
      {names.map((name) => {
        const itemSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return (
          <li
            className="logo-wall-item"
            key={name}
            data-object-id={objectId ? `${objectId}-${itemSlug}` : undefined}
          >
            <span>{name}</span>
          </li>
        );
      })}
    </ul>
  );
}
