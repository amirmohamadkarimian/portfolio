import { useEffect, useRef, useState } from "react";

interface UseTypewriterConfig {
  /** Delay before typing starts (ms) */
  startDelay?: number;
  /** Typing speed per character (ms) */
  typeSpeed?: number;
  /** Deleting speed per character (ms) */
  deleteSpeed?: number;
  /** Pause after fully typing a string (ms) */
  holdDuration?: number;
  /** Pause after fully deleting before next string (ms) */
  pauseBetween?: number;
}

const defaults: Required<UseTypewriterConfig> = {
  startDelay: 500,
  typeSpeed: 70,
  deleteSpeed: 40,
  holdDuration: 1800,
  pauseBetween: 300,
};

/**
 * Cycles through an array of strings with a typewriter effect.
 * Returns the currently displayed text.
 */
export function useTypewriter(
  strings: string[],
  config?: UseTypewriterConfig,
): string {
  const [displayed, setDisplayed] = useState("");
  const opts = { ...defaults, ...config };
  const meta = useRef({ index: 0, deleting: false, text: "" });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const m = meta.current;
      const current = strings[m.index];

      if (!m.deleting && m.text.length < current.length) {
        m.text = current.slice(0, m.text.length + 1);
        setDisplayed(m.text);
        timeout = setTimeout(tick, opts.typeSpeed);
      } else if (!m.deleting && m.text.length === current.length) {
        timeout = setTimeout(() => {
          m.deleting = true;
          tick();
        }, opts.holdDuration);
      } else if (m.deleting && m.text.length > 0) {
        m.text = current.slice(0, m.text.length - 1);
        setDisplayed(m.text);
        timeout = setTimeout(tick, opts.deleteSpeed);
      } else {
        timeout = setTimeout(() => {
          m.deleting = false;
          m.index = (m.index + 1) % strings.length;
          tick();
        }, opts.pauseBetween);
      }
    };

    timeout = setTimeout(tick, opts.startDelay);
    return () => clearTimeout(timeout);
  }, [strings, opts.typeSpeed, opts.deleteSpeed, opts.holdDuration, opts.pauseBetween, opts.startDelay]);

  return displayed;
}
