"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateLoader({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuth } = useAuthStore();  

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuth) {
        router.push("/");
      }
    };

    const timer = setTimeout(fetchUser, 3000);
    return () => clearTimeout(timer);

  }, [isAuth, router]);

  return <>{children}</>;
}
