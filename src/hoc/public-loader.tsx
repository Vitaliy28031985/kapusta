"use client";


import Loader from "@/app/components/ui/Loader";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicLoader({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuth } = useAuthStore();  

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuth) {
        router.push("/comment");
      }
    };

    const timer = setTimeout(fetchUser, 3000);
    return () => clearTimeout(timer);

  }, [isAuth, router]);

   return (<>
    {!isAuth ? (<>{children}</>) : (<Loader/>)}
    </>)
}