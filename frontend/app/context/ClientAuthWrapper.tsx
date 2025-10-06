"use client";

import { AuthProvider } from "@/app/context/authProvider";

export function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
