"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/toaster";
import { TRPCProvider } from "./lib/trpc/client";

export const Providers = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <TRPCProvider>
      <Toaster />
      <SessionProvider>
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          {...props}
        >
          {children}
        </NextThemeProvider>
      </SessionProvider>
    </TRPCProvider>
  );
};
