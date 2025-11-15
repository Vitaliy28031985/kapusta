// src/hoc/app-loader.tsx
"use client";

import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { setAuthState } = useAuthStore();

  useEffect(() => {
    setAuthState(status, session);
  }, [status, session, setAuthState]); 

  return <>{children}</>;
}
