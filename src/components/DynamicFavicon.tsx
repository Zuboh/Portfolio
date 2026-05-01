"use client";

import { useTheme } from "next-themes";
import { useFavicon } from "@/hooks/useFavicon";

export function DynamicFavicon() {
  const { theme, resolvedTheme } = useTheme();

  const current =
    theme === "panda"
      ? "panda"
      : resolvedTheme;

  console.log("favicon theme:", theme);

  useFavicon(current);

  return null;
}