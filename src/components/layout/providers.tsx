"use client";

import React from "react";
import { ActiveThemeProvider } from "../active-theme";
import { ClerkWrapper } from "./clerk-wrapper";

export default function Providers({
  activeThemeValue,
  children,
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <ActiveThemeProvider initialTheme={activeThemeValue}>
      <ClerkWrapper>{children}</ClerkWrapper>
    </ActiveThemeProvider>
  );
}
