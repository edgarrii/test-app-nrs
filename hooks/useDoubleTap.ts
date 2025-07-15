import { useCallback, useRef } from "react";

export function useDoubleTap(
  onDoubleTap: () => void,
  onSingleTap: () => void,
  delay = 250
) {
  const lastTap = useRef<number>(0);

  return useCallback(() => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < delay) {
      onDoubleTap();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
      setTimeout(() => {
        if (Date.now() - lastTap.current >= delay) {
          onSingleTap();
          lastTap.current = 0;
        }
      }, delay);
    }
  }, [onDoubleTap, onSingleTap, delay]);
}