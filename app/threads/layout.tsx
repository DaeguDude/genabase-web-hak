"use client";
import { AppProvider } from "@shopify/polaris";
import { SidePanel } from "../components";

import { Header } from "../new-components";
import { getThreads } from "../api/new-api";
import { useQuery } from "@tanstack/react-query";
import { useSessionStorage } from "../hooks/use-session-storage";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [session_id] = useSessionStorage("session_id", "");
  const { data: threads } = useQuery({
    queryKey: ["threads"],
    queryFn: () => getThreads({ session_id: session_id! }),
    enabled: !!session_id,
  });

  return (
    <div className="relative h-full w-full bg-[#fff]">
      <div className="flex h-full w-full">
        <SidePanel threads={threads ?? []} />
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
