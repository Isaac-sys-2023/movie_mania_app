"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("night");

  useEffect(() => {
    const myTheme = localStorage.getItem("theme");
    if (myTheme) setTheme(myTheme);
  }, []);

  return (
    <html lang="en" data-theme={theme}>
      {children}
    </html>
  );
}
