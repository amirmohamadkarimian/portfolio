import type { MouseEvent } from "react";

/**
 * Smoothly scrolls to a section identified by a hash-href (e.g. "#about")
 * and strips the hash from the URL to keep the address bar clean.
 */
export function scrollToSection(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  event.preventDefault();

  const targetId = href.replace("#", "");
  const target = document.getElementById(targetId);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}${window.location.search}`,
  );
}
