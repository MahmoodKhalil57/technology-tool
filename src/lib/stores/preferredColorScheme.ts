import { derived } from "svelte/store";
import { mediaQuery } from "./mediaQuery";

export const preferredColorScheme = derived(
  [mediaQuery("(prefers-color-scheme: dark)")],
  ([$isDark]) => {
    if ($isDark) return "dark";
    return "light";
  }
);
