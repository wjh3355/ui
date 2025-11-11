"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const updateFavicon = (theme: string) => {
  const head = document.head || document.getElementsByTagName("head")[0];
  const links = head.querySelectorAll('link[rel="icon"]');

  // Remove existing favicons
  links.forEach((link) => head.removeChild(link));

  // Create new favicon link
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = theme === "dark" ? "/favicon-dark.png" : "/favicon.ico";
  head.appendChild(link);
};

const FaviconWrapper = () => {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const effectiveTheme =
      theme === "system" ? (resolvedTheme ?? "light") : (theme ?? "light");

    updateFavicon(effectiveTheme);
  }, [theme, resolvedTheme]);

  return null;
};

export default FaviconWrapper;
