"use client";

import { useEffect } from "react";

// A small wink when a visitor switches tabs; the real title comes back when they return.
const AWAY_TITLE = "Come back soon · Rich Kitibwa";

export function TabTitle() {
  useEffect(() => {
    let saved: string | null = null;
    const onChange = () => {
      if (document.hidden) {
        saved = document.title;
        document.title = AWAY_TITLE;
      } else if (saved !== null) {
        document.title = saved;
        saved = null;
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return null;
}
