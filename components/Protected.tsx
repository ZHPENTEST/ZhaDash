"use client";

import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (!user.email_confirmed_at) {
        router.replace("/login?verify=1");
      }
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user || !user.email_confirmed_at) return null;

  return <>{children}</>;
}
