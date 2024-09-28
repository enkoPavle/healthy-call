import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void | undefined>(callback);
  const savedInterval = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      savedInterval.current = setInterval(tick, delay);
    }

    return () => {
      if (savedInterval.current !== undefined) {
        clearInterval(savedInterval.current);
      }
    };
  }, [delay]);
};
