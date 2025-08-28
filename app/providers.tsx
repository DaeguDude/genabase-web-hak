// app/providers.tsx
"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient(); // create it inside the client component
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
