import { useCallback, useEffect, useState } from "react";

const KEY = "trd-demo-favorites";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

const listeners = new Set<() => void>();

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(read());
    const sync = () => setIds(read());
    listeners.add(sync);
    window.addEventListener("storage", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const next = read().includes(id) ? read().filter((x) => x !== id) : [...read(), id];
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* demo-only persistence */
    }
    listeners.forEach((fn) => fn());
  }, []);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, isFavorite, count: ids.length };
}
