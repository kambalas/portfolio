import { useRef, useCallback } from 'react';

// Below this, the pointer was passing through on its way somewhere else.
const HOVER_INTENT_MS = 800;

/**
 * Distinguishes "looked at this" from "moved the mouse across it".
 *
 * Reports on mouse leave with the real dwell time, once per element per page
 * view. Touch devices have no hover state, so this is desktop-only signal —
 * read it alongside the device breakdown, not on its own.
 *
 * @param {(durationMs: number) => void} onIntent
 * @returns {{onMouseEnter: () => void, onMouseLeave: () => void}} spread onto an element
 */
export function useHoverIntent(onIntent) {
  const enteredAtRef = useRef(0);
  const hasReportedRef = useRef(false);

  const onMouseEnter = useCallback(() => {
    enteredAtRef.current = performance.now();
  }, []);

  const onMouseLeave = useCallback(() => {
    if (hasReportedRef.current || !enteredAtRef.current) return;
    const duration = performance.now() - enteredAtRef.current;
    enteredAtRef.current = 0;
    if (duration < HOVER_INTENT_MS) return;
    hasReportedRef.current = true;
    onIntent(duration);
  }, [onIntent]);

  return { onMouseEnter, onMouseLeave };
}
