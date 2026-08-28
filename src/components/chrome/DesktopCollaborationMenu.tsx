"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import { pathFor } from "@/lib/routes";
import type { Locale, PageKey } from "@/lib/types";
import { getMessages } from "@/messages/ui";

interface DesktopCollaborationMenuProps {
  /** Bieżąca lokalizacja. */
  locale: Locale;
  /** Bieżąca strona dla stanu aria-current. */
  currentPage: PageKey;
}

/**
 * Udostępnia dropdown Współpraca z natywnym fallbackiem i stanem ARIA.
 */
export function DesktopCollaborationMenu({
  locale,
  currentPage,
}: DesktopCollaborationMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const messages = getMessages(locale);

  const close = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
    setIsOpen(false);
    summaryRef.current?.focus();
  };

  const handleToggle = () => {
    window.requestAnimationFrame(() => {
      const nextOpen = detailsRef.current?.open ?? false;
      setIsOpen(nextOpen);
      summaryRef.current?.setAttribute("aria-expanded", String(nextOpen));
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDetailsElement>) => {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      close();
    }
  };

  return (
    <details
      className="nav-dropdown"
      ref={detailsRef}
      onToggle={handleToggle}
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (
          isOpen &&
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          close();
        }
      }}
    >
      <summary
        ref={summaryRef}
        role="button"
        aria-controls="collaboration-menu"
        aria-expanded={isOpen}
      >
        {messages.header.workWith}
      </summary>
      <div className="nav-submenu" id="collaboration-menu">
        <a
          href={pathFor("teacherTraining", locale)}
          aria-current={currentPage === "teacherTraining" ? "page" : undefined}
        >
          {messages.header.teacherTraining}
        </a>
        <a
          href={pathFor("childrenWorkshops", locale)}
          aria-current={currentPage === "childrenWorkshops" ? "page" : undefined}
        >
          {messages.header.childrenWorkshops}
        </a>
        <a
          href={pathFor("corporateEvents", locale)}
          aria-current={currentPage === "corporateEvents" ? "page" : undefined}
        >
          {messages.header.corporateEvents}
        </a>
        <a
          href={pathFor("disc", locale)}
          aria-current={currentPage === "disc" ? "page" : undefined}
        >
          {messages.header.disc}
        </a>
      </div>
    </details>
  );
}
