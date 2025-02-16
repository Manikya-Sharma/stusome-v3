"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

export const Providers = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};
