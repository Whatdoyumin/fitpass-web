import { useState, useEffect, useRef } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);

      // 🔹 현재 input에 focus가 있으면 유지
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
